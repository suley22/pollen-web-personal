import { createClient } from "@/lib/utils/supabase/client";
import { EmployerProfileHelper } from "@/types/employers-types";
import type { EmployerApprovalStatus } from "@/types/employers-types";

const supabase = createClient();

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
