import { createClient } from "@/lib/utils/supabase/client";
import { EmployerProfileHelper } from "@/types/employers-types";

const supabase = createClient();

export const fetchEmployerById = async (id: string) => {
  const { data, error } = await supabase
    .from("employer_profile")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    profile_completeness:
      EmployerProfileHelper.calculateProfileCompleteness(data),
  };
};

export const createEmployer = async (formData: FormData, userId: string) => {
  const transformedData = transformFormDataToDatabase(formData, userId);

  if (!transformedData.company_name?.toString().trim()) {
    throw new Error("Company name is required");
  }

  const { data, error } = await supabase
    .from("employer_profile")
    .insert({
      ...transformedData,
      approval_status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Failed to create company profile");
  }

  return data;
};

export const updateEmployer = async (
  id: string,
  formData: FormData,
  userId: string,
) => {
  const transformedData = transformFormDataToDatabase(formData, userId);

  if (!transformedData.company_name?.toString().trim()) {
    throw new Error("Company name is required");
  }

  const { data, error } = await supabase
    .from("employer_profile")
    .update({
      ...transformedData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Failed to update company profile");
  }

  return data;
};

const transformFormDataToDatabase = (formData: FormData, userId: string) => {
  if (!formData || typeof formData.entries !== "function") {
    throw new Error(
      `Expected FormData object, but received: ${typeof formData}`,
    );
  }

  const formCompanyData = Object.fromEntries(formData.entries());

  // Get all industries and remove duplicates
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
};
