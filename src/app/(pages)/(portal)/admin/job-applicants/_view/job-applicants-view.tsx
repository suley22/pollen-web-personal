"use client";

import { useJobApplicantsHook } from "../_hooks/job-applicants-hook";
import { BoardView } from "../_components/job-applicants-board-view";
import { GridView } from "../_components/job-applicants-grid-view";
import { TaskDrawer } from "../_components/job-applicants-js-drawer";
import { ViewToggle } from "../_components/job-applicants-view-toggle";
import { PageContainer, PageHeader } from "@/components/design-system";

interface JobApplicantsViewProps {
  jobId?: string | null;
}

export default function JobApplicantsView({
  jobId = null,
}: JobApplicantsViewProps) {
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
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    dragPreview,
    draggedItem,
    getAllJobSeekersWithStatus,
    isUpdatingStatus,
  } = useJobApplicantsHook(jobId);

  // Handle no jobId case
  if (!jobId) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-500 text-sm">No job ID provided</p>
          <p className="text-xs text-gray-400">
            Please select a job to view applicants
          </p>
        </div>
      </div>
    );
  }

  // Handle loading state
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

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Loading indicator for mutations */}
            {isUpdatingStatus && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Updating...</span>
              </div>
            )}

            {/* View Toggle */}
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
        </div>

        {/* Content area that fills remaining height */}
        <div className="min-h-0 h-full w-full overflow-hidden">
          {/* Board View */}
          {viewMode === "board" && (
            <div className="min-h-0 h-full w-full">
              <BoardView
                jobSeekers={jobSeekers}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onJobSeekerClick={handleJobSeekerClick}
                dragPreview={dragPreview}
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
