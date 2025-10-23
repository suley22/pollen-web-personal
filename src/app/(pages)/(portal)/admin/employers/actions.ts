"use server";

import { createClient } from "@/lib/utils/supabase/server";
import {
  createEmployerService,
  EmployerFilters,
} from "@/services/employerService";
import { createStorageService } from "@/services/storageService";
import { createUserService } from "@/services/userService";

export async function fetchEmployersAction(
  filters: EmployerFilters = { status: "all", searchTerm: "" },
) {
  const employerService = await createEmployerService();
  return await employerService.fetchEmployers(filters);
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








