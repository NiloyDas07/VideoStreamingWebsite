import { createSlice } from "@reduxjs/toolkit";
import { getAllVideos } from "../actions/videoActions";

const initialState = {
  videos: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const multipleVideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.videos = action.payload;
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.videos = [];
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = multipleVideoSlice.actions;

export default multipleVideoSlice.reducer;
