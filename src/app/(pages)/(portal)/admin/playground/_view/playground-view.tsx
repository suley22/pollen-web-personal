"use client";

import { usePlaygroundHook } from "../_hooks/playground-hook";
import { BoardView } from "../_components/board-view";
import { GridView } from "../_components/grid-view";
import { TaskDrawer } from "../_components/task-drawer";
import { ViewToggle } from "../_components/view-toggle";

// Mock jobId - por el momento usamos este valor fijo
const jobId = "139ad003-8062-4cf2-8aee-354451d51798";

export default function PlaygroundView() {
  const {
    jobSeekers,
    isLoading,
    viewMode,
    setViewMode,
    selectedJobSeeker,
    isDrawerOpen,
    handleJobSeekerClick,
    closeDrawer,
    handleDragStart,
    handleDragOver,
    handleDrop,
    getAllJobSeekersWithStatus,
  } = usePlaygroundHook(jobId);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p className="text-gray-500 text-sm">Loading applicants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Applicants Pipeline
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track candidate applications
          </p>
        </div>

        {/* View Toggle */}
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {/* Board View */}
      {viewMode === "board" && (
        <BoardView
          jobSeekers={jobSeekers}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onJobSeekerClick={handleJobSeekerClick}
        />
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <GridView
          jobSeekers={getAllJobSeekersWithStatus()}
          onJobSeekerClick={handleJobSeekerClick}
        />
      )}

      {/* Job Seeker Drawer */}
      <TaskDrawer
        isOpen={isDrawerOpen}
        jobSeeker={selectedJobSeeker}
        onClose={closeDrawer}
      />
    </div>
  );
}
