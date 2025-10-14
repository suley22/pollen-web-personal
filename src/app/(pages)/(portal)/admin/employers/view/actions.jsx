"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { da } from "zod/v4/locales";

export async function fetchEmployerProfile(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employer_profile")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { error: error.message, data: null };
  } else {
    return { error: null, data: data };
  }
}

export async function fetchJobsByEmployer(employerId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job")
    .select("*")
    .eq("company_id", employerId)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message, data: null };
  } else {
    return { error: null, data };
  }
}
