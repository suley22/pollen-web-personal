"use client";

import { GridRow } from "./grid-row";

export function GridView({ tasks, onTaskClick }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 border-b border-gray-200 font-semibold text-sm">
          <div>Content</div>
          <div>Status</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <GridRow key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
