import {
  useJobById,
  useUpdateJobStatus,
  useDeleteJob,
} from "@/jobs/_services/jobs-page-service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { JOB_STATUS } from "@/constants/filters";

export function useJobViewHook(id: string) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("description");

  const { data, isLoading, error } = useJobById(id);

  const updateStatus = useUpdateJobStatus();
  const deleteQuery = useDeleteJob();

  const handleGoLive = () => {
    updateStatus.mutate({ id, status: JOB_STATUS.LIVE });
  };

  const handlePause = () => {
    updateStatus.mutate({ id, status: JOB_STATUS.PAUSED });
  };

  const handleComplete = () => {
    updateStatus.mutate({ id, status: JOB_STATUS.COMPLETE });
  };

  const handleCancel = () => {
    updateStatus.mutate({ id, status: JOB_STATUS.CANCELLED });
  };

  const handleDelete = () => {
    deleteQuery.mutate(
      { id },
      {
        onSuccess: () => {
          router.push(AdminRoutes.jobs);
        },
      },
    );
  };

  return {
    job: data,
    isLoading,
    error: error?.message || null,
    activeTab,
    setActiveTab,
    handleGoLive,
    handlePause,
    handleComplete,
    handleCancel,
    handleDelete,
    isUpdating: updateStatus.isPending,
    isDeleting: deleteQuery.isPending,
  };
}
