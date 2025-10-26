"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { useJobById, useCreateJob } from "@/jobs/_services/jobs-page-service";

export function useJobsCreatePage({ id = null }) {
  const router = useRouter();
  const formRef = useRef(null);

  const isEditMode = !!id;

  // Query para obtener job (solo si hay id - modo edición)
  const { data: { data: job } = {}, isLoading } = useJobById(id || "");

  // Mutation para crear
  const createMutation = useCreateJob();

  // // Mutation para actualizar
  // const updateMutation = useUpdateJob();

  const [activeTab, setActiveTab] = useState("description");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBack = () => {
    router.push(AdminRoutes.jobs);
  };

  const saveJob = async () => {
    try {
      const formData = new FormData(formRef.current);

      if (id) {
        // TODO: Add update mutation
        // await updateMutation.mutateAsync({ id, formData });
      } else {
        await createMutation.mutateAsync({ formData });
      }

      router.push(AdminRoutes.employers);
    } catch (error) {
      console.error("Error saving employer:", error);
      throw error;
    }
  };

  return {
    job,
    formRef,
    isLoading,
    activeTab,
    isEditMode,
    isDialogOpen,
    setActiveTab,
    setIsDialogOpen,
    handleBack,
    saveJob,
  };
}
