import mongoose, { isValidObjectId } from "mongoose";

import { Like } from "../models/like.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id.");
  }

  const videoMongoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  // Check if video exists.
  const video = await Video.findById(videoMongoId);
  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  // Check if like already exists.
  const likedVideo = await Like.findOne(
    {
      video: videoMongoId,
      likedBy: req.user._id,
    },
    { _id: 1 }
  );

  // If like already exists then delete it.
  if (likedVideo) {
    const deletedLike = await Like.findByIdAndDelete(likedVideo._id);

    if (!deletedLike) {
      throw new ApiError(500, "Like deletion failed.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deletedLike, "Like deleted successfully."));
  } else {
    // If like doesn't exist then create it.
    const newLike = await Like.create({
      video: videoMongoId,
      likedBy: req.user._id,
    });

    if (!newLike) {
      throw new ApiError(500, "Like creation failed.");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, newLike, "Like created successfully."));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id.");
  }

  const commentMongoId = mongoose.Types.ObjectId.createFromHexString(commentId);

  // Check if comment exists.
  const comment = await Comment.findById(commentMongoId);
  if (!comment) {
    throw new ApiError(404, "Comment not found.");
  }

  // Check if like already exists.
  const likedComment = await Like.findOne(
    {
      comment: commentMongoId,
      likedBy: req.user._id,
    },
    { _id: 1 }
  );

  // If like already exists then delete it.
  if (likedComment) {
    const deletedLike = await Like.findByIdAndDelete(likedComment._id);

    if (!deletedLike) {
      throw new ApiError(500, "Like deletion failed.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deletedLike, "Like deleted successfully."));
  } else {
    // If like doesn't exist then create it.
    const newLike = await Like.create({
      comment: commentMongoId,
      likedBy: req.user._id,
    });

    if (!newLike) {
      throw new ApiError(500, "Like creation failed.");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, newLike, "Like created successfully."));
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id.");
  }

  const tweetMongoId = mongoose.Types.ObjectId.createFromHexString(tweetId);

  // Check if tweet exists.
  const tweet = await Tweet.findById(tweetMongoId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found.");
  }

  // Check if like already exists.
  const likedTweet = await Like.findOne(
    {
      tweet: tweetMongoId,
      likedBy: req.user._id,
    },
    { _id: 1 }
  );

  // If like already exists then delete it.
  if (likedTweet) {
    const deletedLike = await Like.findByIdAndDelete(likedTweet._id);

    if (!deletedLike) {
      throw new ApiError(500, "Like deletion failed.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deletedLike, "Like deleted successfully."));
  } else {
    // If like doesn't exist then create it.
    const newLike = await Like.create({
      tweet: tweetMongoId,
      likedBy: req.user._id,
    });

    if (!newLike) {
      throw new ApiError(500, "Like creation failed.");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, newLike, "Like created successfully."));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const likes = await Like.aggregate([
    {
      $match: {
        likedBy: _id,
        video: { $ne: null },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $unwind: "$owner",
          },
        ],
      },
    },
    {
      $unwind: "$video",
    },
    {
      $project: {
        updatedAt: 1,
        video: {
          title: 1,
          description: 1,
          thumbnail: 1,
          videoFile: 1,
          owner: 1,
        },
      },
    },
  ]);

  if (!likes) {
    throw new ApiError(500, "Failed to fetch liked videos.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, likes, "Fetched all liked videos."));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
