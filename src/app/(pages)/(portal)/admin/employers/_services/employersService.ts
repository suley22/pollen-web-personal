import { createClient } from "@/lib/utils/supabase/client";
import {
  EmployerProfile,
  EmployerProfileHelper,
} from "@/types/employer-profile";

const supabase = createClient();

export const fetchEmployers = async (
    filters = { status: "all", searchTerm: "" },
  ) => {
    try {
      console.log("EmployerService: Fetching employers with filters:", filters);

      let query = supabase
      .from("employer_profile")
      .select("*")
      .order("created_at", { ascending: false })
      .filter("deleted_at", "is", null);

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

      const { data, error } = await query;

      if (error) {
        console.error("EmployerService: Error fetching employers:", error);
        return { success: false, error: error.message };
      }

      // Transform data and fetch job counts
      const employersWithJobCounts = await Promise.all(
        data.map(async (employer) => {
          const transformedEmployer =
            transformEmployerDataWithDefaults(employer);
          const jobCounts = await fetchJobCounts(employer.id);

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

  const transformEmployerDataWithDefaults = (employer) => {
    return {
      ...employer,
      company_name: employer.company_name || "Unknown Company",
      approval_status: employer.approval_status || "draft",
      logo_url: employer.logo_url,
      industries: employer.industries?.length ? employer.industries : [],
      contact_email: employer.contact_email || "No email provided",
      contact_phone: employer.contact_phone || "No phone provided",
      live_jobs_count: employer.live_jobs_count || 0,
      draft_jobs_count: employer.draft_jobs_count || 0,
      profile_completeness:
        EmployerProfileHelper.calculateProfileCompleteness(employer),
      updated_at: employer.updated_at || "N/A",
      company_location: employer.company_location || "Location not specified",
      company_size: employer.company_size || "Size not specified",
      contact_name: employer.contact_name || "No contact name provided",
      founded_year: employer.founded_year || "N/A",
    };
  }

  const fetchJobCounts = async (employerId) => {
    try {
      // Count live jobs
      const { count: liveCount } = await supabase
        .from("job")
        .select("*", { count: "exact", head: true })
        .eq("company_id", employerId)
        .eq("status", "live");

      // Count draft jobs
      const { count: draftCount } = await supabase
        .from("job")
        .select("*", { count: "exact", head: true })
        .eq("company_id", employerId)
        .eq("status", "pending");

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
   * Fetches a single employer by ID with raw values (for editing)
   */
  export const fetchEmployerById = async (id) => {
    try {
      console.log("EmployerService: Fetching employer by ID (raw):", id);

      const { data, error } = await supabase
        .from("employer_profile")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("EmployerService: Error fetching employer by ID:", error);
        return { success: false, error: error.message };
      }

      const transformedEmployer = transformEmployerDataRaw(data);
      const jobCounts = await fetchJobCounts(id);

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
   * Creates an EmployerProfile preserving raw values from database
   * Used for editing where we need the original values (nulls, empty strings, etc.)
   */
  const transformEmployerDataRaw = (employer: any): EmployerProfile => {
    return {
      ...employer,
      // Keep original values as-is for editing
      live_jobs_count: employer.live_jobs_count || 0,
      draft_jobs_count: employer.draft_jobs_count || 0,
      profile_completeness:
        EmployerProfileHelper.calculateProfileCompleteness(employer),
    };
  }
  