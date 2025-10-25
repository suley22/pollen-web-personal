import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEmployers,
  fetchEmployerById,
  fetchEmployerStatistics,
  EmployerFilters,
  updateEmployer,
  createEmployer,
} from "@/employers/_services/employers-service";

// Query key factory
export const employersKeys = {
  all: ["employers"] as const,
  lists: () => [...employersKeys.all, "list"] as const,
  list: (filters: EmployerFilters) =>
    [...employersKeys.lists(), filters] as const,
  details: () => [...employersKeys.all, "detail"] as const,
  detail: (id: string) => [...employersKeys.details(), id] as const,
  statistics: () => [...employersKeys.all, "statistics"] as const,
};

// Hook para obtener lista de employers
export function useEmployers(filters: EmployerFilters) {
  return useQuery({
    queryKey: employersKeys.list(filters),
    queryFn: () => fetchEmployers(filters),
    select: (data) => ({
      employers: data.data || [],
      pagination: data.pagination || null,
    }),
  });
}

// Hook para obtener un employer por ID
export function useEmployer(id: string) {
  return useQuery({
    queryKey: employersKeys.detail(id),
    queryFn: () => fetchEmployerById(id),
    enabled: !!id,
    select: (data) => data.data,
  });
}

// Hook para obtener estadísticas
export function useEmployerStatistics() {
  return useQuery({
    queryKey: employersKeys.statistics(),
    queryFn: fetchEmployerStatistics,
    select: (data) =>
      data.data || {
        total: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
      },
  });
}

// Mutation para crear employer
export function useCreateEmployer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      formData,
      userId,
    }: {
      formData: FormData;
      userId: string;
    }) => createEmployer(formData, userId),
    onSuccess: () => {
      // Invalidar todas las listas y estadísticas
      queryClient.invalidateQueries({ queryKey: employersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: employersKeys.statistics() });
    },
  });
}

// Mutation para actualizar employer
export function useUpdateEmployer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      formData,
      userId,
    }: {
      id: string;
      formData: FormData;
      userId: string;
    }) => updateEmployer(id, formData, userId),
    onSuccess: (data, variables) => {
      // Invalidar la lista, estadísticas y el detalle específico
      queryClient.invalidateQueries({ queryKey: employersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: employersKeys.statistics() });
      queryClient.invalidateQueries({
        queryKey: employersKeys.detail(variables.id),
      });
    },
  });
}
