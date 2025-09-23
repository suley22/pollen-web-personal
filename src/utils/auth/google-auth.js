"use client";

import { createClient } from "@/utils/supabase/client";

export async function signInWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    }
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    return { error: error.message };
  }

  return { data, error: null };
}
