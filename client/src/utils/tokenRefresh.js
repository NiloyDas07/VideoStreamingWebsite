import { axiosInstance } from "./axios.util";

const refreshAccessToken = async () => {
  try {
    const res = await axiosInstance.post("/users/refresh-token");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const handleRequestWithTokenRefresh = async (
  originalRequest,
  ...args
) => {
  try {
    const res = await originalRequest(...args);
    return res;
  } catch (error) {
    if (error.response.status === 401) {
      try {
        await refreshAccessToken();
        const res = await originalRequest();
        return res;
      } catch (refreshError) {
        return refreshError;
      }
    }
    return error;
  }
};
