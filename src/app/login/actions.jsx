"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserInfoModel } from "./registerSchema";

import { createClient } from "@/utils/supabase/server";

// TODO: Agregar validaciones de servidor.

export async function login(_, formData) {
  if (!formData) {
    return { error: "Form data is required" };
  }

  let redirectUrl = "/main/home";
  const supabase = await createClient();

  const formUserData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error: loginError } =
    await supabase.auth.signInWithPassword(formUserData);

  if (loginError) {
    return { error: "Error al iniciar sesión" };
  }

  revalidatePath("/", "layout");
  redirect(redirectUrl);
}

// TOOD: Agregar validación sobre campos utilizando el schema de Zod
export async function signup(formData) {
  const supabase = await createClient();

  let errors = UserInfoModel.safeParse(formData);

  if (!errors.success) {
    return { email: errors.error.issues[0].message };
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
