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
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-6 gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Playground</h1>
            <p className="text-muted-foreground">
              Kanban Board - Drag & Drop Demo
            </p>
          </div>

          {/* View Toggle */}
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
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
