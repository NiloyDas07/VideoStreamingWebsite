// client\src\features\playlistSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getUserPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../actions/playlistActions";

const initialState = {
  playlists: [],
  playlist: null,
  loading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter(
          (playlist) => playlist.id !== action.payload.id,
        );
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVideoToPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(addVideoToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeVideoFromPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
