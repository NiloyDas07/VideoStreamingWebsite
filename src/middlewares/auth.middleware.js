import jwt from "jsonwebtoken";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // Get the access token of the current user from the request.
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized Request.");
  }

  // Verify the access token.
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (!decodedToken) {
    throw new ApiError(401, "Unauthorized Request.");
  }

  // Get the user from the database.
  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Invalid Access Token.");
  }

  // Add the user to the request object.
  req.user = user;

  next();
});

// Optional middleware to verify the access token. Required for pages in which we want to check if the user is logged in, but will still allow them to access the page if they are not logged in.
export const optionalVerifyJWT = asyncHandler(async (req, _, next) => {
  // Get the access token of the current user from the request.
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (accessToken) {
    // Verify the access token.
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (decodedToken) {
      // Get the user from the database.
      const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
      );
      if (user) {
        // Add the user to the request object.
        req.user = user;
      }
    }
  }
  next();
});
