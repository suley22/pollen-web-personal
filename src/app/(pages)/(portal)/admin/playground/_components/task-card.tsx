"use client";

interface TaskCardProps {
  task: {
    id: string;
    content: string;
  };
  columnId: string;
  onDragStart: (e: React.DragEvent, task: any, columnId: string) => void;
  onClick: (task: any, columnId: string) => void;
}

export function TaskCard({
  task,
  columnId,
  onDragStart,
  onClick,
}: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task, columnId)}
      onClick={() => onClick(task, columnId)}
      className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <p className="text-sm">{task.content}</p>
    </div>
  );
}
