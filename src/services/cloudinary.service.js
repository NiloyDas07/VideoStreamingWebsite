import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a file
const uploadOnCloudinary = async ({
  localFilePath,
  publicId = null,
  folderPath = "VideoStreamingWebsite",
}) => {
  try {
    if (!localFilePath) return null;

    const options = {
      resource_type: "auto",
      overwrite: true,
      invalidate: true,
    };

    if (publicId) {
      options.public_id = publicId;
    }

    if (folderPath) {
      options.asset_folder = folderPath;
    }

    const response = await cloudinary.uploader.upload(localFilePath, options);

    if (response) {
      fs.unlinkSync(localFilePath);

      const { url } = response;
      const urlParts = url.split("/");
      const versionIndex = urlParts.findIndex(
        (part) => part.startsWith("v") && !isNaN(part.slice(1))
      );
      
      if (versionIndex !== -1) {
        urlParts.splice(versionIndex, 1);
      }

      const staticUrl = urlParts.join("/");

      return staticUrl;
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
