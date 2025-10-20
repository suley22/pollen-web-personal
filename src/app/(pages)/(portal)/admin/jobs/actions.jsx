"use server";

import { createJobService } from "@/services/jobsService";

// ============================================
// LIST ACTIONS
// ============================================

export async function getJobList(filters = {}) {
  const jobService = await createJobService();
  return await jobService.fetchJobs(filters);
}

// ============================================
// CREATE ACTIONS
// ============================================

export async function getEmployerProfiles(searchTerm = "") {
  const jobService = await createJobService();
  return await jobService.fetchEmployerProfiles(searchTerm);
}

export async function getJobAssessments(jobId) {
  const jobService = await createJobService();
  return await jobService.fetchJobAssessments(jobId);
}

export async function createJobAction(prevState, formData) {
  const jobService = await createJobService();
  return await jobService.createJob(formData);
}

// ============================================
// EDIT ACTIONS
// ============================================

export async function updateJobAction(jobId, prevState, formData) {
  const jobService = await createJobService();
  return await jobService.updateJob(jobId, formData);
}

export async function fetchJobByIdAction(id) {
  const jobService = await createJobService();
  return await jobService.fetchJobWithAssessment(id);
}
