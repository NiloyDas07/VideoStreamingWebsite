import { axiosInstance } from "../utils/axios.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleRequestWithTokenRefresh } from "../utils/tokenRefresh";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      if (res.success === false) return rejectWithValue(res);
      console.log(res);
      return res.data?.data?.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axiosInstance.post("/users/logout");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

// Async thunk for getting the current user if logged in
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.get("/users/user/current"),
    );

    if (res instanceof Error || res?.error || res.success === false)
      return rejectWithValue(res?.response?.data);

    return res.data?.data;
  },
);

// Async thunk for creating an account
export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/register", data);
      if (res.success === false) return rejectWithValue(res);
      return res?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for changing user avatar
export const updateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async (data, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.patch("/users/change-avatar", data),
    );

    if (res instanceof Error || res?.error || res.success === false)
      return rejectWithValue(res);

    return res?.data?.data;
  },
);

// Async thunk for changing user cover image
export const updateUserCoverImage = createAsyncThunk(
  "auth/updateUserCoverImage",
  async (data, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.patch("/users/change-cover-image", data),
    );

    if (res instanceof Error || res?.error || res.success === false)
      return rejectWithValue(res);

    return res?.data?.data;
  },
);

// Async thunk for updating account details
export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async (data, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.patch("/users/update-account", data),
    );

    if (res instanceof Error || res?.error || res.success === false) {
      if (res.response?.data?.data?.error === "username exists") {
        alert("Username already exists");
      }

      return rejectWithValue(res.response?.data);
    }

    return res?.data?.data;
  },
);

// Async thunk for adding video to watch history
export const addVideoToWatchHistory = createAsyncThunk(
  "videos/addToWatchHistory",
  async ({ videoId }, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.patch(`/users/watch-history/${videoId}`),
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response?.response?.data);
    }

    return response.data?.data;
  },
);

// Async thunk for deleting the account
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.delete("/users/delete-account"),
    );

    if (res instanceof Error || res?.error || res.success === false) {
      return rejectWithValue(res?.response?.data);
    }

    return res?.data?.data;
  },
);

// Change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    const res = await handleRequestWithTokenRefresh(
      async () =>
        await axiosInstance.patch("/users/change-password", {
          oldPassword,
          newPassword,
        }),
    );

    if (res instanceof Error || res?.error || res.success === false) {
      // console.log(res);
      return rejectWithValue(res?.response?.data);
    }

    return res?.data?.data;
  },
);
