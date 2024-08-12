import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios.util";

export const createPlaylist = createAsyncThunk(
  "playlist/create",
  async (playlist, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/playlist/", playlist);
      if (res.success === false) return rejectWithValue(res.data);
      console.log(res.data);
      return res.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getPlaylistById = createAsyncThunk(
  "playlist/getById",
  async ({ playlistId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/playlist/${playlistId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updatePlaylist = createAsyncThunk(
  "playlist/update",
  async ({ playlistId, updatedPlaylist }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/playlist/${playlistId}`,
        updatedPlaylist,
      );
      if (res.success === false) return rejectWithValue(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  "playlist/delete",
  async ({ playlistId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/playlist/${playlistId}`);
      if (res.success === false) return rejectWithValue(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideo",
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/playlist/add/${videoId}/${playlistId}`,
      );
      if (res.success === false) return rejectWithValue(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "playlist/removeVideo",
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/playlist/remove/${videoId}/${playlistId}`,
      );
      if (res.success === false) return rejectWithValue(res.data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserPlaylists = createAsyncThunk(
  "playlist/getUserPlaylists",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/playlist/user/${userId}`);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);
