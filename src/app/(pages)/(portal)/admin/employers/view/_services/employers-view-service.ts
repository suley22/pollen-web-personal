import { createClient } from "@/lib/utils/supabase/client";
import { EmployerProfileHelper } from "@/types/employer-profile";

const supabase = createClient();

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
