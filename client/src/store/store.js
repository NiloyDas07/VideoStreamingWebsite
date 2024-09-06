import { configureStore } from "@reduxjs/toolkit";

import {
  authSlice,
  videoSlice,
  multipleVideoSlice,
  commentSlice,
  playListSlice,
  UiSlice,
  channelSlice,
} from "../features/";

const store = configureStore({
  reducer: {
    auth: authSlice,
    videos: multipleVideoSlice,
    video: videoSlice,
    comments: commentSlice,
    playlists: playListSlice,
    ui: UiSlice,
    channel: channelSlice,
  },
});

export default store;
