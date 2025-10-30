"use client";

import { JOB_SEEKER_COLUMNS } from "../_services/playground-service";
import JobSeekerCard from "./task-card";

export function BoardView({
  jobSeekers,
  onDragStart,
  onDragOver,
  onDrop,
  onJobSeekerClick,
}) {
  return (
    <div className="flex gap-6 w-full overflow-x-auto pb-6">
      {JOB_SEEKER_COLUMNS.map((column) => (
        <div
          key={column.id}
          className="flex-1 min-w-[320px] flex flex-col gap-0"
        >
          {/* Column Header */}
          <div
            className={`flex items-center justify-between ${column.color} rounded-t-xl p-4 border border-gray-200`}
          >
            <h2 className="font-semibold text-base text-gray-900">
              {column.title}
            </h2>
            <span
              className={`${column.badgeColor} text-white text-sm font-bold px-3 py-1 rounded-full`}
            >
              {jobSeekers[column.id]?.length || 0}
            </span>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column.id)}
            className="flex-1 bg-white rounded-b-xl p-4 min-h-[600px] border-x border-b border-gray-200 transition-colors"
          >
            <div className="flex flex-col gap-3">
              {jobSeekers[column.id]?.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                  No applicants
                </div>
              ) : (
                jobSeekers[column.id]?.map((jobSeeker, index) => (
                  <JobSeekerCard
                    key={`${jobSeeker.id}-${index}`}
                    jobSeeker={jobSeeker}
                    columnId={column.id}
                    onDragStart={onDragStart}
                    onClick={onJobSeekerClick}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
