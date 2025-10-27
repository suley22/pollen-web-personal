"use client";

import { useState } from "react";
import {
  FormCard,
  InfoCard,
  PageHeader,
  WarningBadge,
  Divider,
  PrimaryButton,
} from "@/components/design-system";
import { QuestionActionButtons } from "./question-action-buttons";
import { AssessmentProgress } from "../../test/_components/assessment-progress";
import { HelpCircle, Download, Upload, X } from "lucide-react";
import type { FileUploadQuestion } from "../_hooks/assessment-create-file-upload-hook";

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
  // Estado para los archivos subidos por el job seeker (preview)
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, UploadedFile[]>
  >({});

  // Estado para las preguntas marcadas como completadas
  const [submittedAnswers, setSubmittedAnswers] = useState<Set<number>>(
    new Set(),
  );

  const handleFileUpload = (
    questionIndex: number,
    files: FileList,
    allowMultiple: boolean,
  ) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      file,
    }));

    setUploadedFiles((prev) => {
      if (allowMultiple) {
        return {
          ...prev,
          [questionIndex]: [...(prev[questionIndex] || []), ...newFiles],
        };
      } else {
        return {
          ...prev,
          [questionIndex]: [newFiles[0]],
        };
      }
    });
  };

  const handleRemoveFile = (questionIndex: number, fileIndex: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [questionIndex]: prev[questionIndex].filter((_, i) => i !== fileIndex),
    }));
  };

  const handleSubmitAnswer = (index: number) => {
    const hasFiles = uploadedFiles[index] && uploadedFiles[index].length > 0;
    if (hasFiles) {
      setSubmittedAnswers((prev) => new Set(prev).add(index));
    }
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

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Divider />

      <WarningBadge className="h-8 justify-center">
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
            const questionFiles = uploadedFiles[index] || [];
            const hasFiles = questionFiles.length > 0;

            return (
              <FormCard
                key={index}
                title={`Question ${index + 1}: ${question.title}`}
                icon={<HelpCircle className="h-5 w-5" />}
              >
                {/* Action Buttons */}
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

                <div className="flex flex-col gap-4">
                  {/* Question Subtitle */}
                  {question.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {question.subtitle}
                    </p>
                  )}

                  {/* Reference Files - Download Links */}
                  {question.referenceFiles.length > 0 && (
                    <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 space-y-2">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Reference Materials:
                      </p>
                      {question.referenceFiles.map((refFile) => (
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
                  )}

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
                              Click to upload{" "}
                              {question.allowMultipleUploads
                                ? "files"
                                : "a file"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {question.allowMultipleUploads
                                ? "You can select multiple files"
                                : "Select one file to upload"}
                            </p>
                          </div>
                        </div>
                        <input
                          type="file"
                          id={`file_upload_${index}`}
                          className="hidden"
                          multiple={question.allowMultipleUploads}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleFileUpload(
                                index,
                                e.target.files,
                                question.allowMultipleUploads,
                              );
                              e.target.value = ""; // Reset input
                            }
                          }}
                        />
                      </label>

                      {/* Uploaded Files List */}
                      {questionFiles.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Selected Files:
                          </p>
                          {questionFiles.map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className="flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3"
                            >
                              <Upload className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  handleRemoveFile(index, fileIndex)
                                }
                                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex-shrink-0"
                                title="Remove file"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submitted Files (Read-only) */}
                  {isSubmitted && questionFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        ✓ Submitted Files:
                      </p>
                      {questionFiles.map((file, fileIndex) => (
                        <div
                          key={fileIndex}
                          className="flex items-center gap-3 rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-3"
                        >
                          <Upload className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Submit/Edit Button */}
                  <div className="flex justify-end">
                    {isSubmitted ? (
                      <PrimaryButton
                        text="Edit Files"
                        onClick={() => handleEditAnswer(index)}
                        className="w-full sm:w-auto"
                      />
                    ) : (
                      <PrimaryButton
                        text="Submit Files"
                        onClick={() => handleSubmitAnswer(index)}
                        disabled={!hasFiles}
                        className="w-full sm:w-auto"
                      />
                    )}
                  </div>
                </div>
              </FormCard>
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
    </div>
  );
}
