"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserInfoModel } from "@/app/(pages)/(public)/login/_schema/registerSchema";
import { createClient } from "@/lib/utils/supabase/server";
import { AdminRoutes } from "@/app/(pages)/(portal)/admin/router";
import { JobSeekerRoutes } from "@/app/(pages)/(portal)/(job-seeker)/router";
import { LoginRoutes } from "@/public/router";

// TODO: Agregar validaciones de servidor.

export async function login(_, formData) {
  if (!formData) {
    return { error: "Form data is required" };
  }

  let email = formData.get("email");
  let password = formData.get("password");

  if (!email || !password || password.length < 8) {
    return { error: "Please check your credentials" };
  }

  const supabase = await createClient();

  const credentials = {
    email: email,
    password: password,
  };

  const { data, error: authError } =
    await supabase.auth.signInWithPassword(credentials);

  if (authError) {
    return { error: "Error signing in" };
  }

  // TODO: -> Mismo código en src/app/page.tsx

  const isAdmin = data.user.user_metadata.role === "admin";
  let redirectUrl = isAdmin ? AdminRoutes.home : JobSeekerRoutes.home;

  revalidatePath("/", "layout");
  redirect(redirectUrl);
}

// TOOD: Agregar validación sobre campos utilizando el schema de Zod
export async function signup(_, formData) {
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
    return {
      message: "Error creating account",
      description: "Please check your credentials and try again",
      success: false,
    };
  }

  return {
    message: "Account created successfully",
    description: "Please check your email to activate your account",
    success: true,
  };
}

export async function signInWithGoogle(origin) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/${LoginRoutes.authCodeCallback}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error.message);
    return { error: error.message };
  }

  redirect(data.url);

  return { data, error: null };
}

export async function resetPassword(_, formData) {
  const supabase = await createClient();

  const email = formData.get("email");

  if (!email) {
    return { error: "Email is required", success: false };
  }

  const resetPasswordPath = LoginRoutes.authResetPassword;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${resetPasswordPath}`,
  });

  if (error) {
    return {
      error: "Error sending reset email. Please check your email address.",
      success: false,
    };
  }

  return {
    message: "Password reset email sent. Please check your inbox.",
    success: true,
  };
}

export async function updatePassword(_, formData) {
  const supabase = await createClient();

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const code = formData.get("code");
  const tokenHash = formData.get("token_hash");
  const type = formData.get("type");

  if (!password || password.length < 8) {
    return {
      error: "Password must be at least 8 characters long",
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match", success: false };
  }

  // Determinar qué token usar
  const token = tokenHash || code;
  const tokenType = type || "recovery";

  if (!token) {
    return { error: "Invalid reset code", success: false };
  }

  console.log("Attempting to verify OTP with:", { token, tokenType });

  // Verificar el código de reset y actualizar la contraseña
  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: tokenType,
  });

  if (error) {
    console.error("Error verifying OTP:", error);

    // Manejo específico de diferentes tipos de error
    if (error.code === "otp_expired") {
      return {
        error: error.message,
        expired: true,
        success: false,
      };
    }

    if (error.code === "token_not_found" || error.code === "invalid_request") {
      return {
        error: "This password reset link is invalid. Please request a new one.",
        invalid: true,
        success: false,
      };
    }

    return {
      error: "Invalid or expired reset code. Please request a new reset link.",
      success: false,
    };
  }

  // Si la verificación es exitosa, actualizar la contraseña
  const { error: updateError } = await supabase.auth.updateUser({
    password: password,
  });

  if (updateError) {
    return {
      error: updateError.message,
      success: false,
    };
  }

  revalidatePath("/", "layout");
  redirect(LoginRoutes.login);
}
