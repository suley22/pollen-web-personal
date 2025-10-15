"use server";
import { createClient } from "@/lib/utils/supabase/server";

export async function createCompanyData(_, formData) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No authenticated user found");
    return { error: "User not authenticated" };
  }

  const formCompanyData = Object.fromEntries(formData.entries());
  const standardIndustries = formData.getAll("industries");
  const customIndustries = formCompanyData.custom_industries
    ? formCompanyData.custom_industries
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];
  const allIndustries = [...standardIndustries, ...customIndustries];
  const accolades = formCompanyData.company_accolades; // será un string separado por comas

  // Parse social_medias JSON
  const socialMedias = formCompanyData.social_medias
    ? JSON.parse(formCompanyData.social_medias)
    : [];

  // Validate required fields
  if (!formCompanyData.company_name || !formCompanyData.company_name.trim()) {
    return {
      success: false,
      error: "Company name is required",
    };
  }

  const { data, error } = await supabase
    .from("employer_profile")
    .insert({
      // Company Information
      company_name: formCompanyData.company_name,
      company_size: formCompanyData.company_size,
      founded_year: formCompanyData.founded_year,
      company_location: formCompanyData.location,
      website_url: formCompanyData.website,
      logo_url: formCompanyData.logo_url,
      industries: allIndustries,

      // About & Culture
      company_about: formCompanyData.company_about,
      work_environment: formCompanyData.work_environment,
      company_loves: formCompanyData.company_loves,
      company_entry_level: formCompanyData.company_entry_level,

      // Accolades
      company_accolades: accolades
        ? accolades.split(",").map((a) => a.trim())
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

      // System Fields
      approval_status: "pending",
      created_by: user.id,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error("Error creating company:", error);
    return {
      success: false,
      error: error.message || "Failed to create company profile",
    };
  }

  console.log("Created company data:", data);
  return {
    success: true,
    data: data[0],
    message: "Company profile created successfully",
  };
}
