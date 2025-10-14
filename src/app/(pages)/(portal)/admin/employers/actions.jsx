"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function getEmployerProfile(filters = {}) {
  try {
    console.log("Fetching employer profiles with filters:", filters);

    const supabase = await createClient();

    let query = supabase
      .from("employer_profile")
      .select("*")
      .order("created_at", { ascending: false });

    // Aplicar filtro por approval_status si existe (tu DB tiene approval_status, no status)
    if (filters.status && filters.status !== "all") {
      query = query.eq("approval_status", filters.status);
    }

    // Aplicar filtro de búsqueda si existe
    if (filters.searchTerm) {
      query = query.or(
        `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching applications:", error);
      return { success: false, error: error.message };
    }

    // Obtener contadores de trabajos para cada employer
    const employersWithJobCounts = await Promise.all(
      data.map(async (employer) => {
        // Contar trabajos live
        const { count: liveCount } = await supabase
          .from("job")
          .select("*", { count: "exact", head: true })
          .eq("company_id", employer.id)
          .eq("status", "live");

        // Contar trabajos draft
        const { count: draftCount } = await supabase
          .from("job")
          .select("*", { count: "exact", head: true })
          .eq("company_id", employer.id)
          .eq("status", "draft");

        return {
          ...employer,
          live_jobs_count: liveCount || 0,
          draft_jobs_count: draftCount || 0,
        };
      }),
    );

    return { success: true, data: employersWithJobCounts };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Failed to fetch applications" };
  }
}
