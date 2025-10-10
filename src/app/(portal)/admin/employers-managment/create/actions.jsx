"use server";
import { createClient } from "@/utils/supabase/server";

export async function createCompanyData(_, formData) {
  const supabase = await createClient();
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
  const { data, error } = await supabase.from("employer_profile").insert({
    company_name: formCompanyData.company_name,
    company_about: formCompanyData.company_about,
    company_size: formCompanyData.company_size,
    website_url: formCompanyData.website_url,
    linkedin_url: formCompanyData.linkedin_url,
    company_location: formCompanyData.company_location,
    company_accolades: accolades
      ? accolades.split(",").map((a) => a.trim())
      : [],
    glassdoor_url: formCompanyData.glassdoor_url,
    cover_image_url: formCompanyData.cover_image_url,
    logo_url: formCompanyData.logo_url,
    work_environment: formCompanyData.work_environment,
    contact_email: formCompanyData.contact_email,
    contact_phone: formCompanyData.contact_phone,
    founded_year: formCompanyData.founded_year,
    approval_status: "pending",
    created_by: "1e4c06ce-3181-4368-bbee-bc38b079919b",
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    user_id: "1e4c06ce-3181-4368-bbee-bc38b079919b",
    industries:
      formCompanyData.industries === "other"
        ? formCompanyData.other_industry
        : formCompanyData.industries,
    company_loves: formCompanyData.company_loves,
    company_entry_level: formCompanyData.company_entry_level,
    contact_name: formCompanyData.contact_name,
    job_title: formCompanyData.job_title,
    twitter_url: formCompanyData.twitter_url,
    more_info: formCompanyData.more_info,
    how_did_you_hear_about_us: formCompanyData.how_did_you_hear_about_us,
    hiring_frequency: formCompanyData.hiring_frequency,
    additional_notes: formCompanyData.additional_notes,
  });

  console.log("Created company data:", { data, error });
}
