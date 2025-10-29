"use client";

export function TaskCard({ task, columnId, onDragStart, onClick }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task, columnId)}
      onClick={() => onClick(task, columnId)}
      className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row gap-2">
          <div>foto</div>
          <div className="flex flex-col">
            <div>Nombre</div>
            <div>45%</div>
          </div>
        </div>
        <div>Applied</div>
        <div>SubStatus</div>
        <div>Botones</div>
      </div>
    </div>
  );
}
