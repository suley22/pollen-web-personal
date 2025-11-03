"use client";

import { useState } from "react";
import { FormCard, PrimaryButton } from "@/components/design-system";
import {
  HelpCircle,
  Upload,
  Trash,
  CheckCircle,
  Link as LinkIcon,
  Paperclip,
} from "lucide-react";
import type { AssessmentQuestion } from "@/types/assessment-question";
import { FileViewerDialog } from "@/components/design-system";

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
  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    fileName: string;
    file?: File | null;
  } | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleViewFile = (file: {
    name: string;
    fileName: string;
    file?: File | null;
  }) => {
    setSelectedFile(file);
    setViewerOpen(true);
  };

  // Support both old and new question formats
  const referenceFiles = (question as any).file_upload?.referenceFiles || [];

  return (
    <FormCard title={question.title} icon={<HelpCircle className="h-5 w-5" />}>
      <div className="flex flex-col gap-4">
        {/* Question Description/Subtitle */}
        {question.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {question.description}
          </p>
        )}

        {/* Reference Files */}
        {referenceFiles.length > 0 && (
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Reference Files
              </p>
            </div>
            <div className="space-y-2">
              {referenceFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-2 text-sm">
                  <LinkIcon className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <button
                    onClick={() => handleViewFile(file)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline text-left truncate"
                  >
                    {file.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
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
                </div>
              </div>
              <input
                type="file"
                id={`file_upload_${questionNumber}`}
                className="hidden"
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
                  <button
                    onClick={() =>
                      handleViewFile({
                        name: uploadedFile.name,
                        fileName: uploadedFile.name,
                        file: uploadedFile.file,
                      })
                    }
                    className="flex-1 min-w-0 text-left group"
                  >
                    <p className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(uploadedFile.size)} • Click to preview
                    </p>
                  </button>
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
              <button
                onClick={() =>
                  handleViewFile({
                    name: uploadedFile.name,
                    fileName: uploadedFile.name,
                    file: uploadedFile.file,
                  })
                }
                className="flex-1 min-w-0 text-left group"
              >
                <p className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(uploadedFile.size)} • Click to preview
                </p>
              </button>
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

      {/* File Viewer Dialog */}
      <FileViewerDialog
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        file={selectedFile}
      />
    </FormCard>
  );
}
