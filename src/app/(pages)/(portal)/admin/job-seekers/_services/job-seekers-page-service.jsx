"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function getJobSeeker(filters = {}) {
  try {
    console.log("Fetching job seekers with filters:", filters);

    const supabase = await createClient();

    const page = Number(filters.page) || 1;
    const pageSize = Number(filters.pageSize) || 10;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Build COUNT query
    let countQuery = supabase
      .from("profile")
      .select("*", { count: "exact", head: true });

    // Aplicar filtro por approval_status si existe (tu DB tiene approval_status, no status)
    if (filters.status && filters.status !== "all") {
      countQuery = countQuery.eq("status", filters.status);
    }

    // Aplicar filtro de búsqueda si existe (primer nombre, apellido o email)
    if (filters.searchTerm) {
      const t = String(filters.searchTerm).trim();
      countQuery = countQuery.or(
        `first_name.ilike.%${t}%,last_name.ilike.%${t}%,email.ilike.%${t}%`,
      );
    }

    if (filters.profile && filters.profile !== "all") {
      const v = String(filters.profile).toLowerCase();
      const boolVal = v === "true" ? true : v === "false" ? false : v;
      countQuery = countQuery.eq("profile_complete", boolVal);
    }

    // Aplicar filtro por rol si existe
    if (filters.role && filters.role !== "all") {
      // Igualdad exacta sobre la columna 'role'
      countQuery = countQuery.eq("role", filters.role);
    }
    const { count, error: countError } = await countQuery;
    if (countError) {
      console.error("Error counting job seekers:", countError);
      return { success: false, error: countError.message };
    }

    // Build DATA query with range
    let dataQuery = supabase
      .from("profile")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (filters.status && filters.status !== "all") {
      dataQuery = dataQuery.eq("status", filters.status);
    }
    if (filters.searchTerm) {
      const t = String(filters.searchTerm).trim();
      dataQuery = dataQuery.or(
        `first_name.ilike.%${t}%,last_name.ilike.%${t}%,email.ilike.%${t}%`,
      );
    }
    if (filters.profile && filters.profile !== "all") {
      const v = String(filters.profile).toLowerCase();
      const boolVal = v === "true" ? true : v === "false" ? false : v;
      dataQuery = dataQuery.eq("profile_complete", boolVal);
    }
    if (filters.role && filters.role !== "all") {
      dataQuery = dataQuery.eq("role", filters.role);
    }

    const { data, error } = await dataQuery;

    if (error) {
      console.error("Error fetching job seekers:", error);
      return { success: false, error: error.message };
    }

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const windowTo = Math.min(from + (data?.length || 0), totalItems);

    return {
      success: true,
      data: data,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        from: totalItems > 0 ? from + 1 : 0,
        to: windowTo,
      },
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Failed to fetch job seekers" };
  }
}

export async function getDistinctRoles() {
  try {
    const supabase = await createClient();

    // Obtener todos los roles distintos (globales), sin filtrar por búsqueda u otros filtros
    const { data, error } = await supabase
      .from("profile")
      .select("role")
      .not("role", "is", null);

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
