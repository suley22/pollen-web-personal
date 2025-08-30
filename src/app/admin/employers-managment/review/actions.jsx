"use server";

import { createClient } from "@/utils/supabase/server";

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
