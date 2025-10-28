"use client";

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
            <div
              key={task.id}
              onClick={() => onTaskClick(task, task.status)}
              className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="text-sm">{task.content}</div>
              <div>
                <span
                  className={`${task.statusColor} text-white text-xs px-2 py-1 rounded-full`}
                >
                  {task.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
