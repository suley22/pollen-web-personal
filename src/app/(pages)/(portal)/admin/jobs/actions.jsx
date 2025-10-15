"use server";

import { createClient } from "@/lib/utils/supabase/server";

/**
 * Fetches application counts for a specific job
 */
async function fetchJobApplicationCounts(supabase, jobId) {
  try {
    // Count new applications to review
    const { count: newApplicationsCount } = await supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .eq("job_id", jobId)
      .eq("status", "pending");

    // Count Pollen interviews booked (applications in interview stage)
    const { count: pollenInterviewsCount } = await supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .eq("job_id", jobId)
      .eq("status", "interview_scheduled");

    // Count candidates matched to employer (applications approved/matched)
    const { count: candidatesMatchedCount } = await supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .eq("job_id", jobId)
      .eq("status", "matched");

    // Count feedback sent (applications completed with feedback)
    const { count: feedbackSentCount } = await supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .eq("job_id", jobId)
      .eq("status", "completed");

    // Count total applications
    const { count: totalApplicationsCount } = await supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .eq("job_id", jobId);

    return {
      newApplicationsToReview: newApplicationsCount || 0,
      pollenInterviewsBooked: pollenInterviewsCount || 0,
      candidatesMatchedToEmployer: candidatesMatchedCount || 0,
      feedbackSent: feedbackSentCount || 0,
      total_applications: totalApplicationsCount || 0,
    };
  } catch (error) {
    console.error(`Error fetching application counts for job ${jobId}:`, error);
    return {
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      candidatesMatchedToEmployer: 0,
      feedbackSent: 0,
      total_applications: 0,
    };
  }
}

export async function getJobList(filters = {}) {
  try {
    console.log("Fetching jobs with filters:", filters);

    const supabase = await createClient();

    let query = supabase
      .from("job")
      .select("*")
      .order("created_at", { ascending: false });

    // Aplicar filtro por status si existe
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    // Aplicar filtro de búsqueda si existe
    if (filters.searchTerm) {
      query = query.or(
        `company_name.ilike.%${filters.searchTerm}%,job_title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching jobs:", error);
      return { success: false, error: error.message };
    }

    // Fetch application counts for each job
    const jobsWithApplicationCounts = await Promise.all(
      data.map(async (job) => {
        const applicationCounts = await fetchJobApplicationCounts(
          supabase,
          job.id,
        );

        return {
          ...job,
          ...applicationCounts,
        };
      }),
    );

    return { success: true, data: jobsWithApplicationCounts };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}
