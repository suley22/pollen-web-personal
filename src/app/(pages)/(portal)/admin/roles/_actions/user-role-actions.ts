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

export async function deleteUserAction(userId: string) {
  try {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  
  if (error) {
    console.error('Error al eliminar usuario:', error);
    return { success: false, error: error.message };
  }
  
    console.log('Usuario eliminado exitosamente:', data);
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
}
