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

    // Fetch job applications with job details
    const { data: applications, error } = await supabase
      .from("job_applications")
      .select(
        `
        id,
        job_id,
        status,
        sub_status,
        created_at,
        job:job_id (
          id,
          title,
          description,
          location,
          salary_range,
          application_deadline,
          created_at,
          employer_profile:company_id (
            company_name,
            logo_url
          )
        )
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Transform data to match the expected format
    const transformedJobs = applications
      .filter((app) => app.job) // Filter out applications with null jobs
      .map((app) => {
        const job = Array.isArray(app.job) ? app.job[0] : app.job;
        const employerProfile = Array.isArray(job?.employer_profile)
          ? job.employer_profile[0]
          : job?.employer_profile;

        return {
          id: job?.id,
          title: job?.title,
          description: job?.description,
          location: job?.location,
          salary: job?.salary_range,
          applicationDeadline: job?.application_deadline,
          type: "pollen" as const,
          company: {
            name: employerProfile?.company_name || "Unknown Company",
            logo: employerProfile?.logo_url || null,
          },
          applicationStatus: app.status,
          applicationSubStatus: app.sub_status,
          appliedAt: app.created_at,
          isSaved: false, // Can be enhanced later with saved jobs logic
        };
      });

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
