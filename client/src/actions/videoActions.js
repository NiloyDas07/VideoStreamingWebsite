import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios.util";

export const getAllVideos = createAsyncThunk(
  "videos/getAll",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/videos/", {
        params: { query },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addNewVideo = createAsyncThunk(
  "videos/addNew",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/videos/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getVideoById = createAsyncThunk(
  "videos/getById",
  async (videoId, { rejectWithValue }) => {
    try {
      // Fetch the video data
      const response = await axiosInstance.get(`/videos/${videoId}`);
      const videoData = response.data;

      if (videoData) {
        try {
          // Update video views
          const viewRes = await axiosInstance.patch(
            `/videos/increment-views/${videoId}`,
          );
          // Assign the updated views to videoData
          videoData.data.views = viewRes.data.data.views;
        } catch (error) {
          console.log("Error updating views:", error);
        }
      }

      return videoData?.data;
    } catch (error) {
      console.log("Error fetching video:", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteVideo = createAsyncThunk(
  "videos/delete",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/videos/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateVideo = createAsyncThunk(
  "videos/update",
  async ({ videoId, data, queryParams }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/videos/${videoId}`, data, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const videoPublishToggle = createAsyncThunk(
  "videos/publishToggle",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/videos/publish/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
