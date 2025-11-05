"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getLoggedInUserId } from "@/services/userService";

const supabase = createClient();

export const jobsQueryKey = "jobs";

// ===============
// Types
// ===============
export interface JobsFilters {
  jobType?: "all" | "pollen" | "external";
  industry?: string;
  location?: string;
  contractType?: string;
  searchTerm?: string;
}

// ===============
// Hook: fetch jobs with filters
// ===============
export function usePollenJobs(filters: JobsFilters) {
  return useQuery({
    queryKey: [jobsQueryKey, "pollen", "list", filters],
    queryFn: async () => {
      // Solo traer trabajos aprobados por Pollen y en estado "live"
      let jobQuery = supabase
        .from("job")
        .select("*")
        .eq("status", "live")
        .eq("pollen_approved", true);

      if (filters.jobType && filters.jobType !== "all") {
        // Nota: este hook ya fuerza pollen_approved = true arriba.
        // Si alguien pasa jobType = "external" aquí, no obtendrá resultados.
        // Para externos usar useExternalJobs.
      }

      if (filters.industry && filters.industry !== "all") {
        jobQuery = jobQuery.eq("industry", filters.industry);
      }

      if (filters.location && filters.location !== "all") {
        jobQuery = jobQuery.eq("location", filters.location);
      }

      if (filters.contractType && filters.contractType !== "all") {
        jobQuery = jobQuery.eq("contract_type", filters.contractType);
      }

      if (filters.searchTerm) {
        jobQuery = jobQuery.or(
          `job_title.ilike.%${filters.searchTerm}%,` +
            `company_name.ilike.%${filters.searchTerm}%,` +
            `description.ilike.%${filters.searchTerm}%`,
        );
      }

      jobQuery = jobQuery.order("created_at", { ascending: false });

      const { data, error } = await jobQuery;

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
}

export function useExternalJobs(filters: JobsFilters) {
  return useQuery({
    queryKey: [jobsQueryKey, "external", "list", filters],
    queryFn: async () => {
      let jobQuery = supabase
        .from("external_jobs")
        .select("*")
        .eq("status", "live");

      if (filters.industry && filters.industry !== "all") {
        jobQuery = jobQuery.eq("industry", filters.industry);
      }

      if (filters.location && filters.location !== "all") {
        jobQuery = jobQuery.eq("location", filters.location);
      }

      if (filters.contractType && filters.contractType !== "all") {
        jobQuery = jobQuery.eq("contract_type", filters.contractType);
      }

      if (filters.searchTerm) {
        jobQuery = jobQuery.or(
          `job_title.ilike.%${filters.searchTerm}%,` +
            `company_name.ilike.%${filters.searchTerm}%,` +
            `description.ilike.%${filters.searchTerm}%`,
        );
      }

      jobQuery = jobQuery.order("created_at", { ascending: false });

      const { data, error } = await jobQuery;

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
}

// ===============
// Hook: save/unsave a job (mutation)
// ===============
export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      // TODO: Implement actual save logic
      console.log("Simulando guardado de trabajo favorito:", jobId);
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [jobsQueryKey] });
    },
  });
}

// ===============
// Hook: fetch a single job by id
// ===============
export function useJobById(jobId: string | null) {
  return useQuery({
    enabled: !!jobId,
    queryKey: [jobsQueryKey, "detail", jobId],
    queryFn: async () => {
      const { data, error } = await supabase
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
        .eq("id", jobId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        ...data,
        company_logo: data.employer_profile?.logo_url || null,
        company_name: data.employer_profile?.company_name || null,
      };
    },
  });
}

