import axiosInstance from "../utils/axios.util";

// Register User.
export const registerUser = async (data) => {
  try {
    const res = await axiosInstance.post("/users/register", data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Login User.
export const loginUser = async (data) => {
  try {
    const res = await axiosInstance.post("/users/login", data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Logout User.
export const logoutUser = async () => {
  try {
    const res = await axiosInstance.get("/users/logout");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get Current User.
export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/users/current");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Refresh Access Token.
export const refreshAccessToken = async () => {
  try {
    const res = await axiosInstance.get("/users/refresh-token");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get Channel Details
export const getUserChannelProfile = async (username) => {
  try {
    const res = await axiosInstance.get(`/users/channel/${username}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Change User Password.
export const changeUserPassword = async (newPassword) => {
  try {
    const res = await axiosInstance.post("/users/change-password", newPassword);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Update Account Details.
export const updateAccountDetails = async (data) => {
  try {
    const res = await axiosInstance.patch("/users/update-account", data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Update User Avatar.
export const updateUserAvatar = async (data) => {
  try {
    const res = await axiosInstance.patch("/users/change-avatar", data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Update User Cover Image.
export const updateUserCoverImage = async (data) => {
  try {
    const res = await axiosInstance.patch("/users/change-cover-image", data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get Watch History.
export const getWatchHistory = async () => {
  try {
    const res = await axiosInstance.get("/users/watch-history");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
