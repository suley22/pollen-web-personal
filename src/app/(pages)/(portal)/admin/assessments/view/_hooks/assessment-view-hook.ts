"use client";

import { useRouter } from "next/navigation";
import {
  useAssessmentById,
  useDeleteAssessment,
  useUpdateAssessment,
} from "../../_services/assessments-page-service";
import { AdminRoutes } from "@/admin/router";
import { AssessmentStatusEnum } from "@/types/assessment-types";

export function useAssessmentView(id: string | null) {
  const router = useRouter();
  const { data: assessment, isLoading } = useAssessmentById(id || "");
  const deleteAssessmentMutation = useDeleteAssessment();
  const updateAssessmentMutation = useUpdateAssessment();

  const handleEdit = () => {
    if (id) {
      router.push(AdminRoutes.assessmentEdit(id));
    }
  };

  const handleSetLive = async () => {
    if (!id) return;

    try {
      await updateAssessmentMutation.mutateAsync({
        id,
        input: { status: AssessmentStatusEnum.Live },
      });
    } catch (error) {
      console.error("Failed to set assessment live:", error);
    }
  };

  const handlePause = async () => {
    if (!id) return;

    try {
      await updateAssessmentMutation.mutateAsync({
        id,
        input: { status: AssessmentStatusEnum.Paused },
      });
    } catch (error) {
      console.error("Failed to pause assessment:", error);
    }
  };

  const handleArchive = async () => {
    if (!id) return;

    try {
      await updateAssessmentMutation.mutateAsync({
        id,
        input: { status: AssessmentStatusEnum.Archived },
      });
    } catch (error) {
      console.error("Failed to archive assessment:", error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteAssessmentMutation.mutateAsync(id);
      router.push(AdminRoutes.assessments);
    } catch (error) {
      console.error("Failed to delete assessment:", error);
    }
  };

  const handleBack = () => {
    router.push(AdminRoutes.assessments);
  };

  return {
    assessment,
    isLoading,
    handleEdit,
    handleSetLive,
    handlePause,
    handleArchive,
    handleDelete,
    handleBack,
    isDeleting: deleteAssessmentMutation.isPending,
    isUpdating: updateAssessmentMutation.isPending,
  };
}
