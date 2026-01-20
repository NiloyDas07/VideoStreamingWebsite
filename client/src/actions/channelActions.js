import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios.util";

import { handleRequestWithTokenRefresh } from "../utils/tokenRefresh";

export const getChannelByUsername = createAsyncThunk(
  "channel/getById",
  async (channelName, { rejectWithValue }) => {
    const response = await handleRequestWithTokenRefresh(
      async () => await axiosInstance.get(`/users/channel/${channelName}`),
    );

    if (
      response instanceof Error ||
      response?.error ||
      response.success === false
    ) {
      return rejectWithValue(response.response?.data);
    }

    return response?.data?.data;
  },
);
