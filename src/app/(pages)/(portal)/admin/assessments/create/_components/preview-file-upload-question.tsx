"use client";

import { FormCard, PrimaryButton } from "@/components/design-system";
import { HelpCircle, Upload, Trash, CheckCircle } from "lucide-react";
import type { AssessmentQuestion } from "@/types/assessment-question";

interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

interface PreviewFileUploadQuestionProps {
  question: AssessmentQuestion;
  questionNumber: number;
  uploadedFile: UploadedFile | null | undefined;
  isSubmitted: boolean;
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
  onSubmit: () => void;
  onEdit: () => void;
  onError: (title: string, message: string) => void;
}

export function PreviewFileUploadQuestion({
  question,
  questionNumber,
  uploadedFile,
  isSubmitted,
  onFileUpload,
  onRemoveFile,
  onSubmit,
  onEdit,
  onError,
}: PreviewFileUploadQuestionProps) {
  const MAX_FILE_SIZE_MB = question.max_file_size || 10;
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <FormCard title={question.title} icon={<HelpCircle className="h-5 w-5" />}>
      <div className="flex flex-col gap-4">
        {/* Question Description */}
        {question.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {question.description}
          </p>
        )}

        {/* File Upload Area */}
        {!isSubmitted && (
          <div className="space-y-3">
            <label
              htmlFor={`file_upload_${questionNumber}`}
              className="block cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Click to upload a file
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Maximum file size: {MAX_FILE_SIZE_MB}MB
                  </p>
                  {question.accepted_file_types &&
                    question.accepted_file_types.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Accepted: {question.accepted_file_types.join(", ")}
                      </p>
                    )}
                </div>
              </div>
              <input
                type="file"
                id={`file_upload_${questionNumber}`}
                className="hidden"
                accept={question.accepted_file_types?.join(",")}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    if (file.size > MAX_FILE_SIZE) {
                      onError(
                        "File Too Large",
                        `The file size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`,
                      );
                      e.target.value = "";
                      return;
                    }
                    onFileUpload(file);
                    e.target.value = "";
                  }
                }}
              />
            </label>

            {/* Uploaded File */}
            {uploadedFile && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Selected File:
                </p>
                <div className="py-3 px-5 flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(uploadedFile.size)}
                    </p>
                  </div>
                  <button
                    onClick={onRemoveFile}
                    className="hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex-shrink-0"
                    title="Remove file"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submitted File (Read-only) */}
        {isSubmitted && uploadedFile && (
          <div className="space-y-2">
            <div className="py-3 px-5 flex items-center gap-4 rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            </div>
          </div>
        )}

        {/* Submit/Edit Button */}
        <div className="flex justify-end">
          {isSubmitted ? (
            <PrimaryButton
              text="Edit Answer"
              onClick={onEdit}
              style="outline"
              className="w-full sm:w-auto"
            />
          ) : (
            <PrimaryButton
              text="Check Answer"
              onClick={onSubmit}
              disabled={!uploadedFile || uploadedFile === null}
              className="w-full sm:w-auto"
            />
          )}
        </div>
      </div>
    </FormCard>
  );
}
