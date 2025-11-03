"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function getJobSeeker(filters = {}) {
  try {
    console.log("Fetching job seekers with filters:", filters);

    const supabase = await createClient();

    let query = supabase
      .from("profile")
      .select("*")
      .order("created_at", { ascending: false });

    // Aplicar filtro por approval_status si existe (tu DB tiene approval_status, no status)
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    // Aplicar filtro de búsqueda si existe
    if (filters.searchTerm) {
      query = query.or(
        `name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%`,
      );
    }

    if (filters.profile && filters.profile !== "all") {
      query = query.eq("profile_complete", filters.profile);
    }

    // Aplicar filtro por rol si existe
    if (filters.role && filters.role !== "all") {
      // Igualdad exacta sobre la columna 'role'
      query = query.eq("role", filters.role);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching job seekers:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Failed to fetch job seekers" };
  }
}

export async function getDistinctRoles(filters = {}) {
  try {
    const supabase = await createClient();

    let query = supabase.from("profile").select("role").not("role", "is", null);

    // Filtro de búsqueda opcional (coherente con la UI), pero NO filtramos por role/status/profile
    if (filters.searchTerm) {
      query = query.or(
        `name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%`,
      );
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching distinct roles:", error);
      return { success: false, error: error.message };
    }

    const roles = Array.from(
      new Set(
        (data || [])
          .map((r) => (r.role ? String(r.role).trim() : ""))
          .filter((v) => !!v),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return { success: true, data: roles };
  } catch (error) {
    console.error("Unexpected error (roles):", error);
    return { success: false, error: "Failed to fetch roles" };
  }
}
