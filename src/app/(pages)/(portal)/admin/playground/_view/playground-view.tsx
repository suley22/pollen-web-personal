"use client";

import { usePlaygroundHook } from "../_hooks/playground-hook";
import { BoardView } from "../_components/board-view";
import { GridView } from "../_components/grid-view";
import { TaskDrawer } from "../_components/task-drawer";
import { ViewToggle } from "../_components/view-toggle";

interface PlaygroundViewProps {
  jobId: string;
}

export default function PlaygroundView({ jobId }: PlaygroundViewProps) {
  const {
    tasks,
    isLoading,
    viewMode,
    setViewMode,
    selectedTask,
    isDrawerOpen,
    handleTaskClick,
    closeDrawer,
    handleDragStart,
    handleDragOver,
    handleDrop,
    getAllTasksWithStatus,
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
          tasks={tasks}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onTaskClick={handleTaskClick}
        />
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <GridView
          tasks={getAllTasksWithStatus()}
          onTaskClick={handleTaskClick}
        />
      )}

      {/* Task Drawer */}
      <TaskDrawer
        isOpen={isDrawerOpen}
        task={selectedTask}
        onClose={closeDrawer}
      />
    </div>
  );
}
