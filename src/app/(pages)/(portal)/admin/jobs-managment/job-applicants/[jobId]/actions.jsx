"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchJobApplicants(jobId) {
  const supabase = await createClient();

  // Hacemos JOIN entre job_applications y job_seeker para obtener los datos completos
  const { data: applicants, error } = await supabase
    .from("job_applications")
    .select(
      `
      *,
      job_seeker:applicant_id (
        *
      )
    `,
    )
    .eq("job_id", jobId);

  if (error) {
    return { error: error, data: null };
  } else {
    return { error: null, data: applicants };
  }
}

export async function fetchJobDetails(jobId) {
  const supabase = await createClient();

  const { data: job, error } = await supabase
    .from("job")
    .select("*")
    .eq("id", jobId)
    .single();

  if (error) {
    return { error: error, data: null };
  } else {
    return { error: null, data: job };
  }
}
