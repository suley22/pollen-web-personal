"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserInfoModel } from "./userInfoSchema";
import { JobSeekerRoutes } from "@/job-seeker/router";

export async function updateUserInfo(_, formData) {
  const supabase = await createClient();

  const data = Object.fromEntries(formData.entries());
  let errors = UserInfoModel.safeParse(data);

  if (!errors.success) {
    return { message: errors.error.issues[0].message, success: false };
  }

  const formUserData = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    pronouns: formData.get("pronouns"),
  };

  // obtener sesión
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    throw new Error("No user authenticated");
  }

  const { errorProfileUpdate } = await supabase.from("profile").upsert(
    {
      id: user.id, // 👈 clave primaria o unique constraint
      first_name: formUserData.first_name,
      last_name: formUserData.last_name,
      pronouns: formUserData.pronouns,
    },
    { onConflict: "id" }, // 👈 le indicas con qué campo detectar duplicados
  );

  const { dataUpdateUser, errorUpdateUser } = await supabase.auth.updateUser({
    data: {
      register_profile_completed: true,
      first_name: formUserData.first_name,
      last_name: formUserData.last_name,
      pronouns: formUserData.pronouns,
    },
  });

  if (errorUpdateUser) {
    console.error("Error actualizando metadata:", errorUpdateUser.message);
    return { message: "Error actualizando perfil", success: false };
  } else {
    console.log("User actualizado:", dataUpdateUser);
  }

  if (errorProfileUpdate) {
    console.error("Error actualizando profile:", errorProfileUpdate.message);
    return { message: "Error actualizando profile", success: false };
  } else {
    redirect(JobSeekerRoutes.home);
  }
}
