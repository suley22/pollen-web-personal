"use server";

import { supabaseAdmin } from "@/lib/utils/supabase/supabase-admin";

export async function updateUserRoleAction(userId: string, newRole: string) {
  try {
    // Update user metadata using admin client
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        user_metadata: {
          role: newRole,
        },
      });

    if (userError) {
      throw new Error(`Error updating user metadata: ${userError.message}`);
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("Error in updateUserRoleAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
