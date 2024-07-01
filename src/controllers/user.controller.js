import validator from "email-validator";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../services/cloudinary.service.js";

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

  console.log(req.files ? req.files : "No files");

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required.");
  }

  // Upload images to cloudinary.
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // Check if avatar is uploaded successfully because we have set avatar as required.
  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar.");
  }

  // Create a new User object and save it to the database.
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
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
    throw new ApiError(400, "Emmail and password are required.");
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
    $set: {
      refreshToken: undefined,
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

export { registerUser, loginUser, logoutUser };
