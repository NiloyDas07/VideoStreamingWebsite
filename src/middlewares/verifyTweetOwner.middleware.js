import mongoose, { isValidObjectId } from "mongoose";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

import { Tweet } from "../models/tweet.model";

export const verifyTweetOwner = asyncHandler(async (req, _, next) => {
  const { tweetId } = req.params;
  const { _id } = req.user;

  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id.");
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found.");
  }

  if (!tweet.owner.equals(_id)) {
    throw new ApiError(
      403,
      "You are not allowed to perform this action: Update tweet: Owner mismatch."
    );
  }

  req.tweet = tweet;
  next();
});
