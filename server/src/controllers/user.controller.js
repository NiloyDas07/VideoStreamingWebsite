import validator from "email-validator";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../services/cloudinary.service.js";

import {
  AVATAR_FOLDER_PATH,
  COVER_IMAGE_FOLDER_PATH,
} from "../consts/cloudinary.consts.js";

// Function to generate access and refresh tokens.
const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token in database.
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating access and refresh tokens: ${error.message}`
    );
  }
};

// Register a new user account
const registerUser = asyncHandler(async (req, res) => {
  // Get user data from frontend.
  const { username, email, password, fullName } = req.body;

  // Validate user data.
  // Check if any fields are empty.
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check if the email is in proper format.
  if (!validator.validate(email)) {
    throw new ApiError(400, "Invalid email format.");
  }

  //Check if user already exists.
  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });
  if (usernameExists) {
    throw new ApiError(409, "User with this username already exists.");
  } else if (emailExists) {
    throw new ApiError(409, "User with this email already exists.");
  }

  // Check for images: avatar and cover image.
  const avatarLocalPath = req.files?.avatar ? req.files.avatar[0]?.path : "";
  // In multer, if we take the first property then we get an object from which we can optionally get the path.

  const coverImageLocalPath = req.files?.coverImage
    ? req.files.coverImage[0]?.path
    : "";

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required.");
  }

  const publicIdAvatar = `${username}avatar`;
  const publicIdCoverImage = `${username}coverImage`;

  // Upload images to cloudinary.
  const avatarUrl = await uploadOnCloudinary({
    localFilePath: avatarLocalPath,
    publicId: publicIdAvatar,
    folderPath: AVATAR_FOLDER_PATH,
  });
  const coverImageUrl = await uploadOnCloudinary({
    localFilePath: coverImageLocalPath,
    publicId: publicIdCoverImage,
    folderPath: COVER_IMAGE_FOLDER_PATH,
  });

  // Check if avatar is uploaded successfully because we have set avatar as required.
  if (!avatarUrl) {
    throw new ApiError(500, "Failed to upload avatar.");
  }

  // Create a new User object and save it to the database.
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullName,
    avatar: avatarUrl.staticUrl,
    coverImage: coverImageUrl.staticUrl || "",
  });

  // Check if user is created successfully and return it without the password and refreshToken.
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to register user.");
  }

  // Return Response.
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully."));
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  // Get user data from frontend.
  const { email, password } = req.body;

  // Check if email and password are provided.
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  // Check if user exists.
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Provided email is not registered.");
  }

  // Check if password is correct.
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials.");
  }

  // Create access token and refresh token.
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user);

  // Return the tokens in cookies.
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!loggedInUser) {
    throw new ApiError(500, "Failed to login user.");
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully."
      )
    );
});

// Logout a user
const logoutUser = asyncHandler(async (req, res) => {
  // Delete refresh token from database.
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  // Clear cookies.
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully."));
});

// Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Get refresh token from cookies.
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request.");
  }

  // Verify the refresh token.
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Refresh Token Expired.");
    }
    throw new ApiError(401, "Invalid Refresh Token.");
  }
  if (!decodedToken) {
    throw new ApiError(401, "Unauthorized Request.");
  }

  // Get the user from the database.
  const user = await User.findById(decodedToken._id).select("-password");
  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token.");
  }

  // Check if refresh token is valid.
  if (user.refreshToken !== incomingRefreshToken) {
    console.log(user, incomingRefreshToken);
    throw new ApiError(401, "Refresh Token is expired or used.");
  }

  // Create access token and refresh token.
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user);

  // Return the tokens in cookies.
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed successfully."
      )
    );
});

// Change password
const changeUserPassword = asyncHandler(async (req, res) => {
  // Check if user is logged in.
  if (!req.user) {
    throw new ApiError(401, "User not logged in.");
  }

  // Get old password and new password from request body.
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required.");
  }

  // If logged in then get the user details from the database.
  const user = await User.findById(req.user._id);

  // Check if old password is correct.
  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isOldPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect.");
  }

  // Update the password in the database.
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully."));
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User not logged in.");
  }

  if (req.user.username !== req.params.username.toLowerCase()) {
    throw new ApiError(
      401,
      "Unauthorized Request :: getCurrentUser, user.controller"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "Current user retrieved successfully.")
    );
});

// Update Account Details
const updateAccountDetails = asyncHandler(async (req, res) => {
  // Check if user is logged in.
  if (!req.user) {
    throw new ApiError(401, "User not logged in.");
  }

  const { username, fullName } = req.body;

  // Only update what is provided by the user.
  const updateFields = {};
  if (username) {
    // Check if username already exists.
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      throw new ApiError(400, "Username already exists.");
    }

    updateFields.username = username;
  }
  if (fullName) updateFields.fullName = fullName;

  let user;
  if (Object.keys(updateFields).length > 0) {
    user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updateFields,
      },
      { new: true }
    ).select("-password -refreshToken");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully."));
});

// Update User Avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  // Check if user is logged in.
  if (!req.user) {
    throw new ApiError(401, "User not logged in.");
  }

  // Get the path of the uploaded file provided by multer.
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing.");
  }

  // Upload the file to Cloudinary.
  const avatarUrl = await uploadOnCloudinary({
    localFilePath: avatarLocalPath,
    publicId: `${req.user.username}avatar`,
    folderPath: AVATAR_FOLDER_PATH,
  });

  if (!avatarUrl) {
    throw new ApiError(500, "Failed to upload avatar.");
  }

  // Update the user's avatar in the database.
  // let user = req.user;
  // user = await User.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //     $set: {
  //       avatar: avatarUrl,
  //     },
  //   },
  //   { new: true }
  // ).select("-password -refreshToken");
  // Not needed since cloudinary url will not change and we are extracting the static url.

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Avatar updated successfully."));
});

// update user cover image
const updateUserCoverImage = asyncHandler(async (req, res) => {
  // Check if user is logged in.
  if (!req.user) {
    throw new ApiError(401, "User not logged in.");
  }

  // Get the path of the uploaded file provided by multer.
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing.");
  }

  // Upload the file to Cloudinary.
  const coverImageUrl = await uploadOnCloudinary({
    localFilePath: coverImageLocalPath,
    publicId: `${req.user.username}coverImage`,
    folderPath: COVER_IMAGE_FOLDER_PATH,
  });
  if (!coverImageUrl) {
    throw new ApiError(500, "Failed to upload cover image.");
  }

  // Update the user's cover image in the database.
  // Not needed since cloudinary url will not change and we are extracting the static url.
  // const user = await User.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //     $set: {
  //       coverImage: coverImageUrl,
  //     },
  //   },
  //   { new: true }
  // ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Cover image updated successfully."));
});

// Get User Channel Profile details
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "User Profile :: Username is missing.");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "Subscription",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "Subscription",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        subscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: {
              $in: [req.user?._id, "$subscribers.subscriber"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        username: 1,
        fullName: 1,
        avatar: 1,
        coverImage: 1,
        subscribersCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "Channel not found.");
  }

  console.log(channel);

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "Channel details fetched successfully.")
    );
});

// Get Watch History
const getWatchHistory = asyncHandler(async (req, res) => {
  console.log("User: ", req.user);
  // const user = await User.aggregate([
  //   {
  //     $match: {
  //       _id: mongoose.Types.ObjectId(req.user?._id), // Needed because we can't directly get the full _id inside aggregate pipeline.
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "Video",
  //       localField: "watchHistory",
  //       foreignField: "_id",
  //       as: "watchHistory",
  //       pipeline: [
  //         {
  //           $lookup: {
  //             from: "User",
  //             localField: "owner",
  //             foreignField: "_id",
  //             as: "owner",
  //             pipeline: [
  //               {
  //                 $project: {
  //                   username: 1,
  //                   fullName: 1,
  //                   avatar: 1,
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           $addFields: {
  //             owner: {
  //               $first: "$owner",
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      // user[0].watchHistory,
      [],
      "Watch History fetched successfully."
    )
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changeUserPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
