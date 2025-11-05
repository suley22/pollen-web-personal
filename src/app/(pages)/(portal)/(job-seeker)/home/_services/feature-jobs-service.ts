import { createClient } from "@/lib/utils/supabase/client";

const supabase = await createClient();

// Get logged in user ID
async function getLoggedInUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
}

// Get user applications to check if already applied
export async function getUserApplications() {
  try {
    const userId = await getLoggedInUserId();

    if (!userId) {
      return { success: true, data: new Set() };
    }

    const { data, error } = await supabase
      .from("job_applications")
      .select("job_id")
      .eq("user_id", userId);

    if (error) {
      console.error("❌ Error fetching user applications:", error);
      return { success: false, error: error.message };
    }

    // Return a Set of job IDs for quick lookup
    const appliedJobIds = new Set(data.map((app) => app.job_id));
    return { success: true, data: appliedJobIds };
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return { success: false, error: "Failed to fetch applications" };
  }
}

export async function getFeaturedJobs() {
  try {
    const jobsQuery = await supabase
      .from("job")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("status", "live")
      .limit(3);

    const { data, error } = await jobsQuery;

    if (error) {
      console.error("❌ JobService: Error fetching jobs:", error);
      return { success: false, error: error.message };
    }

    const list = data.map((job) => mapAdminJobToCardJob(job, "pollen"));

    return { success: true, data: list };
  } catch (error) {
    console.error("JobService: Unexpected error:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

export async function getFeaturedHiddenJobs() {
  try {
    const jobsQuery = await supabase
      .from("job") // TODO: Reemplazar por tabla de hidden jobs
      .select("*")
      .order("created_at", { ascending: false })
      .eq("status", "live")
      .limit(6);

    const { data, error } = await jobsQuery;

    if (error) {
      console.error("❌ JobService: Error fetching jobs:", error);
      return { success: false, error: error.message };
    }

    //Remueve los 3 primeros trabajos para evitar duplicados con los trabajos destacados normales
    data.splice(0, 3);

    const list = data.map((job) => mapAdminJobToCardJob(job, "hidden"));

    return { success: true, data: list };
  } catch (error) {
    console.error("JobService: Unexpected error:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

export function saveSavedJob(jobId) {
  console.log("Simulando guardado de trabajo favorito:", jobId);
  return { success: true, error: null };
}

// Map admin job shape -> JobCard shape
const mapAdminJobToCardJob = (job, type) => ({
  id: String(job.id),
  title: job.job_title || job.title || "Untitled job",
  company: {
    id: String(job.company_id || job.employer_id || job.id),
    name: job.company_name || "Unknown Company",
    logo: job.company_logo || undefined,
  },
  location: job.location || job.city || "Unknown location",
  salary: job.salary || job.salary_range || "",
  pollenApproved: Boolean(
    job.pollenApproved ||
      job.pollen_approved ||
      job.is_pollen_approved ||
      false,
  ),
  description: job.description || job.job_description || "",
  type: type, // TODO: Completar con los estados de la base
  applicationDeadline:
    job.application_deadline ||
    job.assigned_date ||
    job.published_at ||
    job.created_at ||
    new Date(),
});
