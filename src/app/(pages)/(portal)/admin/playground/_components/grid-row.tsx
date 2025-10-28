"use client";

interface GridRowProps {
  task: {
    id: string;
    content: string;
    status: string;
    statusLabel: string;
    statusColor: string;
  };
  onClick: (task: any, status: string) => void;
}

export function GridRow({ task, onClick }: GridRowProps) {
  return (
    <div
      onClick={() => onClick(task, task.status)}
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
  );
}
