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

  export const fetchJobsByEmployer = async (employerId) => {

  const { data, error } = await supabase
    .from("job")
    .select("*")
    .eq("company_id", employerId)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    return { error: error.message, data: null };
  } else {
    // Ensure data is an array and normalize salary_range for each job
    const normalizedJobs = Array.isArray(data)
      ? data.map((job) => ({
          ...job,
          salary_range: job.salary_range || [],
        }))
      : [];
    return { error: null, data: normalizedJobs };
  }
}

/**
   * Updates an existing employer profile
   */
  export const updateEmployer = async (id: string, formData: FormData, userId: string) => {
    try {
      const transformedData = transformFormDataToDatabase(
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

      const { data, error } = await supabase
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

  /**
   * Creates a new employer profile
   */
  export const createEmployer = async (formData: FormData, userId: string) => {
    try {
      const transformedData = transformFormDataToDatabase(
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

      const { data, error } = await supabase
        .from("employer_profile")
        .insert({
          ...transformedData,
          // System Fields for creation
          approval_status: "pending",
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

  /**
   * Transforms form data to database format for employer creation/update
   */
  const transformFormDataToDatabase = (formData: FormData, userId: string) => {
    // Debug logging to check what we're receiving
    console.log("EmployerService: FormData type check:", {
      isFormData: formData instanceof FormData,
      hasEntries: typeof formData?.entries === "function",
      formData: formData,
    });

    // Ensure we have a proper FormData object
    if (!formData || typeof formData.entries !== "function") {
      throw new Error(
        `Expected FormData object, but received: ${typeof formData}`,
      );
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
  