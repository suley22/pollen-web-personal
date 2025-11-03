"use client";

import { ListChecks, FileText, Upload } from "lucide-react";
import type { QuestionType } from "@/types/assessment-question";

interface AddQuestionButtonProps {
  onSelectType: (type: QuestionType) => void;
  disabled?: boolean;
}

export function AddQuestionButton({
  onSelectType,
  disabled = false,
}: AddQuestionButtonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Multiple Choice Button */}
      <button
        onClick={() => onSelectType("multiple_choice")}
        disabled={disabled}
        className="p-6 rounded-lg border-2 transition-all border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <ListChecks className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Multiple Choice</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Question with predefined options
            </p>
          </div>
        </div>
      </button>

      {/* Free Input Button */}
      <button
        onClick={() => onSelectType("free_input")}
        disabled={disabled}
        className="p-6 rounded-lg border-2 transition-all border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Free Input</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Open-ended text response
            </p>
          </div>
        </div>
      </button>

      {/* File Upload Button */}
      <button
        onClick={() => onSelectType("file_upload")}
        disabled={disabled}
        className="p-6 rounded-lg border-2 transition-all border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <Upload className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">File Upload</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload documents or files
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
