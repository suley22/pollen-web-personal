"use server";
import { createEmployerAction } from "../actions";

export async function createCompanyData(_, formData) {
  return await createEmployerAction(formData);
}
