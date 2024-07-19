import mongoose from "mongoose";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // Get all the videos uploaded by the channel
  const videos = await Video.find({ owner: req.user._id });

  if (!videos) {
    throw new ApiError(404, "No videos found");
  }

  return res.status(200).json(videos);
});

export { getChannelStats, getChannelVideos };
