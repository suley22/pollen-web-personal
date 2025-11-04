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
  const [personaResultAssessmentId, setPersonaResultAssessmentId] =
    useState(null);
  const [skillsAssessmentId, setSkillsAssessmentId] = useState(null);

  // Update state when job data loads (si se necesita en el futuro para manejar datos adicionales)
  useEffect(() => {
    if (job) {
      // Inicializar el assessment ID si existe en el job
      setPersonaResultAssessmentId(job.persona_result_assessment_id || null);
      setSkillsAssessmentId(job.skills_assessment_id || null);
    }
  }, [job]);

  const handleBack = () => {
    router.push(AdminRoutes.jobs);
  };

  const handleAssessmentChange = (assessmentId) => {
    setPersonaResultAssessmentId(assessmentId);
  };

  const handleSkillsAssessmentChange = (assessmentId) => {
    setSkillsAssessmentId(assessmentId);
  };

  // Función para sincronizar campos visibles con campos ocultos
  const syncHiddenFields = () => {
    if (!formRef.current) return;

    const form = formRef.current;
    const fieldMappings = [
      "job_title",
      "company_id",
      "user_id",
      "location",
      "working_hours",
      "salary_range",
      "work_arrangement",
      "employment_type",
      "work_authorization",
      "description",
    ];

    fieldMappings.forEach((fieldName) => {
      const visibleField = form.querySelector(
        `[name="${fieldName}"]:not([id^="hidden_"])`,
      );
      const hiddenField = form.querySelector(`#hidden_${fieldName}`);

      if (visibleField && hiddenField) {
        hiddenField.value = visibleField.value || "";
      }
    });
  };

  // Manejar cambio de tab - sincronizar campos antes de cambiar
  const handleTabChange = (newTab) => {
    syncHiddenFields();
    setActiveTab(newTab);
  };

  const saveJob = async () => {
    try {
      // Verificar que formRef.current existe y es un formulario
      if (!formRef.current) {
        throw new Error("Form not found");
      }

      // Sincronizar todos los campos antes de enviar
      syncHiddenFields();

      const formData = new FormData(formRef.current);

      // Debug: ver qué datos están en el FormData
      console.log("=== FormData Debug ===");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      console.log("=== End FormData Debug ===");

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
    personaResultAssessmentId,
    skillsAssessmentId,
    setActiveTab: handleTabChange,
    setIsDialogOpen,
    handleBack,
    handleAssessmentChange,
    handleSkillsAssessmentChange,
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
