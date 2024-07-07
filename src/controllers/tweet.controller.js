import mongoose, { isValidObjectId } from "mongoose";

import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create tweet.
const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim().length === 0) {
    throw new ApiError(400, "Content is required");
  }

  const { _id } = req.user;
  const tweet = await Tweet.create({
    content,
    owner: _id,
  });

  if (!tweet) {
    throw new ApiError(500, "Failed to create tweet.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully."));
});

// Get a single tweet.
const getTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id.");
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found.");
  }
  const isOwner = req.user._id.equals(tweet.owner);

  console.log(req.user._id, tweet.owner);

  const tweetData = tweet.toObject();
  tweetData.isOwner = isOwner;

  return res
    .status(200)
    .json(new ApiResponse(200, tweetData, "Tweet fetched."));
});

// Get user tweets.
const getUserTweets = asyncHandler(async (req, res) => {
  // Get username from request params.
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is required.");
  }

  // Check if the user exists.
  const tweetOwner = await User.findOne({ username });
  if (!tweetOwner) {
    throw new ApiError(404, "Failed to find user.");
  }

  const { pageNumber = 1, pageSize = 10 } = req.query;
  const pageNumberInt = parseInt(pageNumber, 10);
  const pageSizeInt = parseInt(pageSize, 10);
  const skip = (pageNumberInt - 1) * pageSizeInt;

  const userTweets = await Tweet.find({ owner: tweetOwner._id })
    .sort({ createdAt: -1 })
    .limit(pageSizeInt)
    .skip(skip);

  if (!userTweets) {
    throw new ApiError(500, "Failed to get user tweets.");
  }

  const totalTweets = await Tweet.countDocuments({ owner: tweetOwner._id });
  const totalPages = Math.ceil(totalTweets / pageSizeInt);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        userTweets,
        totalPages,
        currentPage: pageNumberInt,
        hasPrevPage: pageNumberInt > 1,
        hasNextPage: pageNumberInt < totalPages,
      },
      "Tweets fetched successfully."
    )
  );
});

// Update tweet.
const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id.");
  }

  const { content } = req.body;
  if (!content?.trim()) {
    throw new ApiError(400, "Content is required.");
  }

  const tweet = await Tweet.findByIdAndUpdate(tweetId, { content });
  if (!tweet) {
    throw new ApiError(404, "Tweet not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet updated successfully."));
});

// Delete tweet.
const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id.");
  }

  const tweet = await Tweet.findByIdAndDelete(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully."));
});

export { createTweet, getTweet, getUserTweets, updateTweet, deleteTweet };
