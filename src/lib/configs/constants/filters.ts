import type { FilterOption } from "@/types/filters";

/**
 * Employer status values
 */
export const EMPLOYER_STATUS = {
  DRAFT: "draft",
  LIVE: "live",
  HIDDEN: "hidden",
} as const;

/**
 * Type for employer status values
 */
export type EmployerStatus =
  (typeof EMPLOYER_STATUS)[keyof typeof EMPLOYER_STATUS];

/**
 * Status filter options for employers (admin view)
 */
export const EMPLOYER_STATUS_OPTIONS: FilterOption[] = [
  { label: "All Statuses", value: "all" },
  { label: "Draft", value: EMPLOYER_STATUS.DRAFT },
  { label: "Live", value: EMPLOYER_STATUS.LIVE },
  { label: "Hidden", value: EMPLOYER_STATUS.HIDDEN },
];

/**
 * Status labels for display
 */
export const EMPLOYER_STATUS_LABELS: Record<EmployerStatus, string> = {
  [EMPLOYER_STATUS.DRAFT]: "Draft",
  [EMPLOYER_STATUS.LIVE]: "Live",
  [EMPLOYER_STATUS.HIDDEN]: "Hidden",
};

/**
 * Job status values
 */
export const JOB_STATUS = {
  DRAFT: "draft",
  LIVE: "live",
  PAUSED: "paused",
  COMPLETE: "complete",
  CANCELLED: "cancelled",
} as const;

/**
 * Type for job status values
 */
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];

/**
 * Status filter options for jobs (admin view)
 */
export const JOB_STATUS_OPTIONS: FilterOption[] = [
  { label: "All Statuses", value: "all" },
  { label: "Draft", value: JOB_STATUS.DRAFT },
  { label: "Live", value: JOB_STATUS.LIVE },
  { label: "Paused", value: JOB_STATUS.PAUSED },
  { label: "Complete", value: JOB_STATUS.COMPLETE },
  { label: "Cancelled", value: JOB_STATUS.CANCELLED },
];

/**
 * Status labels for display
 */
export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  [JOB_STATUS.DRAFT]: "Draft",
  [JOB_STATUS.LIVE]: "Live",
  [JOB_STATUS.PAUSED]: "Paused",
  [JOB_STATUS.COMPLETE]: "Complete",
  [JOB_STATUS.CANCELLED]: "Cancelled",
};

/**
 * Job assignment filter options
 */
export const JOB_ASSIGNMENT_OPTIONS: FilterOption[] = [
  { label: "All Jobs", value: "all" },
  { label: "My Assigned Jobs", value: "mine" },
  { label: "Karen's Jobs", value: "karen" },
  { label: "Sophie's Jobs", value: "sophie" },
];
