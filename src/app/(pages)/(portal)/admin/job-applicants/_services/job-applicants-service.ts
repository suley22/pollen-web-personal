"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// Query key for job-applicants-related queries
export const jobApplicantsQueryKey = "job_applicants";

// Columnas del Kanban
// TODO(job_applicants): Exportar tipos/enum para ColumnId y centralizar estilos (colors/badges) en theme.
export const JOB_SEEKER_COLUMNS = [
  {
    id: "new_applicants",
    title: "New Applicants",
    color: "bg-slate-100",
    badgeColor: "bg-slate-500",
  },
  {
    id: "in_progress",
    title: "In Progress",
    color: "bg-blue-100",
    badgeColor: "bg-blue-500",
  },
  {
    id: "matched_to_employer",
    title: "Matched to Employer",
    color: "bg-purple-100",
    badgeColor: "bg-purple-500",
  },
  {
    id: "complete",
    title: "Complete",
    color: "bg-green-100",
    badgeColor: "bg-green-500",
  },
];

// ===============
// React Query Hooks
// ===============

/**
 * Hook: fetch job applicants grouped by status for Kanban board
 * Returns applicants organized by status columns (new_applicants, in_progress, etc.)
 *
 * @param jobId - The UUID of the job to fetch applicants for
 * @returns React Query result with grouped applicants data
 */
export function useJobApplicants(jobId: string | null) {
  return useQuery({
    enabled: !!jobId,
    queryKey: [jobApplicantsQueryKey, "applicants", jobId],
    queryFn: () => getJobApplicants(jobId!),
  });
}

// ===============
// Service Functions (used by hooks)
// ===============

/**
 * Obtiene los aplicantes reales desde la base de datos para un job específico
 * Agrupa los aplicantes por status (columnas del Kanban)
 *
 * @param jobId - The UUID of the job to fetch applicants for
 * @returns Promise with grouped applicants data
 */
