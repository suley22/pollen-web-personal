"use server";

import { createJobService } from "@/services/jobsService";

export async function fetchJobProfile(id) {
  const jobService = await createJobService();
  const result = await jobService.fetchJobById(id);

  if (result.success) {
    return { error: null, job: result.data };
  } else {
    return { error: result.error, data: null };
  }
}

export async function fetchPersonaData(job_id) {
  const jobService = await createJobService();
  const result = await jobService.fetchPersonaData(job_id);

  if (result.success) {
    return { error: null, persona_data: result.data };
  } else {
    return { error: result.error, persona_data: null };
  }
}

export async function fetchAssessmentData(job_id) {
  const jobService = await createJobService();
  const result = await jobService.fetchAssessmentData(job_id);

  if (result.success) {
    return { error: null, assessment: result.data };
  } else {
    return { error: result.error, assessment: null };
  }
}
