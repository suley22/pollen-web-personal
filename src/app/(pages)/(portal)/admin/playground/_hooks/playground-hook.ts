"use client";

import { useState } from "react";
import {
  useJobApplicants,
  useUpdateApplicantStatus,
  transformJobSeekersToList,
  getColumnInfo,
  type GroupedApplicants,
} from "../_services/playground-service";

export function usePlaygroundHook(jobId: string | null) {
  // Fetch job applicants using React Query
  const {
    data: jobSeekers = {
      new_applicants: [],
      in_progress: [],
      matched_to_employer: [],
      complete: [],
    } as GroupedApplicants,
    isLoading,
    error,
  } = useJobApplicants(jobId);

  // Get mutation hook for updating applicant status
  const updateApplicantStatusMutation = useUpdateApplicantStatus();

  // View state
  const [viewMode, setViewMode] = useState<"board" | "grid">("board");
  const [selectedJobSeeker, setSelectedJobSeeker] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Drag & Drop state
  const [draggedItem, setDraggedItem] = useState<any>(null);

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
   * Inicia el drag de un job seeker
   */
  const handleDragStart = (e: any, item: any, columnId: string) => {
    setDraggedItem({ item, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = "move";
  };

  /**
   * Permite el drop en la columna
   */
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  /**
   * Maneja el drop de un job seeker en una columna (actualiza BD y UI)
   */
  const handleDrop = (e: any, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedItem || !jobId) return;

    const { item, sourceColumn } = draggedItem;

    // Si es la misma columna, no hacer nada
    if (sourceColumn === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    // Actualizar status en BD
    updateApplicantStatusMutation.mutate({
      applicationId: item.application_id,
      newStatus: targetColumnId,
      jobId: jobId,
    });

    setDraggedItem(null);
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
    isLoading,
    error,

    // Mutations
    isUpdatingStatus: updateApplicantStatusMutation.isPending,
    updateError: updateApplicantStatusMutation.error,

    // View state
    viewMode,
    setViewMode,

    // Drawer state
    selectedJobSeeker,
    isDrawerOpen,
    handleJobSeekerClick: handleClick,
    closeDrawer,

    // Drag & Drop
    handleDragStart,
    handleDragOver,
    handleDrop,

    // Helpers
    getAllJobSeekersWithStatus,
  };
}
