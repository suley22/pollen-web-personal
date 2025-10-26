import { createClient } from "@/lib/utils/supabase/client";
import { EmployerProfileHelper } from "@/types/employer-profile";

const supabase = createClient();

export type EmployerApprovalStatus = "approved" | "pending" | "rejected";

export const fetchEmployerById = async (id: string) => {
  const { data, error } = await supabase
    .from("employer_profile")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    profile_completeness:
      EmployerProfileHelper.calculateProfileCompleteness(data),
  };
};

export const updateEmployerStatus = async (
  id: string,
  status: EmployerApprovalStatus,
) => {
  const { data, error } = await supabase
    .from("employer_profile")
    .update({
      approval_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteEmployer = async (id: string) => {
  const { data, error } = await supabase
    .from("employer_profile")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
