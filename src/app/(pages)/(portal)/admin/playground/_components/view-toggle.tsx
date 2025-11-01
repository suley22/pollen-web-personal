"use client";

import { LayoutGrid, Columns3 } from "lucide-react";

// TODO(playground):
// - Convertir en un ToggleGroup del design-system para estilos/estados consistentes.
// - Añadir aria-pressed y labels accesibles.
export function ViewToggle({ viewMode, onViewModeChange }) {
  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onViewModeChange("board")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          viewMode === "board" ? "bg-white shadow-sm" : "hover:bg-gray-200"
        }`}
      >
        <Columns3 className="w-4 h-4" />
        <span className="text-sm font-medium">Board</span>
      </button>
      <button
        onClick={() => onViewModeChange("grid")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="text-sm font-medium">Grid</span>
      </button>
    </div>
  );
}
