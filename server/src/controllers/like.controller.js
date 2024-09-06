import mongoose, { isValidObjectId } from "mongoose";

import { Like } from "../models/like.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";

// Check if the like already exists.
const isLiked = asyncHandler(async (req, res) => {
  const { contentId } = req.params;
  const { contentType } = req.query;

  if (!isValidObjectId(contentId)) {
    throw new ApiError(400, "Invalid content id.");
  }

  if (!["video", "comment", "tweet"].includes(contentType)) {
    throw new ApiError(400, "Invalid content type.");
  }

  const query = { likedBy: req.user._id };
  query[contentType] = contentId;

  try {
    const likedContent = await Like.findOne(query, { _id: 1 });

    if (likedContent === null) {
      return res
        .status(200)
        .json(new ApiResponse(200, false, "Content is not liked by the user."));
    }

    if (!likedContent) {
      return res
        .status(200)
        .json(new ApiResponse(404, null, "Like not found."));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, likedContent, "Content is liked by the user.")
      );
  } catch (error) {
    throw new ApiError(500, "An error occurred while checking liked content.");
  }
});

// Toggle Video like by logged in user.
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

// Toggle Comment like by logged in user.
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

// Toggle Tweet like by logged in user.
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

// Get liked videos by logged in user.
const getLikedVideos = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const {
    pageNumber = 1,
    pageSize = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
  } = req.query;

  // Search by title and description
  const matchOptions = {
    likedBy: _id,
    video: { $ne: null },
  };

  const likes = Like.aggregate([
    {
      $match: matchOptions,
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
            $unwind: {
              path: "$owner",
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$video",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        $or: [
          { "video.title": { $regex: query, $options: "i" } },
          { "video.description": { $regex: query, $options: "i" } },
          { "video.owner.username": { $regex: query, $options: "i" } },
        ],
      },
    },
    {
      $project: {
        _id: "$video._id",
        title: "$video.title",
        description: "$video.description",
        thumbnail: "$video.thumbnail",
        videoFile: "$video.videoFile",
        createdAt: "$video.createdAt",
        views: "$video.views",
        duration: "$video.duration",
        isPublished: "$video.isPublished",
        owner: "$video.owner",
      },
    },
  ]);

  const aggregateOptions = {
    page: parseInt(pageNumber),
    limit: parseInt(pageSize),
  };

  const response = await Like.aggregatePaginate(likes, aggregateOptions);

  if (!likes) {
    throw new ApiError(500, "Failed to fetch liked videos.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos: response.docs,
        totalPages: response.totalPages,
        currentPage: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
      },
      "Fetched all liked videos."
    )
  );
});

// Get the liked count of a content.
const countLikes = asyncHandler(async (req, res) => {
  const { contentId } = req.params;
  const { contentType } = req.query;

  if (!isValidObjectId(contentId)) {
    throw new ApiError(400, "Invalid content id.");
  }

  if (!["video", "comment", "tweet"].includes(contentType)) {
    throw new ApiError(400, "Invalid content type.");
  }

  try {
    const count = await Like.countDocuments({
      [`${contentType}`]: contentId,
    });

    return res.status(200).json(new ApiResponse(200, count, "Counted likes."));
  } catch (error) {
    throw new ApiError(500, "An error occurred while counting likes.");
  }
});

export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
  isLiked,
  countLikes,
};
