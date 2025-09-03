"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function updateUserAction(data) {
  const supabase = await createClient();

  // obtener sesión
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    throw new Error("No user authenticated");
  }

  const { error } = await supabase.from("profile").upsert(
    {
      id: user.id, // 👈 clave primaria o unique constraint
      first_name: data.nombre,
      last_name: data.apellido,
      pronouns: data.pronouns,
    },
    { onConflict: "id" }, // 👈 le indicas con qué campo detectar duplicados
  );

  if (error) {
    return { error: error.message, data: null };
  } else {
    redirect("/main/home");
    return { error: null, data };
  }
}
