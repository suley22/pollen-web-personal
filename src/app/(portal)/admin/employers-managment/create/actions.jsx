"use server";
import { createClient } from "@/utils/supabase/server";

export async function createCompanyData(_, formData) {
  const supabase = await createClient();
  const formCompanyData = Object.fromEntries(formData.entries());
  const { data, error } = await supabase.from("employer_profile").insert({
    company_name: formCompanyData.company_name,
  });

  console.log("Created company data:", { data, error });
}
