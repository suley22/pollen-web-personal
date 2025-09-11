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

  const data = Object.fromEntries(formData.entries());
  let errors = UserInfoModel.safeParse(data);

  if (!errors.success) {
    return { error: "Invalid credentials" };
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
export async function signup(_,formData) {
  const supabase = await createClient();

  const data = Object.fromEntries(formData.entries());
  let errors = UserInfoModel.safeParse(data);

  if (!errors.success) {
    return { message: errors.error.issues[0].message, success: false };
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const formUserData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signUp(formUserData);

  if (error) {
    return { message: "Error al crear cuenta", description: "Revise sus credenciales e intentelo nuevamente", success: false };
  }

  return { message: "Cuenta creada con éxito", description: "Revise su correo electrónico para activar su cuenta", success: true };
}