// ===============
// Hook: fetch a single external job by id
// ===============
export function useExternalJobById(jobId: string | null) {
  return useQuery({
    enabled: !!jobId,
    queryKey: [jobsQueryKey, "external", "detail", jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("external_jobs")
        .select("*")
        .eq("id", jobId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}

// ===============
// Hook: check if user has already applied to a job
// ===============
export function useCheckIfUserApplied(jobId: string | null) {
  return useQuery({
    enabled: !!jobId,
    queryKey: [jobsQueryKey, "application-status", jobId],
    queryFn: async () => {
      // Get the current user's auth ID (UUID)
      const userAuthId = await getLoggedInUserId();

      if (!userAuthId) {
        throw new Error("User not authenticated");
      }

      // Check if the user has already applied to this job
      const { data: existingApplication, error } = await supabase
        .from("job_applications")
        .select("id, pollen_interview_invite_link, calendly_invite")
        .eq("job_id", jobId)
        .eq("user_id", userAuthId)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      // 🔍 DEBUG: Ver qué datos se obtienen de la DB
      console.log("🔍 useCheckIfUserApplied - DB Response:");
      console.log("   jobId:", jobId);
      console.log("   userAuthId:", userAuthId);
      console.log("   existingApplication:", existingApplication);
      console.log(
        "   existingApplication.pollen_interview_invite_link:",
        existingApplication?.pollen_interview_invite_link,
      );
      console.log(
        "   existingApplication.calendly_invite:",
        existingApplication?.calendly_invite,
      );
      console.log(
        "   Type of calendly_invite:",
        typeof existingApplication?.calendly_invite,
      );
      console.log(
        "   calendly_invite is null?:",
        existingApplication?.calendly_invite === null,
      );
      console.log(
        "   calendly_invite is undefined?:",
        existingApplication?.calendly_invite === undefined,
      );

      return {
        hasApplied: !!existingApplication,
        interviewLink:
          existingApplication?.pollen_interview_invite_link || null,
        calendlyEventUri: existingApplication?.calendly_invite || null,
      };
    },
  });
}

// ===============
// Hook: create a job application (mutation)
// ===============
export function useCreateJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      jobId,
      assessmentResponseId,
    }: {
      jobId: string;
      assessmentResponseId?: string;
    }) => {
      console.log("🔍 Raw jobId received:", jobId, "Type:", typeof jobId);

      // Get the current user's auth ID (UUID)
      const userAuthId = await getLoggedInUserId();

      if (!userAuthId) {
        throw new Error("User not authenticated");
      }

      console.log("🔍 Checking for existing application:", {
        jobId: jobId,
        userAuthId,
      });

      // Check if the user has already applied to this job
      const { data: existingApplication, error: checkError } = await supabase
        .from("job_applications")
        .select("id")
        .eq("job_id", jobId)
        .eq("user_id", userAuthId)
        .maybeSingle();

      if (checkError) {
        console.error("❌ Error checking existing application:", checkError);
        throw new Error(checkError.message);
      }

      if (existingApplication) {
        throw new Error("You have already applied to this job");
      }

      console.log("📝 Creating new job application...");

      // Create the job application with default values matching the database schema
      const insertData: any = {
        job_id: jobId,
        user_id: userAuthId,
        status: "new_applicants",
        sub_status: "Review Not Started",
        application_stage: "application_received",
      };

      // Add assessment_response_id if provided
      if (assessmentResponseId) {
        insertData.assessment_response_id = assessmentResponseId;
      }

      const { data, error } = await supabase
        .from("job_applications")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("❌ Error creating job application:", error);
        console.error("❌ Full error details:", JSON.stringify(error, null, 2));
        throw new Error(error.message);
      }

      console.log("✅ Job application created successfully:", data);
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate the application status query for this job
      queryClient.invalidateQueries({
        queryKey: [jobsQueryKey, "application-status", variables.jobId],
      });
      // Optionally invalidate other related queries
      queryClient.invalidateQueries({ queryKey: [jobsQueryKey] });
    },
  });
}

// ===============
// Hook: fetch all user applications to check applied status and interview links
// ===============
export function useUserApplications() {
  return useQuery<{
    appliedJobIds: Set<string>;
    jobsWithInterviewLink: Set<string>;
  }>({
    queryKey: [jobsQueryKey, "user-applications"],
    queryFn: async () => {
      const userAuthId = await getLoggedInUserId();

      if (!userAuthId) {
        return {
          appliedJobIds: new Set<string>(),
          jobsWithInterviewLink: new Set<string>(),
        };
      }

      const { data, error } = await supabase
        .from("job_applications")
        .select("job_id, pollen_interview_invite_link")
        .eq("user_id", userAuthId);

      if (error) {
        throw new Error(error.message);
      }

      // Create sets for quick lookup
      const appliedJobIds = new Set<string>(
        data?.map((app) => app.job_id) || [],
      );
      const jobsWithInterviewLink = new Set<string>(
        data
          ?.filter((app) => app.pollen_interview_invite_link)
          .map((app) => app.job_id) || [],
      );

      return {
        appliedJobIds,
        jobsWithInterviewLink,
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
