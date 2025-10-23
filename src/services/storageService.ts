import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

  export const uploadFile = async (file, bucketName = "company-logos", folder = "logos") => {

    try {

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
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return publicUrl;

    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } 
  };

  export const deleteFile = async (fileName, bucketName, folder) => {
    try {

      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        console.error("Delete error:", error);
        return false;
      }

      return true;

    } catch (error) {
      console.error("Delete error:", error);
      return false;
    }
  };
  


