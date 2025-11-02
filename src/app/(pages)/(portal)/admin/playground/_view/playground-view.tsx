"use client";

import { usePlaygroundHook } from "../_hooks/playground-hook";
import { BoardView } from "../_components/board-view";
import { GridView } from "../_components/grid-view";
import { TaskDrawer } from "../_components/task-drawer";
import { ViewToggle } from "../_components/view-toggle";
import { PageContainer, PageHeader } from "@/components/design-system";

// Mock jobId - por el momento usamos este valor fijo
const jobId = "139ad003-8062-4cf2-8aee-354451d51798";

// TODO(playground): Este contenedor podría recibir el jobId vía props/route params.
export default function PlaygroundView() {
  const {
    jobSeekers,
    isLoading,
    draggedItem,
    viewMode,
    setViewMode,
    selectedJobSeeker,
    isDrawerOpen,
    handleJobSeekerClick,
    closeDrawer,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    getAllJobSeekersWithStatus,
    dropPreview,
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
    <PageContainer className="flex-1 min-h-0 w-full">
      <div className="flex-1 min-h-0 w-full grid grid-rows-[auto,1fr] gap-6">
        {/* Header */}
        <div className="w-full flex flex-row items-center justify-between">
          <PageHeader
            title="Applicants Pipeline"
            subtitle="Manage and track candidate applications"
          />
          {/* View Toggle */}
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Content area that fills remaining height */}
        <div className="min-h-0 h-full w-full overflow-hidden">
          {/* Board View */}
          {viewMode === "board" && (
            <div className="min-h-0 h-full w-full">
              <BoardView
                jobSeekers={jobSeekers}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onJobSeekerClick={handleJobSeekerClick}
                onDragEnd={handleDragEnd}
                dropPreview={dropPreview}
                draggedItem={draggedItem}
              />
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="min-h-0 h-full w-full">
              <GridView
                jobSeekers={getAllJobSeekersWithStatus()}
                onJobSeekerClick={handleJobSeekerClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Job Seeker Drawer */}
      <TaskDrawer
        isOpen={isDrawerOpen}
        jobSeeker={selectedJobSeeker}
        onClose={closeDrawer}
      />
    </PageContainer>
  );
}
