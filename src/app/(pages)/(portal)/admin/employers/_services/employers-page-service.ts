import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export interface EmployerFilters {
  status?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface EmployerPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  from: number;
  to: number;
}

export const fetchEmployers = async (filters: EmployerFilters) => {
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Count query
  let countQuery = supabase
    .from("employer_profile")
    .select("*", { count: "exact", head: true })
    .filter("deleted_at", "is", null);

  if (filters.status && filters.status !== "all") {
    countQuery = countQuery.eq("approval_status", filters.status);
  }

  if (filters.searchTerm) {
    countQuery = countQuery.or(
      `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
    );
  }

  const { count, error: countError } = await countQuery;

  if (countError) {
    throw new Error(countError.message);
  }

  // Data query
  let query = supabase
    .from("employer_profile")
    .select("*")
    .order("created_at", { ascending: false })
    .filter("deleted_at", "is", null)
    .range(from, to);

  if (filters.status && filters.status !== "all") {
    query = query.eq("approval_status", filters.status);
  }

  if (filters.searchTerm) {
    query = query.or(
      `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const totalPages = Math.ceil((count || 0) / pageSize);

  return {
    employers: data || [],
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
};

export const fetchEmployerStatistics = async () => {
  const { data, error } = await supabase
    .from("employer_profile")
    .select("approval_status")
    .filter("deleted_at", "is", null);

  if (error) {
    throw new Error(error.message);
  }

  return {
    total: data?.length || 0,
    approved: data?.filter((e) => e.approval_status === "approved").length || 0,
    pending: data?.filter((e) => e.approval_status === "pending").length || 0,
    rejected: data?.filter((e) => e.approval_status === "rejected").length || 0,
  };
};
