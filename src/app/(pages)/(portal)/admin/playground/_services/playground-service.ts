"use client";

import { useState } from "react";

// Mock data - en el futuro se reemplazará con llamadas a la API
const MOCK_TASKS = {
  new: [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
    { id: "3", content: "Task 3" },
  ],
  inProgress: [
    { id: "4", content: "Task 4" },
    { id: "5", content: "Task 5" },
  ],
  matchedToEmployer: [{ id: "6", content: "Task 6" }],
  complete: [{ id: "7", content: "Task 7" }],
};

export const TASK_COLUMNS = [
  {
    id: "new",
    title: "New",
    color: "bg-slate-100",
    badgeColor: "bg-slate-500",
  },
  {
    id: "inProgress",
    title: "In Progress",
    color: "bg-blue-100",
    badgeColor: "bg-blue-500",
  },
  {
    id: "matchedToEmployer",
    title: "Matched to Employer",
    color: "bg-purple-100",
    badgeColor: "bg-purple-500",
  },
  {
    id: "complete",
    title: "Complete",
    color: "bg-green-100",
    badgeColor: "bg-green-500",
  },
];

/**
 * Hook para obtener todas las tareas
 * En el futuro, esto usará React Query y llamará a la API
 */
export function useTasks() {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  return {
    tasks,
    setTasks,
    isLoading: false,
    error: null,
  };
}

/**
 * Hook para mover una tarea entre columnas
 * En el futuro, esto será una mutation que actualice la BD
 */
export function useMoveTask() {
  return {
    moveTask: (tasks, sourceColumn, targetColumn, taskId) => {
      const newTasks = { ...tasks };

      // Find the task
      const task = newTasks[sourceColumn].find((t) => t.id === taskId);
      if (!task) return tasks;

      // Remove from source
      newTasks[sourceColumn] = newTasks[sourceColumn].filter(
        (t) => t.id !== taskId,
      );

      // Add to target
      newTasks[targetColumn] = [...newTasks[targetColumn], task];

      return newTasks;
    },
    isPending: false,
  };
}

/**
 * Transforma las tareas agrupadas por columna en una lista plana con status
 */
export function transformTasksToList(tasks) {
  const allTasks = [];

  TASK_COLUMNS.forEach((column) => {
    tasks[column.id]?.forEach((task) => {
      allTasks.push({
        ...task,
        status: column.id,
        statusLabel: column.title,
        statusColor: column.badgeColor,
      });
    });
  });

  return allTasks;
}

/**
 * Obtiene información de una columna por su ID
 */
export function getColumnInfo(columnId) {
  return TASK_COLUMNS.find((col) => col.id === columnId);
}
