"use client";

import { useState, useEffect } from "react";
import {
  getJobApplicants,
  transformJobSeekersToList,
  getColumnInfo,
} from "../_services/playground-service";

export function usePlaygroundHook(jobId: string) {
  // State para los job seekers
  const [jobSeekers, setJobSeekers] = useState<Record<string, any[]>>({
    new_applicants: [],
    in_progress: [],
    matched_to_employer: [],
    complete: [],
  });
  const [isLoading, setIsLoading] = useState(true);

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
    const list: HTMLElement[] = (preferred.length
      ? Array.from(preferred)
      : Array.from(container.children)) as HTMLElement[];

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

  /**
   * Cargar aplicantes desde la BD al montar el componente
   */
  useEffect(() => {
    async function loadApplicants() {
      setIsLoading(true);
      try {
        const applicants = await getJobApplicants(jobId);
        setJobSeekers(applicants);
      } catch (error) {
        console.error("Error loading applicants:", error);
        // Mantener estado vacío en caso de error
      } finally {
        setIsLoading(false);
      }
    }

    if (jobId) {
      loadApplicants();
    }
  }, [jobId]);

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
   * Maneja el drop de un job seeker en una columna (solo UI, sin BD)
   */
  const handleDrop = (e: any, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { item, sourceColumn } = draggedItem;

    // Compute insertion index based on drop height within the target column container
    const container: HTMLElement | null = (e.currentTarget as HTMLElement) || null;
    const rawIndex = container ? getInsertionIndex(container, e.clientY) : undefined;

    // Si es la misma columna, no hacer nada
    // Si es la misma columna, permitir reordenar dentro de la columna
    setJobSeekers((prevJobSeekers) => {
      const newJobSeekers: Record<string, any[]> = {
        ...prevJobSeekers,
      };

      const sourceList = [...(newJobSeekers[sourceColumn] || [])];
      const targetList =
        sourceColumn === targetColumnId
          ? sourceList
          : [...(newJobSeekers[targetColumnId] || [])];

      // Encontrar el índice actual del ítem en la lista fuente
      const currentIndex = sourceList.findIndex((js) => js.id === item.id);

      // Si por alguna razón no está, no hacemos nada
      if (currentIndex === -1) {
        return prevJobSeekers;
      }

      // Remover de la fuente
      sourceList.splice(currentIndex, 1);

      // Calcular índice de inserción en destino
      let insertIndex =
        typeof rawIndex === "number" && rawIndex >= 0 ? rawIndex : targetList.length;

      if (sourceColumn === targetColumnId) {
        // Ajustar índice si venimos de la misma lista y el removal movió posiciones
        if (insertIndex > currentIndex) insertIndex = insertIndex - 1;

        // Edge cases: soltar "encima de sí mismo" o posición equivalente => no-op
        if (insertIndex === currentIndex) {
          return prevJobSeekers; // nada cambia
        }

        // Insertar en la misma lista
        sourceList.splice(insertIndex, 0, item);

        newJobSeekers[sourceColumn] = sourceList;
        return newJobSeekers;
      } else {
        // Movimiento entre columnas diferentes
        // Asegurar límites de índice
        if (insertIndex < 0) insertIndex = 0;
        if (insertIndex > targetList.length) insertIndex = targetList.length;

        targetList.splice(insertIndex, 0, item);

        newJobSeekers[sourceColumn] = sourceList;
        newJobSeekers[targetColumnId] = targetList;
        return newJobSeekers;
      }
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
