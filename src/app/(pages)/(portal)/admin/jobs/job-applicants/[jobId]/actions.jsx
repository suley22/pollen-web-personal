"use server";

import { createJobService } from "@/services/jobsService";

export async function fetchJobApplicants(jobId) {
  const jobService = await createJobService();
  const result = await jobService.fetchJobApplicants(jobId);

  if (result.success) {
    return { error: null, data: result.data };
  } else {
    return { error: result.error, data: null };
  }
}

export async function fetchJobDetails(jobId) {
  const jobService = await createJobService();
  const result = await jobService.fetchJobById(jobId);

  if (result.success) {
    return { error: null, data: result.data };
  } else {
    return { error: result.error, data: null };
  }
}
