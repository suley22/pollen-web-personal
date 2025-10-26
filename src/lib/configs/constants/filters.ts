import type { FilterOption } from "@/types/filters";

/**
 * Status filter options for employers
 */
export const EMPLOYER_STATUS_OPTIONS: FilterOption[] = [
  { label: "All Statuses", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];
