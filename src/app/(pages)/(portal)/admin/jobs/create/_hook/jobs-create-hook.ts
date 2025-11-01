"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import {
  useJobById,
  useCreateJob,
  useUpdateJob,
  useExternalJobById,
  useCreateExternalJob,
  useUpdateExternalJob,
} from "@/jobs/_services/jobs-page-service";
import { getLoggedInUserId } from "@/services/userService";

export function useJobsCreatePage({ id = null }) {
  const router = useRouter();
  const formRef = useRef(null);

  const isEditMode = !!id;

  // Query para obtener job (solo si hay id - modo edición)
  const { data: job, isLoading } = useJobById(id || "");

  // Mutation para crear
  const createMutation = useCreateJob();

  // Mutation para actualizar
  const updateMutation = useUpdateJob();

  const [activeTab, setActiveTab] = useState("description");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Update state when job data loads (si se necesita en el futuro para manejar datos adicionales)
  useEffect(() => {
    if (job) {
      // Aquí puedes inicializar estados adicionales cuando el job cargue
      // Por ejemplo, si necesitas manejar URLs de imágenes u otros datos derivados
    }
  }, [job]);

  const handleBack = () => {
    router.push(AdminRoutes.jobs);
  };

  const saveJob = async () => {
    try {
      const formData = new FormData(formRef.current);

      const userId = await getLoggedInUserId();

      if (!userId) {
        throw new Error("User not authenticated");
      }

      if (id) {
        await updateMutation.mutateAsync({ id, formData });
      } else {
        await createMutation.mutateAsync({ formData });
      }

      // Redirect to jobs list after success
      router.push(AdminRoutes.jobs);
    } catch (error) {
      console.error("Error saving job:", error);
      throw error;
    }
  };

  return {
    job,
    formRef,
    isLoading:
      isLoading || createMutation.isPending || updateMutation.isPending,
    activeTab,
    isEditMode,
    isDialogOpen,
    setActiveTab,
    setIsDialogOpen,
    handleBack,
    saveJob,
  };
}

export function useJobsCreateExternalPage({ id = null }) {
  const router = useRouter();
  const formRef = useRef(null);

  const isEditMode = !!id;

  // Query para obtener external job (solo si hay id - modo edición)
  const { data: externalJob, isLoading } = useExternalJobById(id || "");

  // Mutation para crear
  const createMutation = useCreateExternalJob();

  // Mutation para actualizar
  const updateMutation = useUpdateExternalJob();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Update state when external job data loads
  useEffect(() => {
    if (externalJob) {
      // Aquí puedes inicializar estados adicionales cuando el external job cargue
    }
  }, [externalJob]);

  const handleBack = () => {
    router.push(AdminRoutes.jobs);
  };

  const saveExternalJob = async () => {
    try {
      const formData = new FormData(formRef.current);

      const userId = await getLoggedInUserId();

      if (!userId) {
        throw new Error("User not authenticated");
      }

      if (id) {
        await updateMutation.mutateAsync({ id, formData });
      } else {
        await createMutation.mutateAsync({ formData });
      }

      // Redirect to jobs list after success
      router.push(AdminRoutes.jobs);
    } catch (error) {
      console.error("Error saving external job:", error);
      throw error;
    }
  };

  return {
    externalJob,
    formRef,
    isLoading:
      isLoading || createMutation.isPending || updateMutation.isPending,
    isEditMode,
    isDialogOpen,
    setIsDialogOpen,
    handleBack,
    saveExternalJob,
  };
}
