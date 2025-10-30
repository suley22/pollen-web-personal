"use client";

// Columnas del Kanban
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

// Mock Data - Datos de ejemplo
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
      is_verified: true,
      is_fast_track: false,
    },
    {
      id: "2",
      application_id: "app-2",
      name: "Michael Chen",
      avatar_url: null,
      match_score: 88,
      applied_date: "16/01/2025",
      sub_status: "Unopened",
      is_verified: true,
      is_fast_track: true,
    },
    {
      id: "3",
      application_id: "app-3",
      name: "Emma Rodriguez",
      avatar_url: null,
      match_score: 85,
      applied_date: "17/01/2025",
      sub_status: "Unopened",
      is_verified: false,
      is_fast_track: false,
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
      is_verified: true,
      is_fast_track: false,
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
 */
export function getMockApplicants() {
  return MOCK_JOB_SEEKERS;
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
