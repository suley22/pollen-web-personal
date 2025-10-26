import { useQuery } from "@tanstack/react-query";
import { fetchEmployerById } from "../_services/employers-view-service";

export function useEmployerView(id: string) {
  const getEmployerProfileKey = ["employer", id];

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: getEmployerProfileKey,
    queryFn: () => fetchEmployerById(id),
    enabled: !!id,
  });

  return {
    profile,
    isLoading,
    error: error?.message || null,
  };
}
