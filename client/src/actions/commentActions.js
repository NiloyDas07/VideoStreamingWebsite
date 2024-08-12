import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios.util";

export const getAllComments = createAsyncThunk(
  "comments/getAll",
  async ({ videoId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/comments/${videoId}`);
      return response.data.data.comments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addNewComment = createAsyncThunk(
  "comments/addNew",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/comments/${videoId}`, {
        content,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/comments/${commentId}`, {
        content,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
