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

  /**
   * Transforms form data to database format for employer creation/update
   */
  private transformFormDataToDatabase(formData: FormData, userId: string) {
    // Debug logging to check what we're receiving
    console.log("EmployerService: FormData type check:", {
      isFormData: formData instanceof FormData,
      hasEntries: typeof formData?.entries === 'function',
      formData: formData
    });

    // Ensure we have a proper FormData object
    if (!formData || typeof formData.entries !== 'function') {
      throw new Error(`Expected FormData object, but received: ${typeof formData}`);
    }

    const formCompanyData = Object.fromEntries(formData.entries());

    // Get all industries (includes both predefined and custom items from CheckboxGroup)
    // Remove duplicates using Set and filter empty strings
    const industriesArray = formData.getAll("industries") as string[];
    const uniqueIndustries = Array.from(
      new Set(industriesArray.map((i) => i.trim()).filter(Boolean)),
    );

    const accolades = formCompanyData.company_accolades as string;

    // Get previous hiring methods and remove duplicates
    const hiringMethodsArray = formData.getAll(
      "previous_hiring_methods",
    ) as string[];
    const uniqueHiringMethods = Array.from(
      new Set(hiringMethodsArray.map((m) => m.trim()).filter(Boolean)),
    );

    // Parse social_medias JSON
    const socialMedias = formCompanyData.social_medias
      ? JSON.parse(formCompanyData.social_medias as string)
      : [];

    return {
      // Company Information
      company_name: formCompanyData.company_name,
      company_size: formCompanyData.company_size,
      founded_year: formCompanyData.founded_year,
      company_location: formCompanyData.location,
      website_url: formCompanyData.website,
      logo_url: formCompanyData.logo_url,
      industries: uniqueIndustries,

      // About & Culture
      company_about: formCompanyData.company_about,
      work_environment: formCompanyData.work_environment,
      company_loves: formCompanyData.company_loves,
      company_entry_level: formCompanyData.entry_level_support,

      // Accolades
      company_accolades: accolades
        ? JSON.parse(accolades).map((item: any) => item.name || item)
        : [],

      // Contact Information
      contact_name: formCompanyData.contact_name,
      job_title: formCompanyData.job_title,
      contact_email: formCompanyData.contact_email,
      contact_phone: formCompanyData.contact_phone,

      // Social Media (JSONB)
      social_medias: socialMedias,

      // Internal Pollen Data
      how_did_you_hear_about_us: formCompanyData.how_did_you_hear_about_us,
      more_info: formCompanyData.more_info,
      hiring_frequency: formCompanyData.hiring_frequency,
      additional_notes: formCompanyData.additional_notes,
      previous_hiring_methods: uniqueHiringMethods,

      // System Fields
      user_id: userId,
    };
  }

  /**
   * Creates a new employer profile
   */
  async createEmployer(formData: FormData, userId: string) {
    try {

      const transformedData = this.transformFormDataToDatabase(
        formData,
        userId,
      );

      // Validate required fields
      if (
        !transformedData.company_name ||
        !transformedData.company_name.toString().trim()
      ) {
        return {
          success: false,
          error: "Company name is required",
        };
      }

      const { data, error } = await this.supabase
        .from("employer_profile")
        .insert({
          ...transformedData,
          // System Fields for creation
          approval_status: "pending",
          created_by: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) {
        console.error("EmployerService: Error creating employer:", error);
        return {
          success: false,
          error: error.message || "Failed to create company profile",
        };
      }

      console.log("EmployerService: Created employer data:", data);
      return {
        success: true,
        data: data[0],
        message: "Company profile created successfully",
      };
    } catch (error) {
      console.error(
        "EmployerService: Unexpected error creating employer:",
        error,
      );
      return {
        success: false,
        error: "Failed to create company profile",
      };
    }
  }

  /**
   * Updates an existing employer profile
   */
  async updateEmployer(id: string, formData: FormData, userId: string) {
    try {
      const transformedData = this.transformFormDataToDatabase(
        formData,
        userId,
      );

      console.log(
        "EmployerService: Update - Transformed data:",
        transformedData,
      );

      // Validate required fields
      if (
        !transformedData.company_name ||
        !transformedData.company_name.toString().trim()
      ) {
        return {
          success: false,
          error: "Company name is required",
        };
      }

      const { data, error } = await this.supabase
        .from("employer_profile")
        .update({
          ...transformedData,
          // System Fields for update
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

      if (error) {
        console.error("EmployerService: Error updating employer:", error);
        return {
          success: false,
          error: error.message || "Failed to update company profile",
        };
      }

      console.log("EmployerService: Updated employer data:", data);
      return {
        success: true,
        data: data[0],
        message: "Company profile updated successfully",
      };
    } catch (error) {
      console.error(
        "EmployerService: Unexpected error updating employer:",
        error,
      );
      return {
        success: false,
        error: "Failed to update company profile",
      };
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
