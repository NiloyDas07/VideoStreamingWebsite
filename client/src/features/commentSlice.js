import { createSlice } from "@reduxjs/toolkit";
import {
  getAllComments,
  addNewComment,
  updateComment,
  deleteComment,
} from "../actions/commentActions";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addNewComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments = [action.payload.data, ...state.comments];
        state.loading = false;
        state.error = null;
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id,
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id,
        );
        if (index !== -1) {
          state.comments.splice(index, 1);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetComments } = commentSlice.actions;

export default commentSlice.reducer;
