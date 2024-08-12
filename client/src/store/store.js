import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import videoSlice from "../features/videoSlice";
import multipleVideoSlice from "../features/multipleVideoSlice";
import commentSlice from "../features/commentSlice";
import playListSlice from "../features/playListSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    videos: multipleVideoSlice,
    video: videoSlice,
    comments: commentSlice,
    playlists: playListSlice,
  },
});

export default store;
