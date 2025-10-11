"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUsers(filters = {}) {
  try {
    console.log("Fetching employer profiles with filters:", filters);

    const supabase = await createClient();

    // Obtener el usuario logueado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error getting current user:", userError);
      return { success: false, error: "User not authenticated" };
    }

    let query = supabase
      .from("profile")
      .select("*")
      .neq("id", user.id) // Excluir al usuario logueado
      .order("created_at", { ascending: false });

    // Aplicar filtro de búsqueda si existe
    if (filters.searchTerm) {
      query = query.or(
        `first_name.ilike.%${filters.searchTerm}%,last_name.ilike.%${filters.searchTerm}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching applications:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Failed to fetch applications" };
  }
}

export async function updateUserRole(userId, role) {
  try {
    const supabase = await createClient();

    // actualizar role en la tabla profile
    const { data, error: errorProfileUpdate } = await supabase
      .from("profile")
      .update({ role: role })
      .eq("id", userId)
      .select();

    if (errorProfileUpdate) {
      console.error("Error actualizando profile:", errorProfileUpdate.message);
      return { message: "Error actualizando profile", success: false };
    }

    const { data: dataUpdateUser, error: errorUpdateUser } =
      await supabase.auth.updateUser({
        data: {
          role: role,
        },
      });

    if (errorUpdateUser) {
      console.error("Error actualizando metadata:", errorUpdateUser.message);
      return { message: "Error actualizando perfil", success: false };
    } else {
      console.log("User actualizado:", dataUpdateUser.user.user_metadata.role);
      return { message: "Role actualizado correctamente", success: true };
    }
  } catch (error) {
    console.error("Error inesperado:", error);
    return { message: "Error inesperado al actualizar role", success: false };
  }
}
