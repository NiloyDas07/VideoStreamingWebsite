import validator from "email-validator";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../services/cloudinary.service.js";

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
  const avatarLocalPath = req.files?.avatar[0]?.path; // In multer, if we take the first property then we get an object from which we can optionally get the path.

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

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

export { registerUser };
