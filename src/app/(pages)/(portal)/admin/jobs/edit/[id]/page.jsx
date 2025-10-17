import { createClient } from "@/lib/utils/supabase/server";
import { JobEditForm } from "../job-profile-edit";
import { redirect } from "next/navigation";

async function getJobData(jobId) {
  const supabase = await createClient();

  // Fetch job data
  const { data: job, error: jobError } = await supabase
    .from("job")
    .select("*")
    .eq("id", jobId)
    .single();

  if (jobError) {
    console.error("Error fetching job:", jobError);
    return { job: null, assessment: null };
  }

  // Fetch assessment data
  const { data: assessment, error: assessmentError } = await supabase
    .from("job_assessment")
    .select("*")
    .eq("job_id", jobId)
    .single();

  if (assessmentError && assessmentError.code !== "PGRST116") {
    // PGRST116 is "not found", which is okay
    console.error("Error fetching assessment:", assessmentError);
  }

  return { job, assessment };
}

export default async function JobEditPage({ params }) {
  const { id } = await params;

  if (!id) {
    redirect("/admin/jobs");
  }

  const { job, assessment } = await getJobData(id);

  if (!job) {
    redirect("/admin/jobs");
  }

  return <JobEditForm job={job} assessment={assessment} />;
}
