"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function createAppSettingAction(input: {
  key: string;
  value: string;
  description?: string;
  is_sensitive?: boolean;
  updated_by: string;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("app_setting")
      .insert({
        key: input.key,
        value: input.value,
        description: input.description || null,
        is_sensitive: input.is_sensitive || false,
        updated_by: input.updated_by,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating app setting: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in createAppSettingAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateAppSettingAction(input: {
  id: string;
  key?: string;
  value?: string;
  description?: string;
  is_sensitive?: boolean;
  updated_by: string;
}) {
  try {
    const supabase = await createClient();

    const updateData: any = {
      updated_by: input.updated_by,
      updated_at: new Date().toISOString(),
    };

    if (input.key !== undefined) updateData.key = input.key;
    if (input.value !== undefined) updateData.value = input.value;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.is_sensitive !== undefined) updateData.is_sensitive = input.is_sensitive;

    const { data, error } = await supabase
      .from("app_setting")
      .update(updateData)
      .eq("id", input.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating app setting: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in updateAppSettingAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteAppSettingAction(id: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("app_setting")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting app setting:", error);
      return { success: false, error: error.message };
    }

    console.log("App setting deleted successfully");
    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
