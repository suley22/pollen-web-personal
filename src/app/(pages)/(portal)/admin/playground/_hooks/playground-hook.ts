"use client";

import { useState, useEffect, useRef } from "react";
import { getJobApplicants, transformJobSeekersToList, getColumnInfo } from "../_services/playground-service";
import { getInsertionIndex } from "@/lib/utils/dnd";

export function usePlaygroundHook(jobId: string) {
  // TODO(playground):
  // - Migrar fetching a react-query/tanstack-query para caching y estados (loading/error) consistentes.
  // - Tipar correctamente los modelos (JobSeeker, Application) para evitar uso de any.
  // - Mover constantes y helpers de DnD a un archivo utilitario si se reutilizan en otros módulos.
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
  // dropPreview: índice/columna donde se mostraría la inserción, y altura estimada
  const [dropPreview, setDropPreview] = useState<{
    columnId: string | null;
    index: number | null;
    height?: number | null;
  }>({ columnId: null, index: null, height: null });
  // hoverDepth por columna (ref, para evitar re-renders por cada enter/leave)
  const hoverDepthRef = useRef<Record<string, number>>({});

  // Refs para throttling del preview (reduce renders durante dragover):
  const previewStateRef = useRef<{ columnId: string | null; index: number | null; height?: number | null }>(
    { columnId: null, index: null, height: null },
  );
  const pendingPreviewRef = useRef<{ columnId: string | null; index: number | null; height?: number | null } | null>(
    null,
  );
  const rafIdRef = useRef<number | null>(null);

  const schedulePreviewUpdate = (next: { columnId: string | null; index: number | null; height?: number | null }) => {
    pendingPreviewRef.current = next;
    if (rafIdRef.current != null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const pending = pendingPreviewRef.current;
      if (!pending) return;
      // Only update state if actually changed (columnId or index or height)
      const curr = previewStateRef.current;
      if (
        curr.columnId === pending.columnId &&
        curr.index === pending.index &&
        curr.height === pending.height
      ) {
        return;
      }
      previewStateRef.current = pending;
      setDropPreview(pending);
    });
  };

  // Ref para imagen de drag custom (asegura ghost estable aunque el nodo fuente no esté en el DOM)
  const dragImageRef = useRef<HTMLElement | null>(null);

  // getInsertionIndex importado desde @/lib/utils/dnd

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
    // NOTE: Consider extracting DnD logic to a dedicated hook for reuse/testing.
    const el = e.currentTarget as HTMLElement | null;
    const rect = el?.getBoundingClientRect?.();
    const estimatedHeight = rect?.height ?? null;
  setDraggedItem({ item, sourceColumn: columnId, height: estimatedHeight });
  const initialPreview = { columnId: null, index: null, height: estimatedHeight };
  previewStateRef.current = initialPreview;
  setDropPreview(initialPreview);
    e.dataTransfer.effectAllowed = "move";

    // Crear imagen de arrastre estable
    try {
      if (el && e.dataTransfer) {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.style.position = "fixed";
        clone.style.top = "-10000px";
        clone.style.left = "-10000px";
        clone.style.width = `${rect?.width ?? el.clientWidth}px`;
        clone.style.height = `${rect?.height ?? el.clientHeight}px`;
        clone.style.pointerEvents = "none";
        document.body.appendChild(clone);
        dragImageRef.current = clone;
        // Usar un pequeño offset para que el cursor no tape totalmente la card
        e.dataTransfer.setDragImage(clone, 10, 10);
        // WebKit necesita además datos para habilitar drop
        try {
          e.dataTransfer.setData("text/plain", String(item?.id ?? "drag"));
        } catch (err) {
          // ignore
        }
      }
    } catch (err) {
      // ignore
    }
  };

  /**
   * Permite el drop en la columna
   */
  const handleDragOver = (e: any, targetColumnId?: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    // Update live preview position when hovering a column
    if (!draggedItem || !targetColumnId) return;
    const container: HTMLElement | null = (e.currentTarget as HTMLElement) || null;
    const rawIndex = container ? getInsertionIndex(container, e.clientY) : 0;
    schedulePreviewUpdate({
      columnId: targetColumnId,
      index: Math.max(0, rawIndex ?? 0),
      height: draggedItem?.height ?? null,
    });
  };

  /** Marca que estamos entrando a una columna (incrementa profundidad de hover)
   *  Ayuda a ignorar dragleave que ocurre al entrar/salir de elementos hijos
   */
  const handleDragEnter = (e: any, targetColumnId: string) => {
    e.preventDefault();
    hoverDepthRef.current[targetColumnId] = (hoverDepthRef.current[targetColumnId] || 0) + 1;

    // Mostrar inmediatamente el preview al entrar en la columna
    if (!draggedItem) return;
    const container: HTMLElement | null = (e.currentTarget as HTMLElement) || null;
    const rawIndex = container ? getInsertionIndex(container, e.clientY) : 0;
    schedulePreviewUpdate({
      columnId: targetColumnId,
      index: Math.max(0, rawIndex ?? 0),
      height: draggedItem?.height ?? null,
    });
  };

  /** Marca que salimos de una columna; cuando la profundidad llega a 0, limpiamos el preview */
  const handleDragLeave = (e: any, targetColumnId: string) => {
    e.preventDefault();
    const nextDepth = Math.max(0, (hoverDepthRef.current[targetColumnId] || 0) - 1);
    hoverDepthRef.current[targetColumnId] = nextDepth;
    if (nextDepth === 0 && previewStateRef.current.columnId === targetColumnId) {
      const cleared = { columnId: null, index: null, height: draggedItem?.height ?? null };
      previewStateRef.current = cleared;
      setDropPreview(cleared);
    }
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

  // Limpiamos el preview en el siguiente frame para no desaparecerlo antes de que la card vuelva a ser visible
  const clearPreview = () => {
      const cleared = { columnId: null, index: null, height: null } as const;
      previewStateRef.current = cleared;
      setDropPreview(cleared);
    };

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

    // Restauramos visibilidad de la card inmediatamente
    setDraggedItem(null);
    // Limpiar imagen de drag si existe
    if (dragImageRef.current) {
      try {
        document.body.removeChild(dragImageRef.current);
      } catch (err) {
        // ignore
      }
      dragImageRef.current = null;
    }
    // y limpiamos el preview en el próximo frame para evitar superposición
    if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
      window.requestAnimationFrame(clearPreview);
    } else {
      clearPreview();
    }
    hoverDepthRef.current[targetColumnId] = 0;
  };

  /**
   * Finaliza el drag (cancelado o completado fuera de drop)
   */
  const handleDragEnd = () => {
    setDraggedItem(null);
    const cleared = { columnId: null, index: null, height: null } as const;
    previewStateRef.current = cleared;
    setDropPreview(cleared);
    hoverDepthRef.current = {};
    if (dragImageRef.current) {
      try {
        document.body.removeChild(dragImageRef.current);
      } catch (err) {
        // ignore
      }
      dragImageRef.current = null;
    }
  };

  // Asegura limpieza incluso si el drag termina fuera de la card/board
  useEffect(() => {
    const onGlobalDragEnd = () => handleDragEnd();
    window.addEventListener("dragend", onGlobalDragEnd);
    return () => window.removeEventListener("dragend", onGlobalDragEnd);
  }, []);

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
    draggedItem,

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
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,

    // Helpers
    getAllJobSeekersWithStatus,

    // Preview state (para UI)
    dropPreview,
    // hoverDepth is internal (ref) now; not returned to avoid triggering re-renders
  };
}
