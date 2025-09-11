// Cloudinary configuration and upload utilities
// You'll need to set these environment variables in your .env file:
// VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
// VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

import toast from "react-hot-toast";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.warn("Cloudinary not configured, using local URL");
    return URL.createObjectURL(file);
  }

  // Show loading toast and disable pointer events
  const loadingToast = toast.loading("Uploading file...", {
    duration: Infinity,
  });

  // Disable pointer events on the entire document
  document.body.style.pointerEvents = "none";
  document.body.style.cursor = "wait";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorMessage = `Upload failed: ${response.statusText}`;
      toast.error(errorMessage, { id: loadingToast });
      throw new Error(errorMessage);
    }

    const result: CloudinaryUploadResult = await response.json();

    // Show success toast
    toast.success("File uploaded successfully!", { id: loadingToast });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    // Show error toast with the actual error message
    const errorMessage =
      error instanceof Error ? error.message : "Upload failed";
    toast.error(errorMessage, { id: loadingToast });

    // Fallback to local URL
    return URL.createObjectURL(file);
  } finally {
    // Re-enable pointer events
    document.body.style.pointerEvents = "auto";
    document.body.style.cursor = "auto";
  }
};

export const uploadImageToCloudinary = uploadToCloudinary;
export const uploadVideoToCloudinary = uploadToCloudinary;
export const uploadFileToCloudinary = uploadToCloudinary;
