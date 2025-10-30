"use client";

import { useState } from "react";
import {
  getMockApplicants,
  transformJobSeekersToList,
  getColumnInfo,
} from "../_services/playground-service";

export function usePlaygroundHook(jobId: string) {
  // Usar datos mockeados en lugar de llamada a la BD
  const [jobSeekers, setJobSeekers] = useState(getMockApplicants());
  const isLoading = false; // No hay loading con datos mockeados

  // View state
  const [viewMode, setViewMode] = useState<"board" | "grid">("board");
  const [selectedJobSeeker, setSelectedJobSeeker] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Drag & Drop state
  const [draggedItem, setDraggedItem] = useState<any>(null);

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

    // Si es la misma columna, no hacer nada
    if (sourceColumn === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    // Actualizar el estado local (mover el job seeker entre columnas)
    setJobSeekers((prevJobSeekers) => {
      const newJobSeekers = { ...prevJobSeekers };

      // Remover de la columna origen
      newJobSeekers[sourceColumn] = newJobSeekers[sourceColumn].filter(
        (jobSeeker) => jobSeeker.id !== item.id,
      );

      // Agregar a la columna destino
      newJobSeekers[targetColumnId] = [...newJobSeekers[targetColumnId], item];

      return newJobSeekers;
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
