import { createClient } from "@/lib/utils/supabase/client";

const supabase = await createClient();

export async function getJobs(filters) {
  try {
    // Query base
    let query = supabase.from("job").select("*");

    // Aplicar filtros dinámicamente
    if (filters.jobType && filters.jobType !== "all") {
      // "pollen" -> pollen_approved = true
      // "external" -> pollen_approved = false
      if (filters.jobType === "pollen") {
        query = query.eq("pollen_approved", true);
      } else if (filters.jobType === "external") {
        query = query.eq("pollen_approved", false);
      }
    }

    //TODO: cómo aplicar el filtro a industries
    //if (filters.industry && filters.industry !== "all") {
    //  query = query.eq("industry", filters.industry);
    //}

    if (filters.location && filters.location !== "all") {
      query = query.eq("location", filters.location);
    }

    if (filters.contractType && filters.contractType !== "all") {
      query = query.eq("contract_type", filters.contractType);
    }

    if (filters.searchTerm) {
      // Búsqueda de texto en título, descripción, company
      query = query.or(
        `job_title.ilike.%${filters.searchTerm}%,` +
          `company_name.ilike.%${filters.searchTerm}%,` +
          `description.ilike.%${filters.searchTerm}%`,
      );
    }

    // Ordenar por fecha de creación
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("❌ JobService: Error fetching jobs:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("JobService: Unexpected error:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}
