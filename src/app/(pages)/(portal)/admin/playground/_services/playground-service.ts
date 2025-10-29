"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// Columnas del Kanban - mapeadas directamente al campo "status" de job_applications
export const TASK_COLUMNS = [
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

/**
 * Hook para obtener los aplicantes de un job específico
 * Trae las aplicaciones con info básica del job_seeker
 */
export function useJobApplicants(jobId: string) {
  return useQuery({
    queryKey: ["playground", "applicants", jobId],
    queryFn: async () => {
      const { data: applications, error } = await supabase
        .from("job_applications")
        .select(
          `
          *,
          job_seeker:applicant_id (
            id,
            name,
            profile_picture
          )
        `,
        )
        .eq("job_id", jobId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching job applicants:", error);
        throw new Error(error.message);
      }

      // Agrupar por status (que coincide con las columnas del Kanban)
      return groupApplicantsByStatus(applications);
    },
    enabled: !!jobId, // Solo ejecuta si hay jobId
  });
}

/**
 * Agrupa las aplicaciones por su status en el formato del Kanban
 */
function groupApplicantsByStatus(applications: any[]) {
  const grouped: Record<string, any[]> = {
    new_applicants: [],
    in_progress: [],
    matched_to_employer: [],
    complete: [],
  };

  applications?.forEach((app) => {
    const status = app.status || "new_applicants";
    const task = transformApplicationToTask(app);
    grouped[status].push(task);
  });

  return grouped;
}

/**
 * Transforma una aplicación en el formato que esperan TaskCard y GridRow
 */
function transformApplicationToTask(application: any) {
  const seeker = application.job_seeker;

  return {
    // IDs
    id: application.id, // ID de la aplicación
    applicant_id: seeker?.id,

    // Datos del candidato (desde job_seeker)
    name: seeker?.name || "Unknown",
    avatar_url: seeker?.profile_picture || null,

    // Datos de la aplicación (desde job_applications)
    match_score: application.overall_score || 0,
    applied_date: new Date(application.created_at).toLocaleDateString("en-GB"),
    sub_status: application.sub_status || "Unopened",
    is_verified: application.assessment_submitted_at !== null,

    // Campos útiles adicionales
    is_fast_track: application.is_fast_track || false,
    interview_scheduled_at: application.interview_scheduled_at,
    interview_completed_at: application.interview_completed_at,
    hired_at: application.hired_at,

    // Guardamos todo por si se necesita en el drawer
    _raw_application: application,
  };
}

/**
 * Hook para mover una aplicación entre columnas (actualiza el status)
 */
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      newStatus,
    }: {
      applicationId: number;
      newStatus: string;
    }) => {
      const { data, error } = await supabase
        .from("job_applications")
        .update({ status: newStatus })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        console.error("Error updating application status:", error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidar la query para refrescar los datos
      queryClient.invalidateQueries({
        queryKey: ["playground", "applicants"],
      });
    },
  });
}

/**
 * Transforma las aplicaciones agrupadas por columna en una lista plana con status
 * Para la vista Grid
 */
export function transformTasksToList(tasks: Record<string, any[]>) {
  const allTasks: any[] = [];

  TASK_COLUMNS.forEach((column) => {
    tasks[column.id]?.forEach((task) => {
      allTasks.push({
        ...task,
        status: column.id,
        statusLabel: column.title,
        statusColor: column.badgeColor,
      });
    });
  });

  return allTasks;
}

/**
 * Obtiene información de una columna por su ID
 */
export function getColumnInfo(columnId: string) {
  return TASK_COLUMNS.find((col) => col.id === columnId);
}
