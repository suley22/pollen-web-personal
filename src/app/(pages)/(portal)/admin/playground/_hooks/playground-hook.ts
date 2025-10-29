"use client";

import { useState } from "react";
import {
  useJobApplicants,
  useUpdateApplicationStatus,
  transformTasksToList,
  getColumnInfo,
} from "../_services/playground-service";

export function usePlaygroundHook(jobId: string) {
  const { data: tasks = {}, isLoading, error } = useJobApplicants(jobId);
  const updateStatusMutation = useUpdateApplicationStatus();

  // View state
  const [viewMode, setViewMode] = useState("board"); // "board" or "grid"
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Drag & Drop state
  const [draggedItem, setDraggedItem] = useState(null);

  /**
   * Maneja el click en una tarea para abrir el drawer
   */
  const handleClick = (task, status) => {
    const statusInfo = getColumnInfo(status);
    setSelectedTask({
      ...task,
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
    setTimeout(() => setSelectedTask(null), 300); // Wait for animation
  };

  /**
   * Inicia el drag de una tarea
   */
  const handleDragStart = (e, item, columnId) => {
    setDraggedItem({ item, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = "move";
  };

  /**
   * Permite el drop en la columna
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  /**
   * Maneja el drop de una tarea en una columna
   */
  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { item, sourceColumn } = draggedItem;

    // Si es la misma columna, no hacer nada
    if (sourceColumn === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    // Actualizar el status en la BD usando mutation
    updateStatusMutation.mutate({
      applicationId: item.id,
      newStatus: targetColumnId,
    });

    setDraggedItem(null);
  };

  /**
   * Obtiene todas las tareas en formato de lista con su status
   */
  const getAllTasksWithStatus = () => {
    return transformTasksToList(tasks);
  };

  return {
    // Data
    tasks,
    isLoading,
    error,

    // View state
    viewMode,
    setViewMode,

    // Drawer state
    selectedTask,
    isDrawerOpen,
    handleTaskClick: handleClick,
    closeDrawer,

    // Drag & Drop
    handleDragStart,
    handleDragOver,
    handleDrop,

    // Helpers
    getAllTasksWithStatus,
  };
}
