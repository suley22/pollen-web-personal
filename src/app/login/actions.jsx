"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  let redirectUrl = "/main/home";
  const supabase = await createClient();

  const formUserData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signInWithPassword(formUserData);

  if(!data.user.user_metadata.register_profile_completed){
    redirectUrl = "/main/user-info";
  }

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(redirectUrl);
}

export async function signup(formData) {
  const supabase = await createClient();

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
