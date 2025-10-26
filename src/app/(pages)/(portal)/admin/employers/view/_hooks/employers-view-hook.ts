import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  useDeleteEmployer,
  useUpdateEmployerStatus,
  useEmployerById,
} from "@/employers/_services/employers-page-service";

import { AdminRoutes } from "@/admin/router";
import { EmployerApprovalStatusEnum as StatusEnum } from "@/types/employers-types";

export function useEmployerView(id: string) {
  const router = useRouter();

  const { data: profile, isLoading, error } = useEmployerById(id);

  const updateStatus = useUpdateEmployerStatus();
  const deleteQuery = useDeleteEmployer();

  const handleSetLive = () => {
    updateStatus.mutate({ id, status: StatusEnum.Approved });
  };

  const handleHideProfile = () => {
    updateStatus.mutate({ id, status: StatusEnum.Pending });
  };

  const handleDelete = () => {
    deleteQuery.mutate(id, {
      onSuccess: () => {
        router.push(AdminRoutes.employers);
      },
    });
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
