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
