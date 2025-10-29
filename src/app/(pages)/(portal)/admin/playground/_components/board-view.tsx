"use client";

import { TASK_COLUMNS } from "../_services/playground-service";
import TaskCard from "./task-card";

export function BoardView({
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  onTaskClick,
}) {
  return (
    <div className="flex gap-4 w-full overflow-x-auto">
      {TASK_COLUMNS.map((column) => (
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
                ({tasks[column.id]?.length || 0})
              </span>
            </h2>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column.id)}
            className="flex-1 bg-gray-50 rounded-lg p-3 min-h-[400px] border-2 border-dashed border-gray-200"
          >
            <div className="flex flex-col gap-2">
              {tasks[column.id]?.map((task, index) => (
                <TaskCard
                  key={`${task.id}-${index}`}
                  task={task}
                  columnId={column.id}
                  onDragStart={onDragStart}
                  onClick={onTaskClick}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
