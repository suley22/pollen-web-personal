"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchJobProfile(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job")
    .select("*")
    .eq("id", id)
    .single();
  const job = {
    ...data,
    who_would_love: data?.who_would_love || [],
    candidate_counts: data?.candidate_counts || {},
    candidateCounts: {
      total: data?.candidate_counts?.total || 15,
      new: data?.candidate_counts?.new || 10,
      inProgress: data?.candidate_counts?.inProgress || 5,
      complete: data?.candidate_counts?.complete || 8,
      hired: data?.candidate_counts?.hired || 2,
    },
  };

  if (error) {
    return { error: error.message, data: null };
  } else {
    return { error: null, job };
  }
}

export async function fetchPersonaData(job_id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("persona_data")
    .select("*")
    .eq("job_id", job_id)
    .single();

  const persona_data = {
    ...data,
    primaryDisc: data?.primary_disc || "N/A",
    traits: data?.traits || [],
    workStyle: data?.work_style || "Not specified",
    idealEnvironment: data?.ideal_environment || "Not specified",
    behavioralInsights: data?.behavioral_insights || "Not specified",
  };

  if (error) {
    return { error: error.message, persona_data: null };
  } else {
    return { error: null, persona_data: persona_data };
  }
}

export async function fetchAssessmentData(job_id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_assessment")
    .select("*")
    .eq("job_id", job_id);

  const assessment = data ? data : [];

  if (error) {
    return { error: error.message, assessment: null };
  } else {
    return { error: null, assessment: assessment };
  }
}
