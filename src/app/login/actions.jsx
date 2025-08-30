"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();



  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/main/home");
}

export async function signup(formData) {
  const supabase = await createClient();

  // Convert FormData to object to avoid Next.js 15 server component issues
  const formDataObj = Object.fromEntries(formData.entries());

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formDataObj.email,
    password: formDataObj.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
