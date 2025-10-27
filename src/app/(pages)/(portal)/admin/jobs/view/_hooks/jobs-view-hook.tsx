import { useJobById } from "@/jobs/_services/jobs-page-service";

export function useEmployerView(id) {
  const { data: job, isLoading, error } = useJobById(id);

  return {
    job,
    isLoading,
    error: error?.message || null,
  };
}
