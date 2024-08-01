import { createSlice } from "@reduxjs/toolkit";
import {
  addNewVideo,
  getVideoById,
  deleteVideo,
  updateVideo,
  videoPublishToggle,
} from "../actions/videoActions";

const initialState = {
  video: null,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    resetVideo: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addNewVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.video = null;
      })
      .addCase(addNewVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.video = action.payload;
      })
      .addCase(addNewVideo.rejected, (state, action) => {
        state.loading = false;
        state.video = null;
        state.error = action.payload;
      })
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.video = null;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.video = action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.video = null;
        state.error = action.payload;
      })
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.video = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.video = state.video.filter(
          (video) => video.id !== action.payload.id,
        );
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.video = null;
        state.error = action.payload;
      })
      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.video = action.payload;
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(videoPublishToggle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(videoPublishToggle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.video = action.payload;
      })
      .addCase(videoPublishToggle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVideo } = videoSlice.actions;

export default videoSlice.reducer;
