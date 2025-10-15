"use server";

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