async function getJobApplicants(jobId: string): Promise<GroupedApplicants> {
  try {
    const { data: applications, error: applicationsError } = await supabase
      .from("job_applications")
      .select("*")
      .eq("job_id", jobId)
      .order("created_at", { ascending: false });

    if (applicationsError) {
      console.error("❌ Error fetching job applicants:", applicationsError);
      throw applicationsError;
    }

    console.log(
      "✅ Applications fetched:",
      applications?.length || 0,
      applications,
    );

    if (!applications || applications.length === 0) {
      console.log("⚠️ No applications found for this job");
      // No hay aplicaciones para este job
      return {
        new_applicants: [],
        in_progress: [],
        matched_to_employer: [],
        complete: [],
      };
    }

    // 2. Obtener los user_ids únicos
    const userIds = [
      ...new Set(applications.map((app) => app.user_id).filter(Boolean)),
    ];

    console.log("👥 Unique user_ids:", userIds);

    // 3. Obtener los datos de job_seeker para esos user_ids
    let jobSeekersMap = new Map();
    if (userIds.length > 0) {
      const { data: jobSeekers, error: jobSeekersError } = await supabase
        .from("job_seeker")
        .select("id, name, email, profile_picture, overall_skills_score")
        .in("id", userIds);

      if (jobSeekersError) {
        console.error("❌ Error fetching job seekers:", jobSeekersError);
        // Continuar sin los datos de job_seeker
      } else {
        console.log(
          "✅ Job seekers fetched:",
          jobSeekers?.length || 0,
          jobSeekers,
        );
        jobSeekers?.forEach((jobSeeker) => {
          jobSeekersMap.set(jobSeeker.id, jobSeeker);
        });
      }
    }

    // 4. Agrupar aplicantes por status
    const groupedApplicants: GroupedApplicants = {
      new_applicants: [],
      in_progress: [],
      matched_to_employer: [],
      complete: [],
    };

    // 5. Transformar y agrupar los datos
    applications.forEach((app) => {
      try {
        const jobSeeker = app.user_id ? jobSeekersMap.get(app.user_id) : null;

        const transformedApplicant = {
          id: jobSeeker?.id?.toString() || app.user_id?.toString() || "unknown",
          application_id: app.id.toString(),
          name: jobSeeker?.name || "Unknown",
          avatar_url: jobSeeker?.profile_picture || null,
          match_score:
            app.overall_score || jobSeeker?.overall_skills_score || 0,
          applied_date: new Date(app.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          sub_status: app.sub_status || "Review Not Started",
          is_fast_track: app.is_fast_track || false,
          // Assessment scores - usando optional chaining por si no existen
          score1: (app as any).score1 ?? 0,
          score2: (app as any).score2 ?? 0,
          score3: (app as any).score3 ?? 0,
          score4: (app as any).score4 ?? 0,
          // Assessment response ID - CAMPO FALTANTE AGREGADO
          assessment_response_id: app.assessment_response_id || null,
          // Calendly interview link
          pollen_interview_invite_link:
            app.pollen_interview_invite_link || null,
          // Campos adicionales por si se necesitan
          email: jobSeeker?.email || "",
          status: app.status,
          job_id: app.job_id || null,
        };

        // Agregar a la columna correspondiente
        if (app.status in groupedApplicants) {
          (groupedApplicants as any)[app.status].push(transformedApplicant);
        }
      } catch (appError) {
        console.error("❌ Error transforming application:", appError, app);
      }
    });

    console.log("📊 Grouped applicants:", groupedApplicants);
    return groupedApplicants;
  } catch (error) {
    console.error("❌ Error in getJobApplicants:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    // En caso de error, retornar estructura vacía
    return {
      new_applicants: [],
      in_progress: [],
      matched_to_employer: [],
      complete: [],
    };
  }
}

/**
 * Transforma las aplicaciones agrupadas por columna en una lista plana con status
 * Para la vista Grid
 *
 * @param jobSeekers - Applicants grouped by status
 * @returns Flattened list of applicants with status information
 */
export function transformJobSeekersToList(
  jobSeekers: GroupedApplicants,
): JobApplicant[] {
  const allJobSeekers: JobApplicant[] = [];

  JOB_SEEKER_COLUMNS.forEach((column) => {
    jobSeekers[column.id as keyof GroupedApplicants]?.forEach((jobSeeker) => {
      allJobSeekers.push({
        ...jobSeeker,
        status: column.id,
        statusLabel: column.title,
        statusColor: column.badgeColor,
      } as JobApplicant & { statusLabel: string; statusColor: string });
    });
  });

  return allJobSeekers;
}

/**
 * Hook: update applicant status (for drag & drop functionality)
 * Updates the status of a job application in the database
 */
export function useUpdateApplicantStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      newStatus,
      jobId,
    }: {
      applicationId: string;
      newStatus: string;
      jobId: string;
    }) => {
      const { data, error } = await supabase
        .from("job_applications")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the applicants query to refresh the UI
      queryClient.invalidateQueries({
        queryKey: [jobApplicantsQueryKey, "applicants", variables.jobId],
      });

      // Invalidate assessment responses to update the drawer immediately
      queryClient.invalidateQueries({
        queryKey: ["assessment-responses"],
      });
    },
    onError: (error) => {
      console.error("Error updating applicant status:", error);
    },
  });
}

/**
 * Hook: update applicant sub-status
 */
export function useUpdateApplicantSubStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      subStatus,
      jobId,
    }: {
      applicationId: string;
      subStatus: string;
      jobId: string;
    }) => {
      const { data, error } = await supabase
        .from("job_applications")
        .update({
          sub_status: subStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [jobApplicantsQueryKey, "applicants", variables.jobId],
      });

      // Invalidate assessment responses to update the drawer immediately
      queryClient.invalidateQueries({
        queryKey: ["assessment-responses"],
      });
    },
    onError: (error) => {
      console.error("Error updating applicant sub-status:", error);
    },
  });
}

/**
 * Hook: update both status and sub_status for an applicant
 * Used when inviting to interview or similar state changes
 */
export function useUpdateApplicantStatusAndSubStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      status,
      subStatus,
      jobId,
      stoppedAtStage,
    }: {
      applicationId: string;
      status: string;
      subStatus: string;
      jobId: string;
      stoppedAtStage?: string;
    }) => {
      const updateData: any = {
        status: status,
        sub_status: subStatus,
        updated_at: new Date().toISOString(),
      };

      // Only update stopped_at_stage when status changes to "complete" and stoppedAtStage is provided
      if (status === "complete" && stoppedAtStage) {
        updateData.stopped_at_stage = stoppedAtStage;
      }

      const { data, error } = await supabase
        .from("job_applications")
        .update(updateData)
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [jobApplicantsQueryKey, "applicants", variables.jobId],
      });

      // Invalidate assessment responses to update the drawer immediately
      queryClient.invalidateQueries({
        queryKey: ["assessment-responses"],
      });
    },
    onError: (error) => {
      console.error("Error updating applicant status and sub-status:", error);
    },
  });
}

