"use client";

import { JOB_SEEKER_COLUMNS } from "../_services/playground-service";
import JobSeekerCard from "./task-card";
import DroppableColumn from "@/components/design-system/kanban/droppable-column";
import { EmptyState } from "@/components/design-system/empty-state";
import { Inbox } from "lucide-react";

// TODO(playground): Mejoras potenciales
// - Extraer el header de columna a un componente (<BoardColumnHeader />) y unificar estilos.
// - Considerar React.memo para JobSeekerCard si la lista crece (evitar renders en drag hover).
// - Añadir soporte de accesibilidad: teclado para reordenar y aria-dropeffect/aria-grabbed.
// - Virtualización (e.g. react-virtual) si hay muchas tarjetas por columna.

// TODO(playground): Este placeholder podría exportarse al design-system si se reutiliza en otros boards.
function PlaceholderCard({ height }: { height?: number | null }) {
  return (
    <div
      aria-hidden
      className="bg-white rounded-lg border border-gray-200"
      style={{ height: height ?? 120 }}
    />
  );
}

export function BoardView({
  jobSeekers,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onJobSeekerClick,
  onDragEnd,
  dropPreview,
  draggedItem,
}) {
  // Props esperados:
  // - jobSeekers: mapa columna -> lista de candidatos
  // - onDragStart: inicia el drag de una card
  // - onDragOver: calcula índice de inserción (preview) cuando el cursor está sobre una columna
  // - onDragEnter/onDragLeave: manejan contador de hover para limpiar el preview cuando se sale de la columna
  // - onDrop: mueve/reordena el candidato en el estado
  // - onJobSeekerClick: abre el drawer con detalles
  // - onDragEnd: resetea estados si se cancela o finaliza el drag fuera
  // - dropPreview: { columnId, index, height } posición/altura del placeholder
  // - draggedItem: referencia al item arrastrado para ocultar la card original
  return (
    <div className="flex items-stretch gap-6 w-full min-h-screen overflow-x-auto overflow-y-hidden">
      {JOB_SEEKER_COLUMNS.map((column) => (
        <div
          key={column.id}
          className="flex-none shrink-0 w-[320px] flex flex-col gap-0 bg-gray-50 h-full min-h-0"
        >
          {/* Column Header */}
          <div
            className={`sticky top-0 z-10 flex items-center justify-between ${column.color} rounded-t-xl p-4 border border-gray-200`}
          >
            <div className="font-semibold text-base text-base text-gray-900">
              {column.title}
            </div>
            <span
              className={`${column.badgeColor} text-white text-sm font-bold px-3 py-1 rounded-full`}
            >
              {jobSeekers[column.id]?.length || 0}
            </span>
          </div>

          {/* Drop Zone delegado al componente de design-system */}
          <DroppableColumn
            columnId={column.id}
            items={jobSeekers[column.id] || []}
            dropPreview={dropPreview}
            draggedItem={draggedItem}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            renderEmpty={() => (
              <EmptyState
                icon={Inbox}
                title="No applicants"
                description="Drag and drop candidates here to add them to this stage."
                className="h-32 py-4"
              />
            )}
            renderItem={(jobSeeker: any, index: number, isHidden: boolean) => (
              <JobSeekerCard
                key={jobSeeker.application_id ?? jobSeeker.id}
                jobSeeker={jobSeeker}
                columnId={column.id}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onClick={onJobSeekerClick}
                isHiddenWhileDragging={isHidden}
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}
