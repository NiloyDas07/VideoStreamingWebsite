import mongoose, { isValidObjectId } from "mongoose";

import { Playlist } from "../models/playlist.model.js";
import { Video } from "../models/video.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new playlist.
const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description = "" } = req.body;
  if (!String(name).trim()) {
    throw new ApiError(400, "Playlist name is required");
  }

  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user._id,
  });

  if (!playlist) {
    throw new ApiError(
      500,
      "Failed to create playlist :: createPlaylist, playlist.controller"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }

  const playlists = await Playlist.find({ owner: userId });
  if (!playlists) {
    throw new ApiError(404, "Playlists not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlists, "Playlists found successfully"));
});

// Get playlist by id.
const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }

  const playlistRes = await Playlist.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(playlistId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
        pipeline: [
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
        ],
      },
    },
  ]);

  if (!playlistRes) {
    throw new ApiError(
      404,
      "Playlist not found or User is not authorized :: getPlaylistById, playlist.controller"
    );
  }

  const playlist = playlistRes.length === 0 ? playlistRes : playlistRes[0];

  return res.status(200).json(new ApiResponse(200, playlist, "Playlist found"));
});

// Add a video to playlist.
const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid playlist or video id");
  }

  const mongooseVideoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  // Check if video exists.
  const video = await Video.findById(mongooseVideoId, { _id: 1 });
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Add video to playlist
  const playlist = await Playlist.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId.createFromHexString(playlistId),
      owner: req.user._id,
    },
    {
      $push: { videos: mongooseVideoId },
    },
    { new: true }
  );

  if (!playlist) {
    throw new ApiError(
      404,
      "Playlist not found or User is not authorized :: addVideoToPlaylist, playlist.controller"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlist, "Video added to playlist successfully")
    );
});

// Remove a video from playlist.
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid playlist or video id");
  }

  const mongooseVideoId = mongoose.Types.ObjectId.createFromHexString(videoId);

  // Remove video from playlist
  const playlist = await Playlist.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId.createFromHexString(playlistId),
      owner: req.user._id,
    },
    {
      $pull: { videos: mongooseVideoId },
    },
    { new: true }
  );

  if (!playlist) {
    throw new ApiError(
      404,
      "Playlist not found or User is not authorized :: removeVideoFromPlaylist, playlist.controller"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlist, "Video removed from playlist successfully")
    );
});

// Delete a playlist.
const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }

  const playlist = await Playlist.findOneAndDelete({
    _id: mongoose.Types.ObjectId.createFromHexString(playlistId),
    owner: req.user._id,
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found or User is not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist deleted successfully"));
});

// Update a playlist.
const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }

  const { name, description } = req.body;
  if (!name?.trim() && !description?.trim()) {
    throw new ApiError(
      400,
      "No update values provided :: updatePlaylist, playlist.controller"
    );
  }

  let updateOptions = {};
  if (name) updateOptions.name = name;
  if (description) updateOptions.description = description;

  const playlist = await Playlist.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId.createFromHexString(playlistId),
      owner: req.user._id,
    },
    updateOptions,
    { new: true }
  );

  if (!playlist) {
    throw new ApiError(
      404,
      "Playlist not found or User is not authorized :: updatePlaylist, playlist.controller"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
