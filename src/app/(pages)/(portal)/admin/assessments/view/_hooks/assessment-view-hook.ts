"use client";

import { useRouter } from "next/navigation";
import {
  useAssessmentById,
  useDeleteAssessment,
} from "../../_services/assessments-page-service";
import { AdminRoutes } from "@/admin/router";

export function useAssessmentView(id: string | null) {
  const router = useRouter();
  const { data: assessment, isLoading } = useAssessmentById(id || "");
  const deleteAssessmentMutation = useDeleteAssessment();

  const handleEdit = () => {
    if (id) {
      router.push(AdminRoutes.assessmentEdit(id));
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
    handleDelete,
    handleBack,
    isDeleting: deleteAssessmentMutation.isPending,
  };
}
