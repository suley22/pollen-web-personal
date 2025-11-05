/**
 * Estados principales de las aplicaciones de job seekers
 */
export enum ApplicationStatus {
  NEW_APPLICANTS = "new_applicants",
  IN_PROGRESS = "in_progress",
  MATCHED_TO_EMPLOYER = "matched_to_employer",
  COMPLETE = "complete",
}

/**
 * Todos los sub-estados unificados de las aplicaciones
 * IMPORTANTE: Estos valores deben coincidir exactamente con el constraint de la BD
 */
export enum ApplicationSubStatus {
  // Sub-estados para new_applicants
  REVIEW_NOT_STARTED = "Review Not Started",
  UNDER_REVIEW = "Under Review",
  // Sub-estados para in_progress
  INVITED_TO_POLLEN_INTERVIEW = "Invited to Pollen Interview",
  POLLEN_INTERVIEW_COMPLETE = "Pollen Interview Complete",
  // Sub-estados para matched_to_employer
  INTERVIEW_REQUESTED = "Interview Requested",
  INTERVIEW_BOOKED = "Interview Booked",
  INTERVIEW_COMPLETE = "Interview Complete",
  AWAITING_EMPLOYER = "Awaiting Employer",
  OFFER_ISSUED = "Offer Issued",
  // Sub-estados para complete
  NOT_PROGRESSING = "Not Progressing",
  HIRED = "Hired",
}

/**
 * Mapeo de estados a sus posibles sub-estados
 */
export const STATUS_SUB_STATUS_MAP: Record<
  ApplicationStatus,
  readonly ApplicationSubStatus[]
> = {
  [ApplicationStatus.NEW_APPLICANTS]: [
    ApplicationSubStatus.REVIEW_NOT_STARTED,
    ApplicationSubStatus.UNDER_REVIEW,
  ],
  [ApplicationStatus.IN_PROGRESS]: [
    ApplicationSubStatus.INVITED_TO_POLLEN_INTERVIEW,
    ApplicationSubStatus.POLLEN_INTERVIEW_COMPLETE,
  ],
  [ApplicationStatus.MATCHED_TO_EMPLOYER]: [
    ApplicationSubStatus.INTERVIEW_REQUESTED,
    ApplicationSubStatus.INTERVIEW_BOOKED,
    ApplicationSubStatus.INTERVIEW_COMPLETE,
    ApplicationSubStatus.AWAITING_EMPLOYER,
    ApplicationSubStatus.OFFER_ISSUED,
  ],
  [ApplicationStatus.COMPLETE]: [
    ApplicationSubStatus.NOT_PROGRESSING,
    ApplicationSubStatus.HIRED,
  ],
} as const;

/**
 * Colores asociados a cada estado principal
 */
export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.NEW_APPLICANTS]: "bg-blue-500",
  [ApplicationStatus.IN_PROGRESS]: "bg-yellow-500",
  [ApplicationStatus.MATCHED_TO_EMPLOYER]: "bg-purple-500",
  [ApplicationStatus.COMPLETE]: "bg-gray-500",
};

/**
 * Etiquetas legibles para cada estado principal
 */
export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.NEW_APPLICANTS]: "New Applicant",
  [ApplicationStatus.IN_PROGRESS]: "In Progress",
  [ApplicationStatus.MATCHED_TO_EMPLOYER]: "Matched to Employer",
  [ApplicationStatus.COMPLETE]: "Complete",
};

/**
 * Helper para validar si un sub-estado es válido para un estado dado
 */
export function isValidSubStatus(
  status: ApplicationStatus,
  subStatus: string,
): boolean {
  return (
    STATUS_SUB_STATUS_MAP[status]?.includes(
      subStatus as ApplicationSubStatus,
    ) ?? false
  );
}

/**
 * Helper para obtener el siguiente estado posible
 */
export function getNextStatuses(
  currentStatus: ApplicationStatus,
): ApplicationStatus[] {
  switch (currentStatus) {
    case ApplicationStatus.NEW_APPLICANTS:
      return [ApplicationStatus.IN_PROGRESS, ApplicationStatus.COMPLETE];
    case ApplicationStatus.IN_PROGRESS:
      return [
        ApplicationStatus.MATCHED_TO_EMPLOYER,
        ApplicationStatus.COMPLETE,
      ];
    case ApplicationStatus.MATCHED_TO_EMPLOYER:
      return [ApplicationStatus.COMPLETE];
    case ApplicationStatus.COMPLETE:
      return [];
    default:
      return [];
  }
}
