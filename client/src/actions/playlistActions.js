import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios.util";
import { handleRequestWithTokenRefresh } from "../utils/tokenRefresh";

export const createPlaylist = createAsyncThunk(
  "playlist/create",
  async (playlist, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.post("/playlist/", playlist),
    );

    if (res instanceof Error || res?.error || res.success === false) {
      return rejectWithValue(res?.response?.data);
    }

    return res.data?.data;
  },
);

export const getPlaylistById = createAsyncThunk(
  "playlist/getById",
  async ({ playlistId }, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.get(`/playlist/${playlistId}`),
    );

    if (res instanceof Error || res?.error || res.success === false) {
      return rejectWithValue(res?.response?.data);
    }
    return res.data.data;
  },
);

export const updatePlaylist = createAsyncThunk(
  "playlist/update",
  async ({ playlistId, updatedPlaylist }, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.patch(`/playlist/${playlistId}`, updatedPlaylist),
    );

    if (res instanceof Error || res?.error || res.success === false)
      return rejectWithValue(res?.response?.data);

    return res.data;
  },
);

export const deletePlaylist = createAsyncThunk(
  "playlist/delete",
  async ({ playlistId }, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.delete(`/playlist/${playlistId}`),
    );

    if (res instanceof Error || res?.error || res.success === false)
      return rejectWithValue(res?.response?.data);

    return res.data;
  },
);

export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideo",
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`),
    );

    if (res instanceof Error || res?.error)
      return rejectWithValue(res?.response?.data);

    return res.data;
  },
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "playlist/removeVideo",
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.patch(`/playlist/remove/${videoId}/${playlistId}`),
    );

    if (res instanceof Error || res?.error || res.success === false)
      return rejectWithValue(res.response?.data);

    return res.data;
  },
);

export const getUserPlaylists = createAsyncThunk(
  "playlist/getUserPlaylists",
  async ({ userId }, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.get(`/playlist/user/${userId}`),
    );

    if (res instanceof Error || res?.error || res.success === false)
      return rejectWithValue(res.response?.data);

    return res?.data?.data;
  },
);
