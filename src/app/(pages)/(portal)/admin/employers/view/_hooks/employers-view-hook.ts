import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  fetchEmployerById,
  updateEmployerStatus,
} from "../_services/employers-view-service";
import { deleteEmployer } from "@/employers/_services/employers-service";
import { AdminRoutes } from "@/admin/router";
import { EMPLOYERS_QUERY_KEYS as QueryKeys } from "@/employers/_queries/employers-query-keys";
import {
  EmployerApprovalStatusEnum as StatusEnum,
  EmployerApprovalStatus as Status,
} from "@/types/employers-types";

export function useEmployerView(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: QueryKeys.profile(id),
    queryFn: () => fetchEmployerById(id),
    enabled: !!id,
  });

  const updateStatus = useMutation({
    mutationFn: (status: Status) => updateEmployerStatus(id, status),
    onSuccess: () => {
      // Invalidar el detalle actual
      queryClient.invalidateQueries({
        queryKey: QueryKeys.profile(id),
      });
      // Invalidar el listado de employers para que se actualice cuando vuelvas
      queryClient.invalidateQueries({ queryKey: QueryKeys.all });
    },
  });

  const deleteQuery = useMutation({
    mutationFn: () => deleteEmployer(id),
    onSuccess: () => {
      // Invalidar el listado antes de navegar
      queryClient.invalidateQueries({ queryKey: QueryKeys.all });
      router.push(AdminRoutes.employers);
    },
  });

  const handleSetLive = () => {
    updateStatus.mutate(StatusEnum.Approved);
  };

  const handleHideProfile = () => {
    updateStatus.mutate(StatusEnum.Pending);
  };

  // TODO: Mover al hook de la page
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
