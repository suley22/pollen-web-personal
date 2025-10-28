"use client";

import { useState } from "react";
import { LayoutGrid, Columns3, X } from "lucide-react";

const INITIAL_DATA = {
  new: [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
    { id: "3", content: "Task 3" },
  ],
  inProgress: [
    { id: "4", content: "Task 4" },
    { id: "5", content: "Task 5" },
  ],
  matchedToEmployer: [{ id: "6", content: "Task 6" }],
  complete: [{ id: "7", content: "Task 7" }],
};

const COLUMNS = [
  {
    id: "new",
    title: "New",
    color: "bg-slate-100",
    badgeColor: "bg-slate-500",
  },
  {
    id: "inProgress",
    title: "In Progress",
    color: "bg-blue-100",
    badgeColor: "bg-blue-500",
  },
  {
    id: "matchedToEmployer",
    title: "Matched to Employer",
    color: "bg-purple-100",
    badgeColor: "bg-purple-500",
  },
  {
    id: "complete",
    title: "Complete",
    color: "bg-green-100",
    badgeColor: "bg-green-500",
  },
];

export default function PlaygroundPage() {
  const [tasks, setTasks] = useState(INITIAL_DATA);
  const [draggedItem, setDraggedItem] = useState(null);
  const [viewMode, setViewMode] = useState("board"); // "board" or "grid"
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTaskClick = (task, status) => {
    const statusInfo = COLUMNS.find((col) => col.id === status);
    setSelectedTask({
      ...task,
      status: status,
      statusLabel: statusInfo?.title || "",
      statusColor: statusInfo?.badgeColor || "",
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTask(null), 300); // Wait for animation
  };

  const handleDragStart = (e, item, columnId) => {
    setDraggedItem({ item, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { item, sourceColumn } = draggedItem;

    if (sourceColumn === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    setTasks((prev) => {
      const newTasks = { ...prev };

      // Remove from source column
      newTasks[sourceColumn] = newTasks[sourceColumn].filter(
        (task) => task.id !== item.id,
      );

      // Add to target column
      newTasks[targetColumnId] = [...newTasks[targetColumnId], item];

      return newTasks;
    });

    setDraggedItem(null);
  };

  // Get all tasks with their status
  const getAllTasksWithStatus = () => {
    const allTasks = [];
    COLUMNS.forEach((column) => {
      tasks[column.id].forEach((task) => {
        allTasks.push({
          ...task,
          status: column.id,
          statusLabel: column.title,
          statusColor: column.badgeColor,
        });
      });
    });
    return allTasks;
  };

  const getStatusBadge = (statusColor, statusLabel) => {
    return (
      <span
        className={`${statusColor} text-white text-xs px-2 py-1 rounded-full`}
      >
        {statusLabel}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col py-6 gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Playground</h1>
            <p className="text-muted-foreground">
              Kanban Board - Drag & Drop Demo
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("board")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === "board"
                  ? "bg-white shadow-sm"
                  : "hover:bg-gray-200"
              }`}
            >
              <Columns3 className="w-4 h-4" />
              <span className="text-sm font-medium">Board</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-medium">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Board View */}
      {viewMode === "board" && (
        <div className="flex gap-4 w-full overflow-x-auto">
          {COLUMNS.map((column) => (
            <div
              key={column.id}
              className="flex-1 min-w-[280px] flex flex-col gap-3"
            >
              {/* Column Header */}
              <div
                className={`${column.color} rounded-lg p-3 border border-gray-200`}
              >
                <h2 className="font-semibold text-sm">
                  {column.title}
                  <span className="ml-2 text-xs text-gray-600">
                    ({tasks[column.id].length})
                  </span>
                </h2>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
                className="flex-1 bg-gray-50 rounded-lg p-3 min-h-[400px] border-2 border-dashed border-gray-200"
              >
                <div className="flex flex-col gap-2">
                  {tasks[column.id].map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, column.id)}
                      onClick={() => handleTaskClick(task, column.id)}
                      className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <p className="text-sm">{task.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="w-full">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 border-b border-gray-200 font-semibold text-sm">
              <div>Content</div>
              <div>Status</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {getAllTasksWithStatus().map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleTaskClick(task, task.status)}
                  className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="text-sm">{task.content}</div>
                  <div>
                    {getStatusBadge(task.statusColor, task.statusLabel)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Side Drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Task Details</h2>
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {selectedTask && (
                  <div className="flex flex-col gap-6">
                    {/* Task Title */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Title
                      </label>
                      <p className="mt-2 text-lg font-medium">
                        {selectedTask.content}
                      </p>
                    </div>

                    {/* Task ID */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Task ID
                      </label>
                      <p className="mt-2 text-gray-700">{selectedTask.id}</p>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Status
                      </label>
                      <div className="mt-2">
                        {getStatusBadge(
                          selectedTask.statusColor,
                          selectedTask.statusLabel,
                        )}
                      </div>
                    </div>

                    {/* Placeholder for future fields */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 italic">
                        More details will be added here in the future...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer (optional) */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={closeDrawer}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
