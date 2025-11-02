"use client";

import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// Columnas del Kanban
// TODO(playground): Exportar tipos/enum para ColumnId y centralizar estilos (colors/badges) en theme.
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

// Mock Data - Datos de ejemplo (deprecated - usar getJobApplicants)
// TODO(playground): Eliminar mocks o aislar en archivos .mock.ts y controlarlos vía feature flag.
const MOCK_JOB_SEEKERS = {
  new_applicants: [
    {
      id: "1",
      application_id: "app-1",
      name: "Sarah Johnson",
      avatar_url: null,
      match_score: 92,
      applied_date: "15/01/2025",
      sub_status: "Unopened",
    },
    {
      id: "2",
      application_id: "app-2",
      name: "Michael Chen",
      avatar_url: null,
      match_score: 88,
      applied_date: "16/01/2025",
      sub_status: "Unopened",
    },
    {
      id: "3",
      application_id: "app-3",
      name: "Emma Rodriguez",
      avatar_url: null,
      match_score: 85,
      applied_date: "17/01/2025",
      sub_status: "Unopened",
    },
  ],
  in_progress: [
    {
      id: "4",
      application_id: "app-4",
      name: "David Kim",
      avatar_url: null,
      match_score: 90,
      applied_date: "14/01/2025",
      sub_status: "Interview Scheduled",
    },
    {
      id: "5",
      application_id: "app-5",
      name: "Lisa Anderson",
      avatar_url: null,
      match_score: 87,
      applied_date: "13/01/2025",
      sub_status: "Under Review",
      is_verified: true,
      is_fast_track: false,
    },
  ],
  matched_to_employer: [
    {
      id: "6",
      application_id: "app-6",
      name: "James Wilson",
      avatar_url: null,
      match_score: 95,
      applied_date: "10/01/2025",
      sub_status: "Awaiting Response",
      is_verified: true,
      is_fast_track: true,
    },
  ],
  complete: [
    {
      id: "7",
      application_id: "app-7",
      name: "Sophia Martinez",
      avatar_url: null,
      match_score: 93,
      applied_date: "08/01/2025",
      sub_status: "Hired",
      is_verified: true,
      is_fast_track: false,
    },
  ],
};

/**
 * Función mockeada para obtener los aplicantes
 * Retorna datos estáticos para testing de UI
 * @deprecated Usar getJobApplicants en su lugar
 */
export function getMockApplicants() {
  return MOCK_JOB_SEEKERS;
}

/**
 * Obtiene los aplicantes reales desde la base de datos para un job específico
 * Agrupa los aplicantes por status (columnas del Kanban)
 */
export async function getJobApplicants(jobId: string) {
  try {
    // TODO(playground): Reemplazar console.log por logger centralizado (con niveles y toggles por entorno).
    console.log("🔍 getJobApplicants called with jobId:", jobId);

    // 1. Obtener las aplicaciones para este job
    const { data: applications, error: applicationsError } = await supabase
      .from("job_applications")
      .select(
        `
        id,
        created_at,
        status,
        sub_status,
        overall_score,
        is_fast_track,
        user_id
      `,
      )
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
    const groupedApplicants: Record<string, any[]> = {
      new_applicants: [],
      in_progress: [],
      matched_to_employer: [],
      complete: [],
    };

    // 5. Transformar y agrupar los datos
    applications.forEach((app) => {
      const jobSeeker = app.user_id ? jobSeekersMap.get(app.user_id) : null;

      const transformedApplicant = {
        id: jobSeeker?.id?.toString() || app.user_id?.toString() || "unknown",
        application_id: app.id.toString(),
        name: jobSeeker?.name || "Unknown",
        avatar_url: jobSeeker?.profile_picture || null,
        match_score: app.overall_score || jobSeeker?.overall_skills_score || 0,
        applied_date: new Date(app.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        sub_status: app.sub_status || "Unopened",
        is_fast_track: app.is_fast_track || false,
        // Campos adicionales por si se necesitan
        email: jobSeeker?.email || "",
        status: app.status,
      };

      // Agregar a la columna correspondiente
      if (groupedApplicants[app.status]) {
        groupedApplicants[app.status].push(transformedApplicant);
      }
    });

    console.log("📊 Grouped applicants:", groupedApplicants);
    return groupedApplicants;
  } catch (error) {
    console.error("Error in getJobApplicants:", error);
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
 */
export function transformJobSeekersToList(jobSeekers: Record<string, any[]>) {
  const allJobSeekers: any[] = [];

  JOB_SEEKER_COLUMNS.forEach((column) => {
    jobSeekers[column.id]?.forEach((jobSeeker) => {
      allJobSeekers.push({
        ...jobSeeker,
        status: column.id,
        statusLabel: column.title,
        statusColor: column.badgeColor,
      });
    });
  });

  return allJobSeekers;
}

/**
 * Obtiene información de una columna por su ID
 */
export function getColumnInfo(columnId: string) {
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
