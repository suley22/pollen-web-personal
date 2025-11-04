"use client";

import { JOB_SEEKER_COLUMNS } from "../_services/job-applicants-service";
import JobSeekerCard from "./job-applicants-js-card";

// Componente de preview que imita el tamaño y estructura de una JobSeekerCard real
function DropPreviewCard() {
  return (
    <div className="relative bg-blue-50 rounded-lg border-2 border-dashed border-blue-300 transition-all duration-200">
      <div className="flex flex-col gap-3 p-4 opacity-40">
        {/* Header: Avatar placeholder, Name, Score */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-200 border-2 border-blue-300 flex-shrink-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="h-4 bg-blue-200 rounded mb-1"></div>
            <div className="h-3 bg-blue-200 rounded w-20"></div>
          </div>
        </div>

        {/* Applied Date placeholder */}
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 bg-blue-200 rounded"></div>
          <div className="h-3 bg-blue-200 rounded w-24"></div>
        </div>

        {/* Sub Status Badge placeholder */}
        <div className="w-full h-7 bg-blue-200 rounded"></div>

        {/* Divider */}
        <div className="border-t border-blue-200" />

        {/* Action Buttons placeholder */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-8 bg-blue-200 rounded"></div>
          <div className="h-8 w-8 bg-blue-200 rounded"></div>
          <div className="h-8 w-8 bg-blue-200 rounded"></div>
        </div>
      </div>

      {/* "Drop here" text centrado por encima */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded shadow-lg border border-blue-600">
          Drop here
        </div>
      </div>
    </div>
  );
}

export function BoardView({
  jobSeekers,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onJobSeekerClick,
  dragPreview,
  draggedItem,
}) {
  return (
    <div className="h-full w-full overflow-x-auto overflow-y-hidden">
      <div className="flex gap-4 w-full h-full pb-1 px-1">
        {JOB_SEEKER_COLUMNS.map((column) => (
          <div
            key={column.id}
            className="flex-none shrink-0 w-[320px] flex flex-col gap-0"
          >
            {/* Column Header */}
            <div
              className={`flex items-center justify-between ${column.color} rounded-t-xl px-4 py-2 border border-gray-200`}
            >
              <div className="text-sm font-bold text-gray-900 uppercase">
                {column.title}
              </div>
              <span
                className={`${column.badgeColor} text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center`}
              >
                {jobSeekers[column.id]?.length || 0}
              </span>
            </div>

            {/* Drop Zone - Auto height based on content */}
            <div
              onDragOver={(e) => onDragOver(e, column.id)}
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, column.id)}
              className={`bg-white rounded-b-xl p-4 border-x border-b border-gray-200 transition-colors ${
                jobSeekers[column.id]?.length === 0
                  ? "min-h-[80px]"
                  : "min-h-[200px]"
              } ${dragPreview?.columnId === column.id ? "bg-blue-50" : ""}`}
            >
              <div className="flex flex-col gap-3">
                {jobSeekers[column.id]?.length === 0 ? (
                  <div className="flex items-center justify-center h-12 text-gray-400 text-xs">
                    No applicants
                  </div>
                ) : (
                  jobSeekers[column.id]?.map((jobSeeker, index) => {
                    // Mostrar preview antes de esta card si corresponde
                    const showPreviewBefore =
                      dragPreview?.columnId === column.id &&
                      dragPreview?.position === index &&
                      draggedItem?.sourceColumn !== column.id;

                    return (
                      <div key={jobSeeker.id} data-card="true">
                        {showPreviewBefore && <DropPreviewCard />}
                        <JobSeekerCard
                          jobSeeker={jobSeeker}
                          columnId={column.id}
                          onDragStart={onDragStart}
                          onDragEnd={onDragEnd}
                          onClick={onJobSeekerClick}
                        />
                      </div>
                    );
                  })
                )}

                {/* Preview al final si corresponde */}
                {dragPreview?.columnId === column.id &&
                  dragPreview?.position >=
                    (jobSeekers[column.id]?.length || 0) &&
                  draggedItem?.sourceColumn !== column.id && (
                    <DropPreviewCard />
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
