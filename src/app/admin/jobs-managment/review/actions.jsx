"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchJobProfile(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job")
    .select("*")
    .eq("id", id)
    .single();
  const job = {
    ...data,
    who_would_love: data?.who_would_love || [],
  };

  if (error) {
    return { error: error.message, data: null };
  } else {
    return { error: null, job };
  }
}
