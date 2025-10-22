"use server";

import { createClient } from "@/lib/utils/supabase/server";
import {
  createEmployerService,
  EmployerFilters,
} from "@/services/employerService";
import { createStorageService } from "@/services/storageService";
import { usePendingFileUpload } from "@/hooks/usePendingFileUpload";

export async function fetchEmployersAction(
  filters: EmployerFilters = { status: "all", searchTerm: "" },
) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployers(filters);
}

export async function fetchEmployerByIdAction(id: string) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployerById(id);
}

export async function fetchEmployerByIdWithDefaultsAction(id: string) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployerByIdWithDefaults(id);
}

export async function fetchEmployerProfileAction(id: string) {
  try {
    const employerService = await createEmployerService();
    const result = await employerService.fetchEmployerById(id);

    if (result.success) {
      return { error: null, data: result.data };
    } else {
      return { error: result.error, data: null };
    }
  } catch (error) {
    console.error("Action: Error fetching employer profile:", error);
    return { error: "Failed to fetch employer profile", data: null };
  }
}

export async function updateEmployerAction(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const supabase = await createClient();
    
    const file = formData.get("logo_url");
    const bucketName = "images";
    const folder = "employer_logo";
    
    if (file && file instanceof File && file.size > 0) {
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          error: "Invalid file type. Please upload an image file."
        };
      }

      const storageService = await createStorageService();
      const publicUrl = await storageService.uploadFile(file, bucketName, folder);

      console.log("Image uploaded successfully to:", publicUrl);

      // Update formData with the new logo URL
      formData.set("logo_url", publicUrl);
    } else {
      console.log("No valid file found");
      // If no file or invalid file, remove logo_url from formData
      if (!file || typeof file === 'string') {
        formData.delete("logo_url");
      }
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    // Use EmployerService to update the employer
    const employerService = await createEmployerService();
    const result = await employerService.updateEmployer(id, formData, user.id);

    return result;
  } catch (error) {
    console.error("Action: Unexpected error updating company:", error);
    return {
      success: false,
      error: "Failed to update company profile",
    };
  }
}

export async function createEmployerAction(prevState: any, formData: FormData) {
  try {
    console.log("createEmployerAction: Received data:", {
      prevState,
      isFormData: formData instanceof FormData,
      hasEntries: typeof formData?.entries === "function",
      formDataType: typeof formData,
    });

    // Log all FormData entries for debugging
    console.log("=== CREATE FormData Debug ===");
    console.log("All FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, {
        value,
        type: typeof value,
        isFile: value instanceof File,
        isBlob: value instanceof Blob,
        constructor: value.constructor.name,
        details: value instanceof File ? {
          name: value.name,
          type: value.type,
          size: value.size
        } : "Not a file"
      });
    }
    console.log("=== End CREATE FormData Debug ===");

    const supabase = await createClient();

    // Check if there's an image file to upload
    const file = formData.get("logo_url");
    console.log("File received in create action:", {
      file,
      isFile: file instanceof File,
      fileName: file instanceof File ? file.name : "Not a file",
      fileType: file instanceof File ? file.type : "Not a file",
      fileSize: file instanceof File ? file.size : "Not a file"
    });

    if (file && file instanceof File && file.size > 0) {
      console.log("Processing image file for creation:", {
        name: file.name,
        type: file.type,
        size: file.size
      });

      const bucketName = "images";
      const folder = "employer_logo";
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          error: "Invalid file type. Please upload an image file."
        };
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return {
          success: false,
          error: `Failed to upload image: ${uploadError.message}`
        };
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      console.log("Image uploaded successfully to:", publicUrl);

      // Update formData with the new logo URL
      formData.set("logo_url", publicUrl);
    } else {
      console.log("No valid file found, proceeding without logo");
      // Remove invalid logo_url from formData
      if (!file || typeof file === 'string') {
        formData.delete("logo_url");
      }
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    // Use EmployerService to create the employer
    const employerService = await createEmployerService();
    const result = await employerService.createEmployer(formData, user.id);

    return result;
  } catch (error) {
    console.error("Action: Unexpected error creating company:", error);
    return {
      success: false,
      error: "Failed to create company profile",
    };
  }
}

export async function fetchJobsByEmployer(employerId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job")
    .select("*")
    .eq("company_id", employerId)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    return { error: error.message, data: null };
  } else {
    // Ensure data is an array and normalize salary_range for each job
    const normalizedJobs = Array.isArray(data)
      ? data.map((job) => ({
          ...job,
          salary_range: job.salary_range || [],
        }))
      : [];
    return { error: null, data: normalizedJobs };
  }
}
