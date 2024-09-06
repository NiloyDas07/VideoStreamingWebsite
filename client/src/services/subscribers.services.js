import { axiosInstance } from "../utils/axios.util";

const getUserSubscriberCount = async () => {
  try {
    const res = await axiosInstance.get("/subscriptions/user/subscriber-count");
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

export { getUserSubscriberCount };
