import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import videoSlice from "../features/videoSlice";
import multipleVideoSlice from "../features/multipleVideoSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    videos: multipleVideoSlice,
    video: videoSlice,
  },
});

export default store;
