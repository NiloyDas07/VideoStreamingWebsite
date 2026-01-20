import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios.util";

import { handleRequestWithTokenRefresh } from "../utils/tokenRefresh";

export const getAllVideos = createAsyncThunk(
  "videos/getAll",
  async (
    { pageNumber, pageSize, query, sortBy, sortType, userId },
    { rejectWithValue },
  ) => {
    const response = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.get("/videos/", {
          params: { query, userId, sortBy, sortType, pageNumber, pageSize },
        }),
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response?.response?.data);
    }

    return response.data.data;
  },
);

export const getVideosLikedByUser = createAsyncThunk(
  "videos/getVideosLikedByUser",
  async ({ pageNumber, pageSize, sortBy, sortType }, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.get(`/likes/videos`, {
          params: { sortBy, sortType, pageNumber, pageSize },
        }),
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response);
    }

    return response.data.data;
  },
);

export const addNewVideo = createAsyncThunk(
  "videos/addNew",
  async (data, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.post("/videos/", data),
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response);
    }

    return response.data;
  },
);

export const getVideoById = createAsyncThunk(
  "videos/getById",
  async (videoId, { rejectWithValue }) => {
    // Fetch the video data
    const response = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.get(`/videos/${videoId}`),
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response);
    }

    return response?.data?.data;
  },
);

export const deleteVideo = createAsyncThunk(
  "videos/delete",
  async ({ videoId }, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.delete(`/videos/${videoId}`),
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response?.response?.data);
    }

    return response.data;
  },
);

export const updateVideo = createAsyncThunk(
  "videos/update",
  async ({ videoId, data }, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.patch(`/videos/${videoId}`, data, {
          params: {
            videoId,
          },
        }),
      rejectWithValue,
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response.response?.data);
    }

    return response.data;
  },
);

export const videoPublishToggle = createAsyncThunk(
  "videos/publishToggle",
  async (videoId, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.patch(`/videos/publish/${videoId}`),
      rejectWithValue,
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response);
    }

    return response.data?.data;
  },
);

export const getWatchHistory = createAsyncThunk(
  "videos/getWatchHistory",
  async ({ pageNumber, pageSize, sortBy, sortType }, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.get(`/users/watch-history/`, {
          params: { sortBy, sortType, pageNumber, pageSize },
        }),
      rejectWithValue,
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response?.response?.data);
    }

    return response.data?.data;
  },
);
