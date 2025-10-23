import { createClient } from "@/lib/utils/supabase/client";

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
