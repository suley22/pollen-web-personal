"use client";

export function GridRow({ task, onClick }) {
  return (
    <div
      onClick={() => onClick(task, task.status)}
      className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer items-center"
    >
      {/* Foto y Nombre con % */}
      <div className="flex flex-row gap-2 items-center">
        <div className="text-xs">foto</div>

        <div className="text-sm font-medium">Nombre</div>
      </div>
      <div className="text-sm">45%</div>

      {/* Applied */}
      <div className="text-sm">Applied</div>

      {/* SubStatus */}
      <div className="text-sm">SubStatus</div>

      {/* Status Badge */}
      <div>
        <span
          className={`${task.statusColor} text-white text-xs px-2 py-1 rounded-full`}
        >
          {task.statusLabel}
        </span>
      </div>

      {/* Botones */}
      <div className="text-sm">Botones</div>
    </div>
  );
}
