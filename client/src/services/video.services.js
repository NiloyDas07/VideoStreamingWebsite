import { axiosInstance } from "../utils/axios.util";

export const getAllVideos = async () => {
  try {
    const res = await axiosInstance.get("/videos/");
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const addNewVideo = async (data) => {
  try {
    const res = await axiosInstance.post("/videos/", data);
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const getVideoById = async (videoId) => {
  try {
    const res = await axiosInstance.get(`/videos/${videoId}`);
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const res = await axiosInstance.delete(`/videos/${videoId}`);
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const updateVideo = async (videoId, data) => {
  try {
    const res = await axiosInstance.patch(`/videos/${videoId}`, data);
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const videoPublishToggle = async (videoId) => {
  try {
    const res = await axiosInstance.patch(`/videos/publish/${videoId}`);
    return res;
  } catch (error) {
    return error.response.data;
  }
};
