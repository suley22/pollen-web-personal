"use client";

import React, { useEffect, useState, memo } from "react";

// DroppableColumn: encapsula el Drop Zone de una columna Kanban
// - Renderiza un placeholder de preview en el índice de inserción
// - Oculta el item original si está siendo arrastrado desde esta columna
// - Delega eventos DnD al padre (lo que permite mantener el estado en un hook externo)

type DroppableColumnProps = {
  columnId: string;
  items: any[];
  // Estado de preview compartido
  dropPreview: {
    columnId: string | null;
    index: number | null;
    height?: number | null;
  } | null;
  // Info del item arrastrado para ocultar su card original
  draggedItem?: {
    item: any;
    sourceColumn: string;
    height?: number | null;
  } | null;
  // Handlers delegados
  onDragOver: (e: any, columnId: string) => void;
  onDragEnter: (e: any, columnId: string) => void;
  onDragLeave: (e: any, columnId: string) => void;
  onDrop: (e: any, columnId: string) => void;
  // Render de cada item. El tercer parámetro indica si debe ocultarse durante el drag
  renderItem: (
    item: any,
    index: number,
    isHiddenWhileDragging: boolean,
  ) => React.ReactNode;
  // Clase extra para el contenedor del drop zone
  className?: string;
  // Render opcional del empty state (se usa cuando no hay items visibles y no hay preview)
  renderEmpty?: () => React.ReactNode;
};

export function DroppableColumn({
  columnId,
  items,
  dropPreview,
  draggedItem,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  renderItem,
  className,
  renderEmpty,
}: DroppableColumnProps) {
  const isPreviewInThisColumn =
    dropPreview?.columnId === columnId &&
    dropPreview?.index !== null &&
    dropPreview?.index !== undefined;

  return (
    <div
      onDragOver={(e) => onDragOver(e, columnId)}
      onDragEnter={(e) => onDragEnter(e, columnId)}
      onDragLeave={(e) => onDragLeave(e, columnId)}
      onDrop={(e) => onDrop(e, columnId)}
      className={
        className ||
        "flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white rounded-b-xl p-4 border-x border-b border-gray-200 transition-colors"
      }
    >
      <div className="flex flex-col gap-3">
        {(() => {
          if (!items || items.length === 0) {
            return isPreviewInThisColumn ? (
              <PlaceholderCard height={dropPreview?.height} />
            ) : (
              <MountFade>
                {renderEmpty ? (
                  renderEmpty()
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                    No applicants
                  </div>
                )}
              </MountFade>
            );
          }

          const children: any[] = [];
          let visibleIndex = 0; // índice relativo a los elementos visibles (excluye la card oculta)
          const insertAt = isPreviewInThisColumn
            ? (dropPreview!.index as number)
            : null;
          let inserted = false;

          items.forEach((item: any, idx: number) => {
            const isDraggingThisCard =
              draggedItem?.item?.id === item.id &&
              draggedItem?.sourceColumn === columnId;

            // Si debemos insertar el placeholder antes del siguiente visible
            if (insertAt !== null && !inserted && visibleIndex === insertAt) {
              children.push(
                <PlaceholderCard
                  key={`preview-${columnId}-${visibleIndex}`}
                  height={dropPreview?.height}
                />,
              );
              inserted = true;
            }

            // Render del item; si es el que se arrastra, lo renderizamos colapsado (sin ocupar espacio)
            children.push(renderItem(item, idx, !!isDraggingThisCard));

            // Sólo incrementamos visibleIndex si el item no está oculto
            if (!isDraggingThisCard) {
              visibleIndex++;
            }
          });

          // Si el preview era al final, insertarlo ahora
          if (insertAt !== null && !inserted) {
            children.push(
              <PlaceholderCard
                key={`preview-${columnId}-end`}
                height={dropPreview?.height}
              />,
            );
            inserted = true;
          }

          // Si no quedó ningún elemento visible y no hay preview para esta columna, mostrar empty state
          if (visibleIndex === 0 && !isPreviewInThisColumn) {
            return (
              <MountFade>
                {renderEmpty ? (
                  renderEmpty()
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                    No applicants
                  </div>
                )}
              </MountFade>
            );
          }

          return children;
        })()}
      </div>
    </div>
  );
}

// Placeholder con sutil animación (pulse) para dar feedback pero manteniendo borde/tamaño
function PlaceholderCard({ height }: { height?: number | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      aria-hidden
      className={
        "bg-white rounded-lg border border-gray-200 transition-all duration-150 " +
        (mounted ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]")
      }
      style={{ height: height ?? 120, willChange: "opacity, transform" }}
    />
  );
}

function MountFade({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={
        "transition-opacity duration-150 " +
        (mounted ? "opacity-100" : "opacity-0")
      }
      style={{ willChange: "opacity" }}
    >
      {children}
    </div>
  );
}

// Memoize to avoid re-rendering all columns on every dragover update
// Only re-render when:
// - The items array identity changes (drop/reorder)
// - The local preview for this column (index/height) changes
// - The hidden dragged item for this column changes (id/source)
export default memo(DroppableColumn, (prev, next) => {
  const colId = prev.columnId;

  // Items: identity check (lists regenerated only on drop/reorder)
  const sameItems = prev.items === next.items;

  // Local preview state for this column only
  const prevLocalIndex =
    prev.dropPreview?.columnId === colId
      ? (prev.dropPreview?.index ?? null)
      : null;
  const nextLocalIndex =
    next.dropPreview?.columnId === colId
      ? (next.dropPreview?.index ?? null)
      : null;

  const prevLocalHeight =
    prev.dropPreview?.columnId === colId
      ? (prev.dropPreview?.height ?? null)
      : null;
  const nextLocalHeight =
    next.dropPreview?.columnId === colId
      ? (next.dropPreview?.height ?? null)
      : null;

  const prevHiddenId =
    prev.draggedItem?.sourceColumn === colId
      ? (prev.draggedItem?.item?.id ?? null)
      : null;
  const nextHiddenId =
    next.draggedItem?.sourceColumn === colId
      ? (next.draggedItem?.item?.id ?? null)
      : null;

  const samePreview =
    prevLocalIndex === nextLocalIndex && prevLocalHeight === nextLocalHeight;
  const sameHidden = prevHiddenId === nextHiddenId;

  // Ignore handler function identity and renderItem/className changes
  return sameItems && samePreview && sameHidden;
});
