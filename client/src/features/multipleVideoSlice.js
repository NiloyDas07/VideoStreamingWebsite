import { createSlice } from "@reduxjs/toolkit";
import {
  getAllVideos,
  getVideosLikedByUser,
  getWatchHistory,
} from "../actions/videoActions";

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

        if (action.meta.arg.pageNumber > 1) {
          state.videos = {
            currentPage: action.payload.currentPage,
            hasNextPage: action.payload.hasNextPage,
            hasPrevPage: action.payload.hasPrevPage,
            nextPage: action.payload.nextPage,
            prevPage: action.payload.prevPage,
            totalPages: action.payload.totalPages,
            videos: [...state.videos.videos, ...action.payload.videos],
          };
        } else {
          state.videos = action.payload;
        }
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.videos = [];
        state.error = action.payload;
      })
      .addCase(getVideosLikedByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideosLikedByUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.pageNumber > 1) {
          state.videos = {
            currentPage: action.payload.currentPage,
            hasNextPage: action.payload.hasNextPage,
            hasPrevPage: action.payload.hasPrevPage,
            nextPage: action.payload.nextPage,
            prevPage: action.payload.prevPage,
            totalPages: action.payload.totalPages,
            videos: [...state.videos.videos, ...action.payload.videos],
          };
        } else {
          state.videos = action.payload;
        }
      })
      .addCase(getVideosLikedByUser.rejected, (state, action) => {
        state.loading = false;
        state.videos = [];
        state.error = action.payload;
      })
      .addCase(getWatchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.pageNumber > 1) {
          state.videos = {
            currentPage: action.payload.currentPage,
            hasNextPage: action.payload.hasNextPage,
            hasPrevPage: action.payload.hasPrevPage,
            nextPage: action.payload.nextPage,
            prevPage: action.payload.prevPage,
            totalPages: action.payload.totalPages,
            videos: [...state.videos.videos, ...action.payload.videos],
          };
        } else {
          const { watchHistory, ...rest } = action.payload;
          state.videos = { videos: watchHistory, ...rest };
        }
      })
      .addCase(getWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.videos = [];
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = multipleVideoSlice.actions;

export default multipleVideoSlice.reducer;
