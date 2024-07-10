import mongoose, { isValidObjectId } from "mongoose";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { Comment } from "../models/comment.model.js";

// Get comments for a video.
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const paginateOptions = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const comments = Comment.aggregate([
    {
      $match: {
        video: mongoose.Types.ObjectId.createFromHexString(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $project: {
        content: 1,
        owner: {
          _id: "$owner._id",
          username: "$owner.username",
          avatar: "$owner.avatar",
        },
      },
    },
  ]);

  const response = await Comment.aggregatePaginate(comments, paginateOptions);

  if (!response) {
    throw new ApiError(404, "Comments not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        comments: response.docs,
        totalPages: response.totalPages,
        currentPage: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
      },
      "Comments fetched successfully"
    )
  );
});

// Add a comment to a video.
const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "Comment cannot be empty");
  }

  try {
    const comment = await Comment.create({
      content,
      owner: req.user._id,
      video: videoId,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, comment, "Comment created"));
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ApiError(
        400,
        `Error while creating the comment: ${error.message}`
      );
    } else {
      throw new ApiError(
        500,
        "Something went wrong while creating the comment"
      );
    }
  }
});

// Update a comment.
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  const { content } = req.body;
  if (!content?.trim()) {
    throw new ApiError(400, "Comment cannot be empty.");
  }

  const comment = await Comment.findByIdAndUpdate(
    {
      _id: mongoose.Types.ObjectId.createFromHexString(commentId),
      owner: req.user._id,
    },
    { content },
    { new: true }
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found or user is not authorized.");
  }

  return res.status(200).json(new ApiResponse(200, comment, "Comment updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  const comment = await Comment.findByIdAndDelete({
    _id: mongoose.Types.ObjectId.createFromHexString(commentId),
    owner: req.user._id,
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found or user is not authorized.");
  }

  return res.status(200).json(new ApiResponse(200, comment, "Comment deleted"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
