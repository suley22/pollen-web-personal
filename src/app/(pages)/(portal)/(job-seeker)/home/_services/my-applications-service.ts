import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// Get logged in user ID
async function getLoggedInUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
}

export async function getMyApplications() {
  try {
    const userId = await getLoggedInUserId();

    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    // Fetch job applications first
    const { data: applications, error: appsError } = await supabase
      .from("job_applications")
      .select("id, job_id, status, sub_status, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (appsError) {
      console.error("Error fetching applications:", appsError);
      return {
        success: false,
        error: appsError.message,
      };
    }

    if (!applications || applications.length === 0) {
      return {
        success: true,
        data: [],
      };
    }

    // Get all unique job IDs
    const jobIds = applications.map((app) => app.job_id).filter(Boolean);

    // Fetch jobs data
    const { data: jobs, error: jobsError } = await supabase
      .from("job")
      .select(
        `
        id,
        job_title,
        description,
        location,
        salary_range,
        application_deadline,
        created_at,
        employer_profile:company_id (
          company_name,
          logo_url
        )
      `,
      )
      .in("id", jobIds);

    if (jobsError) {
      console.error("Error fetching jobs:", jobsError);
      return {
        success: false,
        error: jobsError.message,
      };
    }

    // Create a map of jobs for quick lookup
    const jobsMap = new Map(jobs?.map((job) => [job.id, job]) || []);

    // Transform data to match the expected format
    const transformedJobs = applications
      .map((app) => {
        const job = jobsMap.get(app.job_id);
        if (!job) return null;

        const employerProfile = Array.isArray(job.employer_profile)
          ? job.employer_profile[0]
          : job.employer_profile;

        return {
          id: job.id,
          title: job.job_title,
          description: job.description,
          location: job.location,
          salary: job.salary_range,
          applicationDeadline: job.application_deadline,
          type: "pollen" as const,
          company: {
            name: employerProfile?.company_name || "Unknown Company",
            logo: employerProfile?.logo_url || null,
          },
          applicationStatus: app.status,
          applicationSubStatus: app.sub_status,
          appliedAt: app.created_at,
          isSaved: false,
        };
      })
      .filter(Boolean);

    return {
      success: true,
      data: transformedJobs,
    };
  } catch (error) {
    console.error("Exception in getMyApplications:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
