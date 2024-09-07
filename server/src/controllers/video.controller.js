import mongoose, { isValidObjectId } from "mongoose";

import { Video } from "../models/video.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../services/cloudinary.service.js";
import {
  THUMBNAIL_FOLDER_PATH,
  VIDEO_FOLDER_PATH,
} from "../consts/cloudinary.consts.js";

// Get all videos
const getAllVideos = asyncHandler(async (req, res) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId = "",
  } = req.query;

  // Search by title and description
  const matchOptions = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { "owner.username": { $regex: query, $options: "i" } },
    ],
    isPublished: true,
  };

  // If user id is provided, search published videos of that user.
  if (userId) {
    try {
      matchOptions.owner = mongoose.Types.ObjectId.createFromHexString(userId);
    } catch (error) {
      throw new ApiError(400, "Invalid userId");
    }
  }

  const videos = Video.aggregate([
    {
      $match: matchOptions,
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
        title: 1,
        description: 1,
        thumbnail: 1, //cloudinary url
        duration: 1,
        views: 1,
        createdAt: 1,
        isPublished: 1,
        owner: {
          _id: 1,
          username: 1,
          avatar: 1, //cloudinary url
        },
      },
    },
    {
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
      },
    },
  ]);

  const aggregateOptions = {
    page: parseInt(pageNumber),
    limit: parseInt(pageSize),
  };

  const response = await Video.aggregatePaginate(videos, aggregateOptions);

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
      "Videos fetched successfully."
    )
  );
});

// Publish a video.
const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title.trim() || !description.trim()) {
    throw new ApiError(400, "Title and description are required.");
  }

  const thumbnailLocalPath = req.files?.thumbnail
    ? req.files?.thumbnail[0]?.path
    : "";
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required.");
  }

  const videoLocalPath = req.files?.videoFile
    ? req.files?.videoFile[0]?.path
    : "";
  if (!videoLocalPath) {
    throw new ApiError(400, "Video is required.");
  }

  const publicIdThumbnail = `thumbnail${Date.now()}`;
  const publicIdVideo = `video${Date.now()}`;

  const thumbnailUrl = await uploadOnCloudinary({
    localFilePath: thumbnailLocalPath,
    publicId: publicIdThumbnail,
    folderPath: THUMBNAIL_FOLDER_PATH,
  });
  if (!thumbnailUrl) {
    throw new ApiError(500, "Thumbnail upload failed.");
  }

  const videoUrl = await uploadOnCloudinary({
    localFilePath: videoLocalPath,
    publicId: publicIdVideo,
    folderPath: VIDEO_FOLDER_PATH,
  });
  if (!videoUrl) {
    throw new ApiError(500, "Video upload failed.");
  }

  const video = await Video.create({
    title,
    description,
    thumbnail: {
      url: thumbnailUrl.secure_url || thumbnailUrl.url,
      publicId: thumbnailUrl.public_id,
    },
    videoFile: {
      url: videoUrl.secure_url || videoUrl.url,
      publicId: videoUrl.public_id,
    },
    owner: req.user._id,
    duration: videoUrl.duration,
  });

  if (!video) {
    throw new ApiError(500, "Failed to publish video.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video published successfully."));
});

// Get a particular video by id.
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoMongoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  // Fetch video from database if it exists.
  const videoArray = await Video.aggregate([
    {
      $match: {
        _id: videoMongoId,
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
        title: 1,
        description: 1,
        thumbnail: 1, //cloudinary url
        videoFile: 1,
        duration: 1,
        views: 1,
        createdAt: 1,
        isPublished: 1,
        owner: {
          _id: 1,
          username: 1,
          avatar: 1, //cloudinary url
        },
      },
    },
  ]);

  if (!videoArray.length) {
    throw new ApiError(404, "Video not found.");
  }

  const video = videoArray[0];

  // Check if current user and owner are the same.
  if (!req.user?._id.equals(video.owner._id)) {
    // IF user is not owner and video is not published then user is not allowed to access the video.
    if (!video.isPublished) {
      throw new ApiError(403, "Video not found.");
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully."));
});

// Increment video views.
const incrementVideoViews = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoMongoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  const video = await Video.findOneAndUpdate(
    { _id: videoMongoId },
    { $inc: { views: 1 } },
    {
      new: true,
      fields: "views",
    }
  );

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video views incremented successfully."));
});

// Update a video details.
const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoMongoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  const { title = "", description = "" } = req.body;
  const thumbnailLocalPath = req.file?.path || "";

  // Atleast one field is required.
  if (![title, description, thumbnailLocalPath].some((field) => field.trim())) {
    throw new ApiError(400, "Update values not provided.");
  }

  const updateOptions = {};

  if (title) updateOptions.title = title;

  if (description) updateOptions.description = description;

  let video;
  if (thumbnailLocalPath) {
    // Get existing thumbnail so that we can update it.
    video = await Video.findOne({
      _id: videoMongoId,
      owner: req.user._id,
    });

    const publicIdThumbnail = video?.thumbnail?.publicId;
    const uploadedThumbnail = await uploadOnCloudinary({
      localFilePath: thumbnailLocalPath,
      publicId: publicIdThumbnail,
      folderPath: THUMBNAIL_FOLDER_PATH,
    });
    if (!uploadedThumbnail) {
      throw new ApiError(500, "Thumbnail upload failed.");
    }

    updateOptions.thumbnail = {
      url: uploadedThumbnail.secure_url || uploadedThumbnail.url,
      publicId: uploadedThumbnail.public_id,
    };
  }

  // Fetch video from database if it exists and update it.
  const updatedVideo = await Video.findOneAndUpdate(
    {
      _id: videoMongoId,
      owner: req.user._id,
    },
    updateOptions,
    { new: true }
  );

  if (!updatedVideo) {
    throw new ApiError(404, "Unauthorized or Video not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully."));
});

// Delete a video
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoMongoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  // Check if video exists and get the thumbnail and videoFile url if it does.
  const video = await Video.findOne({
    _id: videoMongoId,
    owner: req.user._id,
  }).select("thumbnail videoFile");

  if (!video) {
    throw new ApiError(404, "Video not found or you are not authorized.");
  }

  // Delete the video from database
  const deletedVideo = await Video.findByIdAndDelete(videoMongoId);
  if (!deletedVideo) {
    throw new ApiError(500, "Video deletion failed.");
  }

  // Delete the thumbnail from cloudinary.
  const deleteThumbnailResponse = await deleteFromCloudinary({
    publicId: video?.thumbnail?.publicId,
  });
  if (!deleteThumbnailResponse) {
    throw new ApiError(500, "Video deletion from cloudinary failed.");
  }

  // Delete the video file from cloudinary.
  const deleteVideoResponse = await deleteFromCloudinary({
    publicId: video?.videoFile?.publicId,
    resourceType: "video",
  });
  if (!deleteVideoResponse) {
    throw new ApiError(500, "Video deletion from cloudinary failed.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedVideo, "Video deleted successfully."));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoMongoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  const video = await Video.findOneAndUpdate(
    {
      _id: videoMongoId,
      owner: req.user._id,
    },
    [{ $set: { isPublished: { $not: "$isPublished" } } }],
    { new: true }
  );

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video status updated successfully."));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  incrementVideoViews,
};
