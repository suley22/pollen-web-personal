"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { DateHelper } from "@/lib/helpers/date-helper";
import { getLoggedInUserId } from "@/services/userService";

const supabase = createClient();

const jobsQueryKey = "jobs";

export interface JobFilters {
  status?: string;
  assignment?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export function useJobsList(filters: JobFilters) {
  return useQuery({
    queryKey: [jobsQueryKey, "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Count query
      let countQuery = supabase
        .from("job")
        .select("*", { count: "exact", head: true })
        .filter("deleted_at", "is", null);

      if (filters.status && filters.status !== "all") {
        countQuery = countQuery.eq("status", filters.status);
      }

      if (filters.assignment && filters.assignment !== "all") {
        countQuery = countQuery.eq("assigned_to", filters.assignment);
      }

      if (filters.searchTerm) {
        countQuery = countQuery.or(
          `job_title.ilike.%${filters.searchTerm}%,company_name.ilike.%${filters.searchTerm}%`,
        );
      }

      const { count, error: countError } = await countQuery;

      if (countError) {
        throw new Error(countError.message);
      }

      // Data query with employer_profile join
      let query = supabase
        .from("job")
        .select(
          `
          *,
          employer_profile:company_id (
            company_name,
            logo_url
          )
        `,
        )
        .order("created_at", { ascending: false })
        .filter("deleted_at", "is", null)
        .range(from, to);

      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters.assignment && filters.assignment !== "all") {
        query = query.eq("assigned_to", filters.assignment);
      }

      if (filters.searchTerm) {
        query = query.or(
          `job_title.ilike.%${filters.searchTerm}%,company_name.ilike.%${filters.searchTerm}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      const totalPages = Math.ceil((count || 0) / pageSize);

      // Get unique user_ids to fetch profiles
      const userIds = [
        ...new Set(data?.map((job) => job.user_id).filter(Boolean)),
      ];

      // Fetch profiles for all user_ids in one query
      let profilesMap = new Map();
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profile")
          .select("id, first_name, last_name")
          .in("id", userIds);

        profiles?.forEach((profile) => {
          profilesMap.set(profile.id, profile);
        });
      }

      // Normalize jobs data - prioritize employer_profile company_name
      const normalizedJobs =
        data?.map((job) => {
          const profile = job.user_id ? profilesMap.get(job.user_id) : null;
          return {
            ...job,
            assigned_date: job.published_at || job.created_at,
            total_applications: job.total_applications || 0,
            newApplicationsToReview: job.new_applications_to_review || 0,
            pollenInterviewsBooked: job.pollen_interviews_booked || 0,
            needsApproval: job.needs_approval || false,
            company_name:
              job.employer_profile?.company_name ||
              job.company_name ||
              "Unknown Company",
            company_logo_url: job.employer_profile?.logo_url || null,
            responsibilities: job.responsibilities || [],
            who_would_love: job.who_would_love || [],
            admin:
              profile?.first_name || profile?.last_name
                ? `${profile?.last_name || ""} ${profile?.first_name || ""}`.trim()
                : "Unassigned",
          };
        }) || [];

      return {
        jobs: normalizedJobs,
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: count || 0,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: from + 1,
          to: Math.min(from + data.length, count || 0),
        },
      };
    },
  });
}

export function useJobsStatistics(filters?: JobFilters) {
  return useQuery({
    queryKey: [jobsQueryKey, "statistics", filters],
    queryFn: async () => {
      let query = supabase
        .from("job")
        .select("status, assigned_to")
        .filter("deleted_at", "is", null);

      if (filters?.searchTerm) {
        query = query.or(
          `job_title.ilike.%${filters.searchTerm}%,company_name.ilike.%${filters.searchTerm}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return {
        total: data?.length || 0,
        draft: data?.filter((j) => j.status === "draft").length || 0,
        live: data?.filter((j) => j.status === "live").length || 0,
        paused: data?.filter((j) => j.status === "paused").length || 0,
        complete: data?.filter((j) => j.status === "complete").length || 0,
        cancelled: data?.filter((j) => j.status === "cancelled").length || 0,
        assigned: data?.filter((j) => j.assigned_to).length || 0,
        unassigned: data?.filter((j) => !j.assigned_to).length || 0,
      };
    },
  });
}

export function useSearchEmployers(searchTerm: string) {
  return useQuery({
    queryKey: ["employers", "search", searchTerm],
    queryFn: async () => {
      let query = supabase
        .from("employer_profile")
        .select("id, company_name, logo_url")
        .filter("deleted_at", "is", null)
        .eq("approval_status", "live")
        .order("company_name", { ascending: true });

      if (searchTerm && searchTerm.trim()) {
        query = query.ilike("company_name", `%${searchTerm}%`);
      }

      const { data, error } = await query.limit(50);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchAdmins(searchTerm: string) {
  return useQuery({
    queryKey: ["admins", "search", searchTerm],
    queryFn: async () => {
      let query = supabase
        .from("profile")
        .select("id, first_name, last_name")
        .order("first_name", { ascending: true });

      if (searchTerm && searchTerm.trim()) {
        query = query.or(
          `first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`,
        );
      }

      const { data, error } = await query.limit(50);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useJobById(id: string) {
  return useQuery({
    enabled: !!id,
    queryKey: [jobsQueryKey, "profile", id],
    queryFn: async () => {
      // First get the job data
      const { data: jobData, error: jobError } = await supabase
        .from("job")
        .select(
          `
          *,
          employer_profile:company_id (
            logo_url,
            company_name
          )
        `,
        )
        .eq("id", id)
        .single();

      if (jobError) {
        console.error("JobService: Error fetching job by ID:", jobError);
        throw new Error(jobError.message);
      }

      if (!jobData) {
        throw new Error("Job not found");
      }

      // Then get the profile data if user_id exists
      let profileData = null;
      if (jobData.user_id) {
        const { data: profile } = await supabase
          .from("profile")
          .select("first_name, last_name")
          .eq("id", jobData.user_id)
          .single();

        profileData = profile;
      }

      // Combine the data
      const data = {
        ...jobData,
        profile: profileData,
      };

      // Normalize the job data
      const job = {
        ...data,
        company_logo_url: data?.employer_profile?.logo_url || null,
        company_name:
          data?.employer_profile?.company_name || data?.company_name || "",
        responsibilities: data?.responsibilities || [],
        who_would_love: data?.who_would_love || [],
        qualifications: data?.qualifications || [],
        benefits: data?.benefits || [],
        candidate_counts: data?.candidate_counts || {},
        candidateCounts: {
          total: data?.candidate_counts?.total || 15,
          new: data?.candidate_counts?.new || 10,
          inProgress: data?.candidate_counts?.inProgress || 5,
          complete: data?.candidate_counts?.complete || 8,
          hired: data?.candidate_counts?.hired || 2,
        },
        admin:
          data?.profile?.first_name || data?.profile?.last_name
            ? `${data?.profile?.last_name || ""} ${data?.profile?.first_name || ""}`.trim()
            : "Unassigned",
      };

      return job;
    },
  });
}

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const userId = await getLoggedInUserId();

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const transformedData = transformFormDataToDatabase(formData);

      // Validate required fields
      if (
        !transformedData.job_title ||
        !transformedData.job_title.toString().trim()
      ) {
        throw new Error("Job title is required");
      }

      // 1. Create the job
      const { data: jobData, error: jobError } = await supabase
        .from("job")
        .insert({
          ...transformedData,
          user_id: userId,
        })
        .select()
        .single();

      if (jobError) {
        console.error("JobService: Error creating job:", jobError);
        throw new Error(jobError.message || "Failed to create job");
      }

      console.log("JobService: Created job:", jobData);

      // 2. Create assessment if there's assessment data
      const formJobData = Object.fromEntries(formData.entries());
      const hasAssessmentData =
        formJobData.assessment_title ||
        formJobData.assessment_content ||
        formJobData.assessment_scoring_criteria;

      if (hasAssessmentData && jobData.id) {
        const assessmentData = transformAssessmentDataToDatabase(
          formData,
          jobData.id,
        );

        const { data: assessmentResult, error: assessmentError } =
          await supabase
            .from("job_assessment")
            .insert(assessmentData)
            .select()
            .single();

        if (assessmentError) {
          console.error(
            "JobService: Error creating assessment:",
            assessmentError,
          );
          console.warn(
            "Job was created but assessment failed:",
            assessmentError.message,
          );
        } else {
          console.log("JobService: Created assessment:", assessmentResult);
        }
      }

      return jobData;
    },
    onSuccess: () => {
      // Invalidate all jobs lists and statistics
      queryClient.invalidateQueries({ queryKey: [jobsQueryKey] });
    },
  });
};

const transformFormDataToDatabase = (formData: FormData) => {
  const formJobData = Object.fromEntries(formData.entries());

  // Parse array fields
  const responsibilities = parseArrayField(formJobData.responsibilities);
  const who_would_love = parseArrayField(formJobData.who_would_love);
  const pollen_approved_requirements = parseArrayField(
    formJobData.pollen_approved_requirements,
  );

  return {
    job_title: formJobData.job_title,
    company_name: formJobData.company_name,
    location: formJobData.location,
    working_hours: formJobData.working_hours,
    salary_range: formJobData.salary_range,
    work_arrangement: formJobData.work_arrangement,
    employment_type: formJobData.employment_type,
    employment_type_details: formJobData.employment_type_details,
    start_date: formJobData.start_date,
    application_deadline: formJobData.application_deadline,
    work_authorisation: formJobData.work_authorisation,
    description: formJobData.description,
    responsibilities: responsibilities,
    who_would_love: who_would_love,
    success_looks: formJobData.success_looks,
    pollen_approved_requirements: pollen_approved_requirements,
    internal_notes: formJobData.internal_notes,
    user_id: formJobData.user_id || null,
  };
};

const transformAssessmentDataToDatabase = (
  formData: FormData,
  jobId: string,
) => {
  const formJobData = Object.fromEntries(formData.entries());

  // Prepare structured_questions as JSONB
  const structuredQuestions = {
    title: formJobData.assessment_title || "",
    estimatedTime: formJobData.assessment_estimated_time
      ? parseInt(formJobData.assessment_estimated_time as string)
      : formJobData.estimated_time
        ? parseInt(formJobData.estimated_time as string)
        : null,
    totalQuestions: formJobData.assessment_total_questions
      ? parseInt(formJobData.assessment_total_questions as string)
      : formJobData.total_questions
        ? parseInt(formJobData.total_questions as string)
        : null,
    instructions: formJobData.assessment_instructions || "",
    openingQuestion: {
      title:
        formJobData.assessment_opening_question_title ||
        formJobData.opening_question_title ||
        "",
      content:
        formJobData.assessment_opening_question_content ||
        formJobData.opening_question_content ||
        "",
    },
    guidelines: {
      timeGuideline: formJobData.assessment_estimated_time
        ? `${formJobData.assessment_estimated_time} minutes`
        : formJobData.estimated_time
          ? `${formJobData.estimated_time} minutes`
          : null,
    },
  };

  return {
    job_id: jobId,
    assessment_type: "skills_assessment",
    estimated_duration: formJobData.assessment_estimated_time
      ? `${formJobData.assessment_estimated_time} minutes`
      : formJobData.estimated_time
        ? `${formJobData.estimated_time} minutes`
        : null,
    generated_content:
      formJobData.assessment_content || formJobData.generated_content || "",
    structured_questions: structuredQuestions,
    scoring_criteria:
      formJobData.assessment_scoring_criteria ||
      formJobData.scoring_criteria ||
      "",
  };
};

const parseArrayField = (fieldData: any): string[] => {
  if (!fieldData) return [];
  try {
    const parsed = JSON.parse(fieldData);
    // If it's an array of objects with 'value', extract the values
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed[0].value !== undefined
    ) {
      return parsed.map((item) => item.value).filter((v) => v && v.trim());
    }
    // If it's already a simple array, return it
    if (Array.isArray(parsed)) {
      return parsed.filter((v) => v && v.trim());
    }
    return [];
  } catch (e) {
    // If it's not JSON, try parsing as CSV (backward compatibility)
    console.log("Parsing field as CSV for backward compatibility:", e);
    return fieldData
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item);
  }
};

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const transformedData = transformFormDataToDatabase(formData);

      // Validate required fields
      if (
        !transformedData.job_title ||
        !transformedData.job_title.toString().trim()
      ) {
        throw new Error("Job title is required");
      }

      const { data, error } = await supabase
        .from("job")
        .update({
          ...transformedData,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("JobService: Error updating job:", error);
        throw new Error(error.message || "Failed to update job");
      }

      console.log("JobService: Updated job:", data);

      // Update assessment if there's assessment data
      const formJobData = Object.fromEntries(formData.entries());
      const hasAssessmentData =
        formJobData.assessment_title ||
        formJobData.assessment_content ||
        formJobData.assessment_scoring_criteria;

      if (hasAssessmentData) {
        const assessmentData = transformAssessmentDataToDatabase(formData, id);

        // Check if assessment already exists
        const { data: existingAssessment } = await supabase
          .from("job_assessment")
          .select("id")
          .eq("job_id", id)
          .single();

        if (existingAssessment) {
          // Update existing assessment
          const { error: assessmentError } = await supabase
            .from("job_assessment")
            .update({
              ...assessmentData,
              updated_at: new Date().toISOString(),
            })
            .eq("job_id", id);

          if (assessmentError) {
            console.error(
              "JobService: Error updating assessment:",
              assessmentError,
            );
            console.warn(
              "Job was updated but assessment failed:",
              assessmentError.message,
            );
          }
        } else {
          // Create new assessment
          const { error: assessmentError } = await supabase
            .from("job_assessment")
            .insert(assessmentData);

          if (assessmentError) {
            console.error(
              "JobService: Error creating assessment:",
              assessmentError,
            );
            console.warn(
              "Job was updated but assessment failed:",
              assessmentError.message,
            );
          }
        }
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the specific job profile
      queryClient.invalidateQueries({
        queryKey: [jobsQueryKey, "profile", variables.id],
      });
      // Invalidate all jobs lists and statistics
      queryClient.invalidateQueries({ queryKey: [jobsQueryKey] });
    },
  });
}

export function useUpdateJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("job")
        .update({
          status: status,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the specific job profile
      queryClient.invalidateQueries({
        queryKey: [jobsQueryKey, "profile", variables.id],
      });
      // Invalidate all jobs lists and statistics
      queryClient.invalidateQueries({ queryKey: [jobsQueryKey] });
    },
    onError: (error) => {
      console.error("Error updating job status:", error);
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data, error } = await supabase
        .from("job")
        .update({
          deleted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate all jobs queries to refresh the lists and statistics
      queryClient.invalidateQueries({ queryKey: [jobsQueryKey] });
    },
  });
}

// External Jobs Services
const externalJobsQueryKey = "external_jobs";

export function useExternalJobById(id: string) {
  return useQuery({
    enabled: !!id,
    queryKey: [externalJobsQueryKey, "profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("external_jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("JobService: Error fetching external job by ID:", error);
        throw new Error(error.message);
      }

      // Normalize the external job data
      const externalJob = {
        ...data,
        external_links: data?.external_links || [],
      };

      return externalJob;
    },
  });
}

