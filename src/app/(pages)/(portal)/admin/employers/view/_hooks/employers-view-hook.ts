import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  fetchEmployerById,
  updateEmployerStatus,
  deleteEmployer,
  EmployerApprovalStatus,
} from "../_services/employers-view-service";
import { AdminRoutes } from "../../../router";

export function useEmployerView(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

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

  const updateStatus = useMutation({
    mutationFn: (status: EmployerApprovalStatus) =>
      updateEmployerStatus(id, status),
    onSuccess: () => {
      // Invalidar el detalle actual
      queryClient.invalidateQueries({ queryKey: getEmployerProfileKey });
      // Invalidar el listado de employers para que se actualice cuando vuelvas
      queryClient.invalidateQueries({ queryKey: ["employers"] });
    },
  });

  const deleteQuery = useMutation({
    mutationFn: () => deleteEmployer(id),
    onSuccess: () => {
      // Invalidar el listado antes de navegar
      queryClient.invalidateQueries({ queryKey: ["employers"] });
      router.push(AdminRoutes.employers);
    },
  });

  const handleSetLive = () => {
    updateStatus.mutate("approved");
  };

  const handleHideProfile = () => {
    updateStatus.mutate("pending");
  };

  const handleDelete = () => {
    deleteQuery.mutate();
  };

  return {
    profile,
    isLoading,
    error: error?.message || null,
    handleSetLive,
    handleHideProfile,
    handleDelete,
    isUpdating: updateStatus.isPending,
    isDeleting: deleteQuery.isPending,
  };
}
