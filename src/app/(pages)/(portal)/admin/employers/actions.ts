"use server";

import { createClient } from "@/lib/utils/supabase/server";
import {
  createEmployerService,
  EmployerFilters,
} from "@/services/employerService";

export async function fetchEmployersAction(
  filters: EmployerFilters = { status: "all", searchTerm: "" },
) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployers(filters);
}

export async function fetchEmployerByIdAction(id: string) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployerById(id);
}

export async function fetchEmployerByIdWithDefaultsAction(id: string) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployerByIdWithDefaults(id);
}

export async function fetchEmployerProfileAction(id: string) {
  try {
    const employerService = await createEmployerService();
    const result = await employerService.fetchEmployerById(id);

    if (result.success) {
      return { error: null, data: result.data };
    } else {
      return { error: result.error, data: null };
    }
  } catch (error) {
    console.error("Action: Error fetching employer profile:", error);
    return { error: "Failed to fetch employer profile", data: null };
  }
}

export async function updateEmployerAction(id: string, formData: FormData) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    // Use EmployerService to update the employer
    const employerService = await createEmployerService();
    const result = await employerService.updateEmployer(id, formData, user.id);

    return result;
  } catch (error) {
    console.error("Action: Unexpected error updating company:", error);
    return {
      success: false,
      error: "Failed to update company profile",
    };
  }
}

export async function createEmployerAction(formData: FormData) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    // Use EmployerService to create the employer
    const employerService = await createEmployerService();
    const result = await employerService.createEmployer(formData, user.id);

    return result;
  } catch (error) {
    console.error("Action: Unexpected error creating company:", error);
    return {
      success: false,
      error: "Failed to create company profile",
    };
  }
}
