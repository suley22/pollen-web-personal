import { createClient } from "@/lib/utils/supabase/client";
import {
  EmployerProfileHelper,
  EmployerProfile,
} from "@/types/employer-profile";

const supabase = await createClient();

export async function getRecommendedCompanies() {
  try {
    const companiesQuery = await supabase
      .from("employer_profile")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2);

    const { data, error } = await companiesQuery;

    if (error) {
      console.error("❌ CompanyService: Error fetching companies:", error);
      return { success: false, error: error.message };
    }

    const list = data.map((company) => mapAdminCompanyToCardCompany(company));

    return { success: true, data: list };
  } catch (error) {
    console.error("CompanyService: Unexpected error:", error);
    return { success: false, error: "Failed to fetch companies" };
  }
}

export async function getAllCompanies() {
  try {
    const companiesQuery = await supabase
      .from("employer_profile")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    const { data, error } = await companiesQuery;

    if (error) {
      console.error("❌ CompanyService: Error fetching companies:", error);
      return { success: false, error: error.message };
    }

    const list = data.map((company) => mapAdminCompanyToCardCompany(company));

    return { success: true, data: list };
  } catch (error) {
    console.error("CompanyService: Unexpected error:", error);
    return { success: false, error: "Failed to fetch companies" };
  }
}

const transformEmployerDataRaw = (employer: any): EmployerProfile => {
  return {
    ...employer,
    // Keep original values as-is for editing
    live_jobs_count: employer.live_jobs_count || 0,
    draft_jobs_count: employer.draft_jobs_count || 0,
    profile_completeness:
      EmployerProfileHelper.calculateProfileCompleteness(employer),
  };
};

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

    return {
      success: true,
      data: transformedEmployer,
    };
  } catch (error) {
    console.error(
      "EmployerService: Unexpected error fetching employer:",
      error,
    );
    return { success: false, error: "Failed to fetch employer" };
  }
};

// Map admin job shape -> JobCard shape
const mapAdminCompanyToCardCompany = (company) => ({
  id: String(company.id),
  name: company.company_name,
  industry:
    company.industries.length > 0 ? company.industries[0] : "Not specified",
  rating: company.rating || 0,
  description: company.company_about || "No description available.",
  //TODO: Replace open_roles_count with actual count from jobs table
  //TODO: Replace logo with actual logo component
  logo: company.logo_url || "🏢",
  openRoles: company.open_roles_count || 0,
  size: company.company_size || "Not specified",
  location: company.company_location || "Remote",
});
