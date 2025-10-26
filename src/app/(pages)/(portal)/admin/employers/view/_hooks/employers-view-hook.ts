import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  useDeleteEmployer,
  useUpdateEmployerStatus,
  useEmployerById,
} from "@/employers/_services/employers-page-service";

import { AdminRoutes } from "@/admin/router";
import { EMPLOYER_STATUS } from "@/constants/filters";

export function useEmployerView(id: string) {
  const router = useRouter();

  const { data: profile, isLoading, error } = useEmployerById(id);

  const updateStatus = useUpdateEmployerStatus();
  const deleteQuery = useDeleteEmployer();

  const handleSetLive = () => {
    updateStatus.mutate({ id, status: EMPLOYER_STATUS.LIVE });
  };

  const handleHideProfile = () => {
    updateStatus.mutate({
      id,
      status: EMPLOYER_STATUS.HIDDEN,
    });
  };

  const handleDelete = () => {
    deleteQuery.mutate(
      { id },
      {
        onSuccess: () => {
          router.push(AdminRoutes.employers);
        },
      },
    );
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
