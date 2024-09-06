import { createSlice } from "@reduxjs/toolkit";

import { getChannelByUsername } from "../actions/channelActions";

const initialState = {
  channelId: null,
  channel: null,
  loading: false,
  error: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannelByUsername.pending, (state) => {
        state.loading = true;
        error: null;
      })
      .addCase(getChannelByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(getChannelByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = channelSlice.actions;

export default channelSlice.reducer;
