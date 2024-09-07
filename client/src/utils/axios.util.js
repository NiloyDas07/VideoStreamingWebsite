import axios from "axios";

const mode = import.meta.env.MODE;
const devURL = import.meta.env.VITE_DEV_API_URL;
const prodURL = import.meta.env.VITE_PROD_API_URL;

let baseURL;

switch (mode) {
  case "development":
    baseURL = devURL;
    break;

  case "production":
    baseURL = prodURL;
    break;

  default:
    baseURL = devURL;
    break;
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export { axiosInstance };
