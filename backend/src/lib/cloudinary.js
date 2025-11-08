import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localImagePath) => {
  try {
    if (!localImagePath) return null;

    //upload file on cloud
    const response = await cloudinary.uploader.upload(localImagePath, {
      folder: process.env.CLOUDINARY_PROJECT,
      resource_type: "image",
    });

    //file uploaded successfully, unlink it
    try {
      if (localImagePath && fs.existsSync(localImagePath)) {
        fs.unlinkSync(localImagePath);
      }
    } catch (_) {}
    return response;
  } catch (err) {
    console.error("Cloudinary upload error:", err?.message || err);
    console.error("Local image path:", localImagePath);
    //removes locally saved temp files as the upload operation got failed
    try {
      if (localImagePath && fs.existsSync(localImagePath)) {
        fs.unlinkSync(localImagePath);
      }
    } catch (_) {}
    return null;
  }
};

const deleteFromCloudinary = async (url) => {
  const public_id = url.split("/").pop().split(".")[0];
  return await cloudinary.uploader.destroy(
    `${process.env.CLOUDINARY_PROJECT}/${public_id}`
  );
};

export { uploadOnCloudinary, deleteFromCloudinary };
