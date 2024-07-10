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

      return { response, staticUrl };
    } else {
      console.log("File upload failed");
      return null;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove the locally saved temp file as the upload failed.
    return null;
  }
};

// Delete a file by URL
const deleteFromCloudinary = async (url) => {
  try {
    // Extract the public_id from the URL
    const urlParts = url.split("/");
    publicIdWithExtension = urlParts.slice(uploadIndex + 1).join("/"); // e.g., 'folder_path/file_name.jpg'
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // e.g., 'v1623321084/sample'

    // Delete the file from Cloudinary
    const response = await cloudinary.uploader.destroy(publicId);

    if (!response || response.result !== "ok") {
      throw new Error("Failed to delete file from Cloudinary");
    }

    return response;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

export { uploadOnCloudinary };
