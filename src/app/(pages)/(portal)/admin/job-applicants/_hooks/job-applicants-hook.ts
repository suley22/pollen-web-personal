"use client";

import { useState, useEffect } from "react";
import {
  useJobApplicants,
  useUpdateApplicantStatus,
  useUpdateAssessmentScores,
  useUpdateApplicantStatusAndSubStatus,
  useUpdateCalendlyLink,
  transformJobSeekersToList,
  getColumnInfo,
  type GroupedApplicants,
} from "../_services/job-applicants-service";
import { useJobById } from "../../jobs/_services/jobs-page-service";

export function useJobApplicantsHook(jobId: string | null) {
  // Fetch job info using React Query
  const {
    data: jobInfo,
    isLoading: isJobLoading,
    error: jobError,
  } = useJobById(jobId!);

  // Fetch job applicants using React Query
  const {
    data: jobSeekers = {
      new_applicants: [],
      in_progress: [],
      matched_to_employer: [],
      complete: [],
    } as GroupedApplicants,
    isLoading: isApplicantsLoading,
    error,
  } = useJobApplicants(jobId);

  const isLoading = isJobLoading || isApplicantsLoading;

  // Get mutation hooks
  const updateApplicantStatusMutation = useUpdateApplicantStatus();
  const updateAssessmentScoresMutation = useUpdateAssessmentScores();
  const updateStatusAndSubStatusMutation =
    useUpdateApplicantStatusAndSubStatus();
  const updateCalendlyLinkMutation = useUpdateCalendlyLink();

  // View state
  const [viewMode, setViewMode] = useState<"board" | "grid">("board");
  const [selectedJobSeeker, setSelectedJobSeeker] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Drag & Drop state
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragPreview, setDragPreview] = useState<{
    columnId: string;
    position: number;
  } | null>(null);

  /**
   * Actualiza el selectedJobSeeker cuando cambian los datos de React Query
   * Esto asegura que el badge de status se actualice en tiempo real
   */
  useEffect(() => {
    if (selectedJobSeeker && jobSeekers) {
      // Buscar el job seeker actualizado en todas las columnas
      const allJobSeekers = transformJobSeekersToList(jobSeekers);
      const updatedJobSeeker = allJobSeekers.find(
        (js) => js.application_id === selectedJobSeeker.application_id,
      );

      if (updatedJobSeeker) {
        // Solo actualizar si hay cambios reales en status o sub_status para evitar loops infinitos
        if (
          updatedJobSeeker.status !== selectedJobSeeker.status ||
          updatedJobSeeker.sub_status !== selectedJobSeeker.sub_status
        ) {
          // Actualizar con la información más reciente incluyendo statusLabel y statusColor
          setSelectedJobSeeker({
            ...updatedJobSeeker,
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobSeekers]);

  // Computes the insertion index inside a container based on mouse Y position
  // Falls back to container.children if no specific draggable selector matches
  const getInsertionIndex = (container: HTMLElement, clientY: number) => {
    // Prefer specific draggable nodes if available
    const preferred = container.querySelectorAll(
      '[data-draggable-item="true"], [data-js-item], [draggable="true"]',
    );
    const list: HTMLElement[] = (
      preferred.length ? Array.from(preferred) : Array.from(container.children)
    ) as HTMLElement[];

    if (!list.length) return 0;

    let closest = { offset: Number.NEGATIVE_INFINITY, index: list.length };
    list.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const offset = clientY - (rect.top + rect.height / 2);
      // We look for the closest element above the cursor (offset < 0)
      if (offset < 0 && offset > closest.offset) {
        closest = { offset, index };
      }
    });

    // If none is above, insert at end
    return closest.offset === Number.NEGATIVE_INFINITY
      ? list.length
      : closest.index;
  };

  // No need for useEffect - React Query handles data fetching automatically

  /**
   * Maneja el click en un job seeker para abrir el drawer
   */
  const handleClick = (jobSeeker: any, status: string) => {
    const statusInfo = getColumnInfo(status);
    setSelectedJobSeeker({
      ...jobSeeker,
      status: status,
      statusLabel: statusInfo?.title || "",
      statusColor: statusInfo?.badgeColor || "",
    });
    setIsDrawerOpen(true);
  };

  /**
   * Cierra el drawer
   */
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedJobSeeker(null), 300); // Wait for animation
  };

  /**
   * Actualiza los assessment scores de un aplicante
   */
  const handleUpdateAssessmentScores = (
    applicationId: string,
    scores: {
      score1: number;
      score2: number;
      score3: number;
      score4: number;
    },
  ) => {
    if (!jobId) return;

    updateAssessmentScoresMutation.mutate({
      applicationId,
      scores,
      jobId,
    });
  };

  /**
   * Actualiza el link de Calendly de un aplicante
   */
  const handleUpdateCalendlyLink = (
    applicationId: string,
    calendlyLink: string,
  ) => {
    if (!jobId) return;

    updateCalendlyLinkMutation.mutate({
      applicationId,
      calendlyLink,
      jobId,
    });
  };

  /**
   * Invita al aplicante a una entrevista de Pollen
   * Actualiza status a "in_progress" y sub_status a "Invited to Pollen Interview"
   */
  const handleInviteToPollenInterview = (applicationId: string) => {
    if (!jobId) return;

    updateStatusAndSubStatusMutation.mutate({
      applicationId,
      status: "in_progress",
      subStatus: "Invited to Pollen Interview",
      jobId,
    });
  };

  /**
   * Actualiza status y sub_status de un aplicante
   */
  const handleUpdateStatusAndSubStatus = (
    applicationId: string,
    status: string,
    subStatus: string,
    stoppedAtStage?: string,
  ) => {
    if (!jobId) return;

    updateStatusAndSubStatusMutation.mutate({
      applicationId,
      status,
      subStatus,
      jobId,
      stoppedAtStage,
    });
  };

  /**
   * Inicia el drag de un job seeker
   */
  const handleDragStart = (e: any, item: any, columnId: string) => {
    setDraggedItem({ item, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = "move";
  };

  /**
   * Limpia el estado cuando el drag termina sin drop
   */
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragPreview(null);
  };

  /**
   * Permite el drop en la columna y maneja el preview
   */
  const handleDragOver = (e: any, targetColumnId?: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    // Solo mostrar preview si estamos arrastrando algo y es una columna diferente
    if (
      draggedItem &&
      targetColumnId &&
      targetColumnId !== draggedItem.sourceColumn
    ) {
      // Calcular posición basada en la posición Y del mouse
      const dropZone = e.currentTarget;
      const rect = dropZone.getBoundingClientRect();
      const y = e.clientY - rect.top;

      // Obtener todas las cards en esta columna
      const cards = dropZone.querySelectorAll('[data-card="true"]');
      let position = 0;

      // Encontrar la posición correcta basada en la posición Y
      for (let i = 0; i < cards.length; i++) {
        const cardRect = cards[i].getBoundingClientRect();
        const cardY = cardRect.top - rect.top + cardRect.height / 2;

        if (y < cardY) {
          position = i;
          break;
        }
        position = i + 1;
      }

      setDragPreview({
        columnId: targetColumnId,
        position: position,
      });
    }
  };

  /**
   * Maneja cuando el drag sale de una columna
   */
  const handleDragLeave = (e: any) => {
    // Solo limpiar si realmente salimos del área
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragPreview(null);
    }
  };

  /**
   * Maneja el drop de un job seeker en una columna (actualiza BD y UI)
   */
  const handleDrop = (e: any, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedItem || !jobId) return;

    const { item, sourceColumn } = draggedItem;

    // Limpiar estados de drag
    setDraggedItem(null);
    setDragPreview(null);

    // Si es la misma columna, no hacer nada
    if (sourceColumn === targetColumnId) {
      return;
    }

    // Actualizar status en BD
    updateApplicantStatusMutation.mutate({
      applicationId: item.application_id,
      newStatus: targetColumnId,
      jobId: jobId,
    });
  };

  /**
   * Obtiene todos los job seekers en formato de lista con su status
   */
  const getAllJobSeekersWithStatus = () => {
    return transformJobSeekersToList(jobSeekers);
  };

  return {
    // Data
    jobSeekers,
    jobInfo,
    isLoading,
    error,

    // Mutations
    isUpdatingStatus: updateApplicantStatusMutation.isPending,
    updateError: updateApplicantStatusMutation.error,
    isUpdatingScores: updateAssessmentScoresMutation.isPending,

    // View state
    viewMode,
    setViewMode,

    // Drawer state
    selectedJobSeeker,
    isDrawerOpen,
    handleJobSeekerClick: handleClick,
    closeDrawer,
    handleUpdateAssessmentScores,
    handleUpdateCalendlyLink,
    handleInviteToPollenInterview,
    handleUpdateStatusAndSubStatus,

    // Drag & Drop
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    dragPreview,
    draggedItem,

    // Helpers
    getAllJobSeekersWithStatus,
  };
}
