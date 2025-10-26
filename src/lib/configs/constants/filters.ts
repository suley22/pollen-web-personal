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