/**
 * Hook: update Calendly interview link for an applicant
 * Updates pollen_interview_invite_link in the job_applications table
 */
export function useUpdateCalendlyLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      calendlyLink,
      jobId,
    }: {
      applicationId: string;
      calendlyLink: string;
      jobId: string;
    }) => {
      const { data, error } = await supabase
        .from("job_applications")
        .update({
          pollen_interview_invite_link: calendlyLink,
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the applicants query to refresh the UI
      queryClient.invalidateQueries({
        queryKey: [jobApplicantsQueryKey, "applicants", variables.jobId],
      });
    },
    onError: (error) => {
      console.error("Error updating Calendly link:", error);
    },
  });
}

/**
 * Hook: update assessment scores for an applicant
 * Updates score1, score2, score3, score4 in the job_applications table
 */
export function useUpdateAssessmentScores() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      scores,
      jobId,
    }: {
      applicationId: string;
      scores: {
        score1: number;
        score2: number;
        score3: number;
        score4: number;
      };
      jobId: string;
    }) => {
      // First, get the current status of the application
      const { data: currentApplication, error: fetchError } = await supabase
        .from("job_applications")
        .select("status")
        .eq("id", applicationId)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      // Calculate overall_score if status is "new_applicants"
      const updateData: any = {
        score1: scores.score1,
        score2: scores.score2,
        score3: scores.score3,
        score4: scores.score4,
        updated_at: new Date().toISOString(),
      };

      if (currentApplication?.status === "new_applicants") {
        const averageScore =
          (scores.score1 + scores.score2 + scores.score3 + scores.score4) / 4;
        const overallScore = (averageScore / 10) * 100;
        updateData.overall_score = overallScore;
      }

      const { data, error } = await supabase
        .from("job_applications")
        .update(updateData)
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the applicants query to refresh the UI
      queryClient.invalidateQueries({
        queryKey: [jobApplicantsQueryKey, "applicants", variables.jobId],
      });

      // Invalidate assessment responses to update the drawer immediately
      queryClient.invalidateQueries({
        queryKey: ["assessment-responses"],
      });
    },
    onError: (error) => {
      console.error("Error updating assessment scores:", error);
    },
  });
}

// ===============
// Types
// ===============

export interface JobApplicant {
  id: string;
  application_id: string;
  name: string;
  avatar_url: string | null;
  match_score: number;
  applied_date: string;
  sub_status: string;
  is_fast_track?: boolean;
  is_verified?: boolean;
  email?: string;
  status: string;
}

export interface GroupedApplicants {
  new_applicants: JobApplicant[];
  in_progress: JobApplicant[];
  matched_to_employer: JobApplicant[];
  complete: JobApplicant[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  badgeColor: string;
}

// ===============
// Helper Functions
// ===============

/**
 * Obtiene información de una columna por su ID
 *
 * @param columnId - The ID of the column to find
 * @returns Column information or undefined if not found
 */
export function getColumnInfo(columnId: string): KanbanColumn | undefined {
  return JOB_SEEKER_COLUMNS.find((col) => col.id === columnId);
}

/**
 * Actualiza el estado de una aplicación de trabajo
 */
export async function updateJobApplicationStatus(
  applicationId: string,
  newStatus: string,
) {
  try {
    console.log("🔄 Updating application status:", {
      applicationId,
      newStatus,
    });

    const { data, error } = await supabase
      .from("job_applications")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", applicationId)
      .select();

    if (error) {
      console.error("❌ Error updating application status:", error);
      throw error;
    }

    console.log("✅ Application status updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in updateJobApplicationStatus:", error);
    throw error;
  }
}

export function useUpdateInternalNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      internalNotes,
    }: {
      applicationId: string;
      internalNotes: string;
    }) => {
      const { data, error } = await supabase
        .from("job_applications")
        .update({
          internal_notes: internalNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        console.error("❌ Error updating internal notes:", error);
        throw error;
      }

      console.log("✅ Internal notes updated successfully:", data);
      return data;
    },
    onSuccess: (data, variables) => {
      console.log("🎯 Internal notes update success, invalidating queries");
      // Invalidate the job applicants query to refresh the data
      queryClient.invalidateQueries({
        queryKey: [jobApplicantsQueryKey],
      });
    },
    onError: (error) => {
      console.error("❌ Error in useUpdateInternalNotes:", error);
    },
  });
}
