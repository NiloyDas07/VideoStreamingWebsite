import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a file
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (response) {
      console.log(
        `File uploaded to cloudinary, url: ${response.url}, \nFull response: ${response}`
      );
      return response;
    } else {
      console.log("File upload failed");
      return null;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove the locally saved temp file as the upload failed.
    return null;
  }
};

export { uploadOnCloudinary };