export const useCreateExternalJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const userId = await getLoggedInUserId();

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const transformedData = transformExternalJobFormDataToDatabase(formData);

      // Validate required fields
      if (
        !transformedData.job_title ||
        !transformedData.job_title.toString().trim()
      ) {
        throw new Error("Job title is required");
      }

      if (
        !transformedData.company_name ||
        !transformedData.company_name.toString().trim()
      ) {
        throw new Error("Company name is required");
      }

      // Create the external job
      const { data: externalJobData, error: externalJobError } = await supabase
        .from("external_jobs")
        .insert({
          ...transformedData,
        })
        .select()
        .single();

      if (externalJobError) {
        console.error(
          "JobService: Error creating external job:",
          externalJobError,
        );
        throw new Error(
          externalJobError.message || "Failed to create external job",
        );
      }

      console.log("JobService: Created external job:", externalJobData);

      return externalJobData;
    },
    onSuccess: () => {
      // Invalidate all external jobs queries
      queryClient.invalidateQueries({ queryKey: [externalJobsQueryKey] });
    },
  });
};

const transformExternalJobFormDataToDatabase = (formData: FormData) => {
  const formJobData = Object.fromEntries(formData.entries());

  // Parse external_links array field
  const external_links = parseArrayField(formJobData.external_links);

  return {
    job_title: formJobData.job_title,
    company_name: formJobData.company_name,
    industries: formJobData.industries,
    location: formJobData.location,
    salary_range: formJobData.salary_range,
    working_hours: formJobData.working_hours,
    employment_type: formJobData.employment_type,
    application_deadline: formJobData.application_deadline,
    external_links: external_links,
  };
};

export function useUpdateExternalJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const transformedData = transformExternalJobFormDataToDatabase(formData);

      // Validate required fields
      if (
        !transformedData.job_title ||
        !transformedData.job_title.toString().trim()
      ) {
        throw new Error("Job title is required");
      }

      if (
        !transformedData.company_name ||
        !transformedData.company_name.toString().trim()
      ) {
        throw new Error("Company name is required");
      }

      const { data, error } = await supabase
        .from("external_jobs")
        .update({
          ...transformedData,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("JobService: Error updating external job:", error);
        throw new Error(error.message || "Failed to update external job");
      }

      console.log("JobService: Updated external job:", data);

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the specific external job profile
      queryClient.invalidateQueries({
        queryKey: [externalJobsQueryKey, "profile", variables.id],
      });
      // Invalidate all external jobs queries
      queryClient.invalidateQueries({ queryKey: [externalJobsQueryKey] });
    },
  });
}
