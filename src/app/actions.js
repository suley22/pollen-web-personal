"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * Verifica si el usuario tiene una sesión activa
 * @returns {Promise<{user: Object|null, error: Error|null}>}
 */
export async function checkSession() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return { user: null, error };
    }

    return {
      user: data?.session?.user || null,
      error: null,
    };
  } catch (error) {
    console.error("Error al verificar la sesión:", error);
    return { user: null, error };
  }
}

/**
 * Redirige al usuario al dashboard si tiene una sesión activa
 * o a login si no la tiene
 */
export async function redirectBasedOnSession() {
  try {
    const { user, error } = await checkSession();

    if (error || !user) {
      redirect("/login");
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("Error al redireccionar:", error);
    redirect("/login");
  }
}
