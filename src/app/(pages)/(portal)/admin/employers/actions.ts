"use server";

import { createClient } from "@/lib/utils/supabase/server";
import {
  createEmployerService,
  EmployerFilters,
} from "@/services/employerService";
import { createStorageService } from "@/services/storageService";
import { createUserService } from "@/services/userService";

export async function fetchEmployersAction(
  filters: EmployerFilters = { status: "all", searchTerm: "" },
) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployers(filters);
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
    
    const imageFieldName = "logo_url";
    const logoUrl = await getImageUrl(formData, imageFieldName);
    formData.set(imageFieldName, logoUrl);
    // Get current user
    const userService = await createUserService();
    const userId = await userService.getLoggedInUserId();

    if (!userId) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    // Use EmployerService to update the employer
    const employerService = await createEmployerService();
    const result = await employerService.updateEmployer(id, formData, userId);

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

    

    // Get current user
    const userService = await createUserService();
    const userId = await userService.getLoggedInUserId();

    if (!userId) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    // Use EmployerService to create the employer
    const employerService = await createEmployerService();
    const result = await employerService.createEmployer(formData, userId);

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
async function getImageUrl(formData: FormData, imageFieldName: string) {
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
      return publicUrl;
    } else {
      console.log("No valid file found");
      return null;
    }
}

