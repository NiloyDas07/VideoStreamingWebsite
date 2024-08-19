import { axiosInstance } from "../utils/axios.util";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      if (res.success === false) return rejectWithValue(res.data);
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
    try {
      const res = await axiosInstance.get("/users/user/current");
      return res.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for creating an account
export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/register", data);
      if (res.success === false) return rejectWithValue(res.data);
      return res?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
