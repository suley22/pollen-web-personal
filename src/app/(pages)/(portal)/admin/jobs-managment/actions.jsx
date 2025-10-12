"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function getJobList(filters = {}) {
  try {
    console.log("Fetching jobs with filters:", filters);

    const supabase = await createClient();

    let query = supabase
      .from("job")
      .select("*")
      .order("created_at", { ascending: false });

    // Aplicar filtro por status si existe
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    // Aplicar filtro de búsqueda si existe
    if (filters.searchTerm) {
      query = query.or(
        `company_name.ilike.%${filters.searchTerm}%,job_title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching jobs:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}
