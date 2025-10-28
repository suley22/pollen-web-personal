"use client";

import { ChevronUp, ChevronDown, Trash2, Pencil } from "lucide-react";

interface QuestionActionButtonsProps {
  index: number;
  totalQuestions: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export function QuestionActionButtons({
  index,
  totalQuestions,
  onMoveUp,
  onMoveDown,
  onEdit,
  onRemove,
}: QuestionActionButtonsProps) {
  return (
    <div className="absolute top-3 right-4 flex flex-row gap-1 bg-white rounded border shadow-sm p-1">
      <button
        onClick={() => onMoveUp(index)}
        disabled={index === 0}
        className={`p-2 rounded transition-colors ${
          index === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-50 text-gray-700"
        }`}
        title="Move up"
      >
        <ChevronUp className="h-4 w-4" />
      </button>

      <button
        onClick={() => onMoveDown(index)}
        disabled={index === totalQuestions - 1}
        className={`p-2 rounded transition-colors ${
          index === totalQuestions - 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-50 text-gray-700"
        }`}
        title="Move down"
      >
        <ChevronDown className="h-4 w-4" />
      </button>

      <button
        onClick={() => onEdit(index)}
        className="p-2 rounded bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
        title="Edit question"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        onClick={() => onRemove(index)}
        className="p-2 rounded bg-white hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
        title="Remove question"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
