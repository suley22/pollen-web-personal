"use client";

import { useState, useMemo } from "react";
import { AssessmentQuestionCard } from "../../_components/assessment-question-card";
import { AssessmentProgress } from "../../_components/assessment-progress";
import {
  PageHeader,
  InfoCard,
  Divider,
  WarningBadge,
  FormCard,
  TextareaInput,
  PrimaryButton,
  SecondaryButton,
} from "@/components/design-system";
import { QuestionActionButtons } from "./question-action-buttons";
import { HelpCircle, Download, Upload, Trash, CheckCircle } from "lucide-react";
import type { AssessmentQuestion } from "@/types/assessment-question";
import type { AssessmentCategory } from "@/types/assessment-types";
import { useToastNotifications } from "@/hooks/useToastNotifications";

interface AssessmentCreateUnifiedPreviewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  questions: AssessmentQuestion[];
  categories?: AssessmentCategory[];
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

export function AssessmentCreateUnifiedPreview({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  questions,
  categories = [],
  isEditMode = false,
  onMoveQuestionUp,
  onMoveQuestionDown,
  onEditQuestion,
  onRemoveQuestion,
}: AssessmentCreateUnifiedPreviewProps) {
  const { showError } = useToastNotifications();

  // Estado para Multiple Choice questions
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<
    Record<string, string>
  >({});

  // Estado para Free Input questions
  const [freeInputAnswers, setFreeInputAnswers] = useState<
    Record<number, string>
  >({});
  const [freeInputSubmitted, setFreeInputSubmitted] = useState<Set<number>>(
    new Set(),
  );

  // Estado para File Upload questions
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, UploadedFile | null>
  >({});
  const [fileUploadSubmitted, setFileUploadSubmitted] = useState<Set<number>>(
    new Set(),
  );

  // Maximum file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILE_SIZE_MB = 10;

  // Handlers para Multiple Choice
  const handleMultipleChoiceChange = (
    questionId: string,
    optionValue: string,
  ) => {
    setMultipleChoiceAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  // Handlers para Free Input
  const handleFreeInputChange = (index: number, value: string) => {
    setFreeInputAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleFreeInputSubmit = (index: number) => {
    if (freeInputAnswers[index]?.trim()) {
      setFreeInputSubmitted((prev) => new Set(prev).add(index));
    }
  };

  const handleFreeInputEdit = (index: number) => {
    setFreeInputSubmitted((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  // Handlers para File Upload
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

  const handleFileUploadSubmit = (index: number) => {
    const hasFile =
      uploadedFiles[index] !== null && uploadedFiles[index] !== undefined;
    if (hasFile) {
      setFileUploadSubmitted((prev) => new Set(prev).add(index));
    }
  };

  const handleFileUploadEdit = (index: number) => {
    setFileUploadSubmitted((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  // Calculate progress
  const getAnsweredCount = () => {
    return (
      Object.keys(multipleChoiceAnswers).length +
      freeInputSubmitted.size +
      fileUploadSubmitted.size
    );
  };

  const getPercentage = () => {
    const total = questions.length;
    if (total === 0) return 0;
    return Math.round((getAnsweredCount() / total) * 100);
  };

  // Calculate category breakdown (only for multiple choice questions)
  const categoryBreakdown = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    let totalAnswered = 0;

    Object.entries(multipleChoiceAnswers).forEach(
      ([questionId, optionValue]) => {
        const questionIndex = parseInt(questionId.split("-")[1]);
        const question = questions[questionIndex];

        if (question?.type === "multiple_choice" && question.options) {
          const selectedOption = question.options.find(
            (opt) => opt.value === optionValue,
          );
          if (selectedOption?.categoryId) {
            categoryCounts.set(
              selectedOption.categoryId,
              (categoryCounts.get(selectedOption.categoryId) || 0) + 1,
            );
            totalAnswered++;
          }
        }
      },
    );

    return categories
      .map((category) => {
        const count = categoryCounts.get(category.id) || 0;
        const percentage =
          totalAnswered > 0 ? Math.round((count / totalAnswered) * 100) : 0;
        return {
          ...category,
          count,
          percentage,
        };
      })
      .filter((cat) => cat.count > 0);
  }, [multipleChoiceAnswers, questions, categories]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Divider />

      <WarningBadge className="h-8 justify-center">
        This is a preview of the assessment. In edit mode, answers cannot be
        submitted.
      </WarningBadge>

      <Divider />

      <PageHeader title={assessmentTitle} subtitle={assessmentDescription} />

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
            const questionId = `q-${index}`;

            return (
              <div key={index} className="relative">
                {/* Multiple Choice Question */}
                {question.type === "multiple_choice" && (
                  <AssessmentQuestionCard
                    question={{
                      id: questionId,
                      type: "multiple_choice",
                      title: question.title,
                      description: question.description,
                      options_title: question.options_title || "",
                      options: question.options || [],
                    }}
                    questionNumber={index + 1}
                    selectedValue={multipleChoiceAnswers[questionId]}
                    onAnswerChange={handleMultipleChoiceChange}
                  />
                )}

                {/* Free Input Question */}
                {question.type === "free_input" && (
                  <FormCard
                    title={question.title}
                    icon={<HelpCircle className="h-5 w-5" />}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Question Description */}
                      {question.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {question.description}
                        </p>
                      )}

                      {/* Answer Textarea */}
                      <TextareaInput
                        label=""
                        name={`question_${index}_answer`}
                        id={`question_${index}_answer`}
                        placeholder="Type your answer here..."
                        value={freeInputAnswers[index] || ""}
                        onChange={(e) =>
                          handleFreeInputChange(index, e.target.value)
                        }
                        rows={5}
                        maxLength={question.max_characters || 1000}
                        showCharacterCount={true}
                        disabled={freeInputSubmitted.has(index)}
                      />

                      {/* Submit/Edit Button */}
                      <div className="flex justify-end">
                        {freeInputSubmitted.has(index) ? (
                          <SecondaryButton
                            text="Edit Answer"
                            icon={<CheckCircle />}
                            onClick={() => handleFreeInputEdit(index)}
                            className="w-full sm:w-auto"
                          />
                        ) : (
                          <PrimaryButton
                            text="Check Answer"
                            onClick={() => handleFreeInputSubmit(index)}
                            disabled={!freeInputAnswers[index]?.trim()}
                            className="w-full sm:w-auto"
                          />
                        )}
                      </div>
                    </div>
                  </FormCard>
                )}

                {/* File Upload Question */}
                {question.type === "file_upload" && (
                  <FormCard
                    title={question.title}
                    icon={<HelpCircle className="h-5 w-5" />}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Question Description */}
                      {question.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {question.description}
                        </p>
                      )}

                      {/* File Upload Area */}
                      {!fileUploadSubmitted.has(index) && (
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
                                  Maximum file size:{" "}
                                  {question.max_file_size || MAX_FILE_SIZE_MB}MB
                                </p>
                                {question.accepted_file_types &&
                                  question.accepted_file_types.length > 0 && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      Accepted:{" "}
                                      {question.accepted_file_types.join(", ")}
                                    </p>
                                  )}
                              </div>
                            </div>
                            <input
                              type="file"
                              id={`file_upload_${index}`}
                              className="hidden"
                              accept={question.accepted_file_types?.join(",")}
                              onChange={(e) => {
                                if (
                                  e.target.files &&
                                  e.target.files.length > 0
                                ) {
                                  const file = e.target.files[0];
                                  const maxSize =
                                    (question.max_file_size ||
                                      MAX_FILE_SIZE_MB) *
                                    1024 *
                                    1024;
                                  if (file.size > maxSize) {
                                    showError(
                                      "File Too Large",
                                      `The file size exceeds the maximum limit of ${question.max_file_size || MAX_FILE_SIZE_MB}MB. Please select a smaller file.`,
                                    );
                                    e.target.value = "";
                                    return;
                                  }
                                  handleFileUpload(index, file);
                                  e.target.value = "";
                                }
                              }}
                            />
                          </label>

                          {/* Uploaded File */}
                          {uploadedFiles[index] && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Selected File:
                              </p>
                              <div className="py-3 px-5 flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {uploadedFiles[index]!.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatFileSize(uploadedFiles[index]!.size)}
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleRemoveFile(index)}
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
                      {fileUploadSubmitted.has(index) &&
                        uploadedFiles[index] && (
                          <div className="space-y-2">
                            <div className="py-3 px-5 flex items-center gap-4 rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {uploadedFiles[index]!.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatFileSize(uploadedFiles[index]!.size)}
                                </p>
                              </div>
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            </div>
                          </div>
                        )}

                      {/* Submit/Edit Button */}
                      <div className="flex justify-end">
                        {fileUploadSubmitted.has(index) ? (
                          <PrimaryButton
                            text="Edit Answer"
                            onClick={() => handleFileUploadEdit(index)}
                            style="outline"
                            className="w-full sm:w-auto"
                          />
                        ) : (
                          <PrimaryButton
                            text="Check Answer"
                            onClick={() => handleFileUploadSubmit(index)}
                            disabled={
                              !uploadedFiles[index] ||
                              uploadedFiles[index] === null
                            }
                            className="w-full sm:w-auto"
                          />
                        )}
                      </div>
                    </div>
                  </FormCard>
                )}

                {/* Action Buttons - Only in Edit Mode */}
                {isEditMode && (
                  <QuestionActionButtons
                    index={index}
                    totalQuestions={questions.length}
                    onMoveUp={onMoveQuestionUp!}
                    onMoveDown={onMoveQuestionDown!}
                    onEdit={onEditQuestion!}
                    onRemove={onRemoveQuestion!}
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

          {/* Category Breakdown */}
          {categoryBreakdown.length > 0 && (
            <div className="space-y-3">
              {categoryBreakdown.map((category) => (
                <div
                  key={category.id}
                  className="rounded-lg p-4 border-2"
                  style={{
                    borderColor: category.color,
                    backgroundColor: `${category.color}10`,
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: category.color }}
                  >
                    {category.percentage}%
                  </div>
                  <div className="font-semibold text-gray-900">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {category.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
