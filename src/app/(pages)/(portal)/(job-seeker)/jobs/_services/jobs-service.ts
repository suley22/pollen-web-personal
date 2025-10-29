import { createClient } from "@/lib/utils/supabase/client";
import { getLoggedInUserId } from "@/services/userService";

const supabase = await createClient();

export async function getJobs(filters) {
  try {
    let jobQuery = supabase.from("job").select("*");

    if (filters.jobType && filters.jobType !== "all") {
      // "pollen" -> pollen_approved = true
      // "external" -> pollen_approved = false
      if (filters.jobType === "pollen") {
        jobQuery = jobQuery.eq("pollen_approved", true);
      } else if (filters.jobType === "external") {
        jobQuery = jobQuery.eq("pollen_approved", false);
      }
    }

    //TODO: cómo aplicar el filtro a industries
    //if (filters.industry && filters.industry !== "all") {
    //  query = query.eq("industry", filters.industry);
    //}

    if (filters.location && filters.location !== "all") {
      jobQuery = jobQuery.eq("location", filters.location);
    }

    if (filters.contractType && filters.contractType !== "all") {
      jobQuery = jobQuery.eq("contract_type", filters.contractType);
    }

    if (filters.searchTerm) {
      jobQuery = jobQuery.or(
        `job_title.ilike.%${filters.searchTerm}%,` +
          `company_name.ilike.%${filters.searchTerm}%,` +
          `description.ilike.%${filters.searchTerm}%`,
      );
    }

    jobQuery = jobQuery.order("created_at", { ascending: false });

    const { data, error } = await jobQuery;

    if (error) {
      console.error("❌ JobService: Error fetching jobs:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("JobService: Unexpected error:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

export function saveSavedJob(jobId) {
  console.log("Simulando guardado de trabajo favorito:", jobId);
  return { success: true, error: null };
}

export async function getJobById(jobId) {
  try {
    const { data, error } = await supabase
      .from("job")
      .select(
        `
          *,
          employer_profile:company_id (
            logo_url,
            company_name
          )
        `,
      )
      .eq("id", jobId)
      .single();

    if (error) {
      console.error("❌ Error fetching job:", error);
      return { success: false, error: error.message };
    }

    const job = {
      ...data,
      company_logo: data.employer_profile?.logo_url || null,
      company_name: data.employer_profile?.company_name || null,
    };

    return { success: true, data: job };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Failed to fetch job" };
  }
}

/**
 * Checks if the current user has already applied to a specific job
 * @param jobId - The ID of the job to check (UUID)
 * @returns Object with success status and hasApplied boolean
 */
export async function checkIfUserApplied(jobId) {
  try {
    // Get the current user's auth ID (UUID)
    const userAuthId = await getLoggedInUserId();

    if (!userAuthId) {
      return {
        success: false,
        error: "User not authenticated",
        hasApplied: false,
      };
    }

    // Check if the user has already applied to this job
    const { data: existingApplication, error } = await supabase
      .from("job_applications")
      .select("id")
      .eq("job_id", jobId)
      .eq("user_id", userAuthId)
      .maybeSingle();

    if (error) {
      console.error("❌ Error checking if user applied:", error);
      return {
        success: false,
        error: error.message,
        hasApplied: false,
      };
    }

    return {
      success: true,
      hasApplied: !!existingApplication,
    };
  } catch (error) {
    console.error("❌ Unexpected error checking if user applied:", error);
    return {
      success: false,
      error: "Failed to check application status",
      hasApplied: false,
    };
  }
}

/**
 * Creates a job application record
 * @param jobId - The ID of the job being applied to (UUID)
 * @returns Object with success status and data/error
 */
export async function createJobApplication(jobId) {
  try {
    console.log("🔍 Raw jobId received:", jobId, "Type:", typeof jobId);

    // Get the current user's auth ID (UUID)
    const userAuthId = await getLoggedInUserId();

    if (!userAuthId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    console.log("🔍 Checking for existing application:", {
      jobId: jobId,
      userAuthId,
    });

    // Check if the user has already applied to this job
    const { data: existingApplication, error: checkError } = await supabase
      .from("job_applications")
      .select("id")
      .eq("job_id", jobId)
      .eq("user_id", userAuthId)
      .maybeSingle();

    if (checkError) {
      console.error("❌ Error checking existing application:", checkError);
      return {
        success: false,
        error: checkError.message,
      };
    }

    if (existingApplication) {
      return {
        success: false,
        error: "You have already applied to this job",
      };
    }

    console.log("📝 Creating new job application...");

    // Create the job application with default values matching the database schema
    const { data, error } = await supabase
      .from("job_applications")
      .insert({
        job_id: jobId,
        user_id: userAuthId, // user_id will default to auth.uid() in the database
        status: "new_applicants",
        sub_status: "Unopened",
        application_stage: "application_received",
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Error creating job application:", error);
      console.error("❌ Full error details:", JSON.stringify(error, null, 2));
      return {
        success: false,
        error: error.message,
      };
    }

    console.log("✅ Job application created successfully:", data);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("❌ Unexpected error creating job application:", error);
    return {
      success: false,
      error: "Failed to create job application",
    };
  }
}
