"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useToastNotifications } from "@/hooks/useToastNotifications";

/**
 * Custom hook for uploading files to Supabase Storage
 */
export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { showError } = useToastNotifications();

  const uploadFile = async (file, bucketName = "company-logos", folder = "logos") => {
    

    setIsUploading(true);

    try {
      const supabase = createClient();

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload file to Supabase Storage
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        showError("Upload Failed", error.message || "Failed to upload file");
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return publicUrl;

    } catch (error) {
      console.error("Upload error:", error);
      showError("Upload Failed", "An unexpected error occurred while uploading");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (filePath, bucketName = "company-logos") => {
    try {
      const supabase = createClient();
      
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        console.error("Delete error:", error);
        showError("Delete Failed", error.message || "Failed to delete file");
        return false;
      }

      return true;

    } catch (error) {
      console.error("Delete error:", error);
      showError("Delete Failed", "An unexpected error occurred while deleting");
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading,
  };
}