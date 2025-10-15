import { createClient } from "@/lib/utils/supabase/server";
import {
  EmployerProfile,
  EmployerProfileHelper,
} from "@/types/employer-profile";

export interface EmployerFilters {
  status?: string;
  searchTerm?: string;
}

export class EmployerService {
  private supabase: any;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  /**
   * Transforms raw employer data from database to EmployerProfile with default values
   */
  private transformEmployerDataWithDefaults(employer: any): EmployerProfile {
    return EmployerProfileHelper.fromDatabaseWithDefaults(employer);
  }

  /**
   * Transforms raw employer data preserving original values for editing
   */
  private transformEmployerDataRaw(employer: any): EmployerProfile {
    return EmployerProfileHelper.fromDatabaseRaw(employer);
  }

  /**
   * Fetches job counts for a specific employer
   */
  private async fetchJobCounts(employerId: string) {
    try {
      // Count live jobs
      const { count: liveCount } = await this.supabase
        .from("job")
        .select("*", { count: "exact", head: true })
        .eq("company_id", employerId)
        .eq("status", "live");

      // Count draft jobs
      const { count: draftCount } = await this.supabase
        .from("job")
        .select("*", { count: "exact", head: true })
        .eq("company_id", employerId)
        .eq("status", "draft");

      return {
        live_jobs_count: liveCount || 0,
        draft_jobs_count: draftCount || 0,
      };
    } catch (error) {
      console.error(
        `Error fetching job counts for employer ${employerId}:`,
        error,
      );
      return {
        live_jobs_count: 0,
        draft_jobs_count: 0,
      };
    }
  }

  /**
   * Builds the query with filters applied
   */
  private buildEmployerQuery(filters: EmployerFilters) {
    let query = this.supabase
      .from("employer_profile")
      .select("*")
      .order("created_at", { ascending: false });

    // Apply approval_status filter
    if (filters.status && filters.status !== "all") {
      query = query.eq("approval_status", filters.status);
    }

    // Apply search filter
    if (filters.searchTerm) {
      query = query.or(
        `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
      );
    }

    return query;
  }

  /**
   * Fetches employers list with default values and job counts
   */
  async fetchEmployers(
    filters: EmployerFilters = { status: "all", searchTerm: "" },
  ) {
    try {
      console.log("EmployerService: Fetching employers with filters:", filters);

      const query = this.buildEmployerQuery(filters);
      const { data, error } = await query;

      if (error) {
        console.error("EmployerService: Error fetching employers:", error);
        return { success: false, error: error.message };
      }

      // Transform data and fetch job counts
      const employersWithJobCounts = await Promise.all(
        data.map(async (employer) => {
          const transformedEmployer =
            this.transformEmployerDataWithDefaults(employer);
          const jobCounts = await this.fetchJobCounts(employer.id);

          return {
            ...transformedEmployer,
            ...jobCounts,
          };
        }),
      );

      console.log(
        `EmployerService: Successfully fetched ${employersWithJobCounts.length} employers`,
      );
      return { success: true, data: employersWithJobCounts };
    } catch (error) {
      console.error("EmployerService: Unexpected error:", error);
      return { success: false, error: "Failed to fetch employers" };
    }
  }

  /**
   * Fetches a single employer by ID with raw values (for editing)
   */
  async fetchEmployerById(id: string) {
    try {
      console.log("EmployerService: Fetching employer by ID (raw):", id);

      const { data, error } = await this.supabase
        .from("employer_profile")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("EmployerService: Error fetching employer by ID:", error);
        return { success: false, error: error.message };
      }

      const transformedEmployer = this.transformEmployerDataRaw(data);
      const jobCounts = await this.fetchJobCounts(id);

      return {
        success: true,
        data: {
          ...transformedEmployer,
          ...jobCounts,
        },
      };
    } catch (error) {
      console.error(
        "EmployerService: Unexpected error fetching employer:",
        error,
      );
      return { success: false, error: "Failed to fetch employer" };
    }
  }

  /**
   * Fetches a single employer by ID with default values (for display)
   */
  async fetchEmployerByIdWithDefaults(id: string) {
    try {
      console.log(
        "EmployerService: Fetching employer by ID (with defaults):",
        id,
      );

      const { data, error } = await this.supabase
        .from("employer_profile")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("EmployerService: Error fetching employer by ID:", error);
        return { success: false, error: error.message };
      }

      const transformedEmployer = this.transformEmployerDataWithDefaults(data);
      const jobCounts = await this.fetchJobCounts(id);

      return {
        success: true,
        data: {
          ...transformedEmployer,
          ...jobCounts,
        },
      };
    } catch (error) {
      console.error(
        "EmployerService: Unexpected error fetching employer:",
        error,
      );
      return { success: false, error: "Failed to fetch employer" };
    }
  }
}

/**
 * Factory function to create EmployerService instance
 */
export async function createEmployerService() {
  const supabase = await createClient();
  return new EmployerService(supabase);
}
