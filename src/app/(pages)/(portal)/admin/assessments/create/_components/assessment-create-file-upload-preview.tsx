"use client";

import { useState } from "react";
import {
  FormCard,
  InfoCard,
  PageHeader,
  WarningBadge,
  Divider,
  PrimaryButton,
  FileViewerDialog,
} from "@/components/design-system";
import { QuestionActionButtons } from "./question-action-buttons";
import { AssessmentProgress } from "../../_components/assessment-progress";
import {
  HelpCircle,
  Download,
  Upload,
  X,
  Check,
  CheckCircle,
  Trash,
} from "lucide-react";
import type { FileUploadQuestion } from "../_hooks/assessment-create-file-upload-hook";
import { useToastNotifications } from "@/hooks/useToastNotifications";

interface AssessmentCreateFileUploadPreviewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  questions: FileUploadQuestion[];
  isEditMode?: boolean;
  onMoveQuestionUp?: (index: number) => void;
  onMoveQuestionDown?: (index: number) => void;
  onEditQuestion?: (index: number) => void;
  onRemoveQuestion?: (index: number) => void;
}

interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

export function AssessmentCreateFileUploadPreview({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  questions,
  isEditMode = false,
  onMoveQuestionUp,
  onMoveQuestionDown,
  onEditQuestion,
  onRemoveQuestion,
}: AssessmentCreateFileUploadPreviewProps) {
  const { showError } = useToastNotifications();

  // Estado para los archivos subidos por el job seeker (preview)
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, UploadedFile | null>
  >({});

  // Estado para las preguntas marcadas como completadas
  const [submittedAnswers, setSubmittedAnswers] = useState<Set<number>>(
    new Set(),
  );

  // Estado para el visor de archivos
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    fileName: string;
    file?: File | null;
  } | null>(null);

  const handleFileUpload = (questionIndex: number, file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      file,
    };

    setUploadedFiles((prev) => ({
      ...prev,
      [questionIndex]: newFile,
    }));
  };

  const handleRemoveFile = (questionIndex: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [questionIndex]: null,
    }));
  };

  const handleSubmitAnswer = (index: number) => {
    const hasFile =
      uploadedFiles[index] !== null && uploadedFiles[index] !== undefined;
    if (hasFile) {
      setSubmittedAnswers((prev) => new Set(prev).add(index));
    }
  };

  const handleViewFile = (file: {
    name: string;
    fileName: string;
    file?: File | null;
  }) => {
    setSelectedFile(file);
    setViewerOpen(true);
  };

  const handleEditAnswer = (index: number) => {
    setSubmittedAnswers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const getAnsweredCount = () => {
    return submittedAnswers.size;
  };

  const getPercentage = () => {
    const total = questions.length;
    if (total === 0) return 0;
    return Math.round((getAnsweredCount() / total) * 100);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  // Maximum file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const MAX_FILE_SIZE_MB = 10;

  if (questions.length === 0) {
    return null;
  }

  return (
    <div id="file-upload-preview-section" className="flex flex-col gap-6">
      <Divider />

      <WarningBadge className="h-8 justify-center text-sm">
        This is a preview of the file upload assessment. In edit mode, files are
        not actually uploaded.
      </WarningBadge>

      <Divider />

      <PageHeader
        title={assessmentTitle}
        subtitle={assessmentDescription}
      ></PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Instructions */}
          {instructionsTitle && instructionsDescription && (
            <InfoCard
              title={instructionsTitle}
              description={instructionsDescription}
              color="blue"
            />
          )}

          {/* Questions */}
          {questions.map((question, index) => {
            const isSubmitted = submittedAnswers.has(index);
            const questionFile = uploadedFiles[index];
            const hasFile = questionFile !== null && questionFile !== undefined;

            return (
              <div key={index} className="relative">
                <FormCard
                  title={question.title}
                  icon={<HelpCircle className="h-5 w-5" />}
                >
                  <div className="flex flex-col gap-4">
                    {/* Question Subtitle */}
                    {question.subtitle && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {question.subtitle}
                      </p>
                    )}

                    {/* Reference Files - Download Links */}
                    {(() => {
                      const refFiles =
                        (question as any).file_upload?.referenceFiles ||
                        question.referenceFiles ||
                        [];
                      return (
                        refFiles.length > 0 && (
                          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 space-y-2">
                            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                              Reference Materials:
                            </p>
                            {refFiles.map((refFile: any) => (
                              <button
                                key={refFile.id}
                                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                                onClick={() => {
                                  // In production, this would download the file
                                  console.log("Download:", refFile.name);
                                }}
                              >
                                <Download className="h-4 w-4" />
                                <span>{refFile.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  ({refFile.fileName})
                                </span>
                              </button>
                            ))}
                          </div>
                        )
                      );
                    })()}

                    {/* File Upload Area */}
                    {!isSubmitted && (
                      <div className="space-y-3">
                        <label
                          htmlFor={`file_upload_${index}`}
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
                            id={`file_upload_${index}`}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files[0];
                                if (file.size > MAX_FILE_SIZE) {
                                  showError(
                                    "File Too Large",
                                    `The file size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`,
                                  );
                                  e.target.value = "";
                                  return;
                                }
                                handleFileUpload(index, file);
                                e.target.value = ""; // Reset input
                              }
                            }}
                          />
                        </label>

                        {/* Uploaded File */}
                        {questionFile && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Selected File:
                            </p>
                            <div className="py-3 px-5 flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                              <button
                                onClick={() =>
                                  handleViewFile({
                                    name: questionFile.name,
                                    fileName: questionFile.name,
                                    file: questionFile.file,
                                  })
                                }
                                className="flex-1 min-w-0 text-left group"
                              >
                                <p className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline truncate">
                                  {questionFile.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatFileSize(questionFile.size)} • Click to
                                  preview
                                </p>
                              </button>
                              <button
                                onClick={() => handleRemoveFile(index)}
                                className=" hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex-shrink-0"
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
                    {isSubmitted && questionFile && (
                      <div className="space-y-2">
                        <div className="py-3 px-5 flex items-center gap-4 rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 ">
                          <button
                            onClick={() =>
                              handleViewFile({
                                name: questionFile.name,
                                fileName: questionFile.name,
                                file: questionFile.file,
                              })
                            }
                            className="flex-1 min-w-0 text-left group"
                          >
                            <p className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline truncate">
                              {questionFile.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatFileSize(questionFile.size)} • Click to
                              preview
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
                          onClick={() => handleEditAnswer(index)}
                          style="outline"
                          className="w-full sm:w-auto"
                        />
                      ) : (
                        <PrimaryButton
                          text="Check Answer"
                          onClick={() => handleSubmitAnswer(index)}
                          disabled={!hasFile}
                          className="w-full sm:w-auto"
                        />
                      )}
                    </div>
                  </div>
                </FormCard>

                {/* Action Buttons Overlay - Only in Edit Mode */}
                {isEditMode &&
                  onMoveQuestionUp &&
                  onMoveQuestionDown &&
                  onEditQuestion &&
                  onRemoveQuestion && (
                    <QuestionActionButtons
                      index={index}
                      totalQuestions={questions.length}
                      onMoveUp={onMoveQuestionUp}
                      onMoveDown={onMoveQuestionDown}
                      onEdit={onEditQuestion}
                      onRemove={onRemoveQuestion}
                    />
                  )}
              </div>
            );
          })}
        </div>

        {/* Progress Sidebar - 1/3 width */}
        <div className="space-y-6">
          <AssessmentProgress
            answeredCount={getAnsweredCount()}
            totalCount={questions.length}
            percentage={getPercentage()}
          />
        </div>
      </div>

      {/* File Viewer Dialog */}
      <FileViewerDialog
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        file={selectedFile}
      />
    </div>
  );
}
