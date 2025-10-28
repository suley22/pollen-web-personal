"use client";

import { useState } from "react";
import {
  FormCard,
  Input,
  TextareaInput,
  PrimaryButton,
} from "@/components/design-system";
import { FileUp, X, Edit2, Link as LinkIcon, HelpCircle } from "lucide-react";
import type { ReferenceFile } from "../_hooks/assessment-create-file-upload-hook";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { QuestionActionButtons } from "./question-action-buttons";

interface AssessmentCreateFileUploadQuestionsProps {
  questionTitle: string;
  setQuestionTitle: (value: string) => void;
  questionSubtitle: string;
  setQuestionSubtitle: (value: string) => void;
  referenceFiles: ReferenceFile[];
  editingQuestionIndex: number | null;
  questions: Array<{
    title: string;
    subtitle: string;
    referenceFiles: ReferenceFile[];
  }>;
  onAddReferenceFile: (name: string, file: File) => void;
  onRemoveReferenceFile: (id: string) => void;
  onUpdateReferenceFileName: (id: string, newName: string) => void;
  onAddQuestion: () => void;
  onCancelEdit: () => void;
  onEditQuestion: (index: number) => void;
  onRemoveQuestion: (index: number) => void;
  onMoveQuestionUp: (index: number) => void;
  onMoveQuestionDown: (index: number) => void;
}

export function AssessmentCreateFileUploadQuestions({
  questionTitle,
  setQuestionTitle,
  questionSubtitle,
  setQuestionSubtitle,
  referenceFiles,
  editingQuestionIndex,
  questions,
  onAddReferenceFile,
  onRemoveReferenceFile,
  onUpdateReferenceFileName,
  onAddQuestion,
  onCancelEdit,
  onEditQuestion,
  onRemoveQuestion,
  onMoveQuestionUp,
  onMoveQuestionDown,
}: AssessmentCreateFileUploadQuestionsProps) {
  const { showError } = useToastNotifications();
  const [newFileName, setNewFileName] = useState("");
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState("");

  // Maximum file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILE_SIZE_MB = 10;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      showError(
        "File Too Large",
        `The file size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`,
      );
      e.target.value = "";
      return;
    }

    // Use the file name without extension as default display name
    const defaultName = file.name.replace(/\.[^/.]+$/, "");
    const displayName = newFileName.trim() || defaultName;

    onAddReferenceFile(displayName, file);
    setNewFileName("");
    e.target.value = ""; // Reset input
  };

  const handleStartEditFileName = (file: ReferenceFile) => {
    setEditingFileId(file.id);
    setEditingFileName(file.name);
  };

  const handleSaveFileName = (id: string) => {
    if (editingFileName.trim()) {
      onUpdateReferenceFileName(id, editingFileName.trim());
    }
    setEditingFileId(null);
    setEditingFileName("");
  };

  const handleCancelEditFileName = () => {
    setEditingFileId(null);
    setEditingFileName("");
  };

  return (
    <div id="file-upload-question-form-card">
      <FormCard
        title={
          editingQuestionIndex !== null
            ? `Edit Question ${editingQuestionIndex + 1}`
            : "Add New Question"
        }
        icon={<FileUp className="h-5 w-5" />}
      >
        <div className="flex flex-col gap-6">
          {/* Question Title */}
          <Input
            label="Question Title"
            name="question_title"
            id="question_title"
            placeholder="e.g., Upload your CV, Complete the coding challenge..."
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            required
          />

          {/* Question Subtitle */}
          <TextareaInput
            label="Question Subtitle (Optional)"
            name="question_subtitle"
            id="question_subtitle"
            placeholder="Add additional context or instructions for the job seeker..."
            value={questionSubtitle}
            onChange={(e) => setQuestionSubtitle(e.target.value)}
            rows={3}
          />

          {/* Reference Files Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Reference Files (Optional)
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Files that job seekers can download as reference
              </p>
            </div>

            {/* Add Reference File */}
            <div className="rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 space-y-3">
              <Input
                label="Display Name for Link"
                name="file_display_name"
                id="file_display_name"
                placeholder="e.g., Challenge Instructions, Template..."
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                helperText="Optional: If empty, file name will be used"
              />

              <div className="flex items-center gap-3">
                <label
                  htmlFor="reference_file_input"
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      <FileUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select File to Upload
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Max {MAX_FILE_SIZE_MB}MB
                    </span>
                  </div>
                  <input
                    type="file"
                    id="reference_file_input"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>

            {/* Reference Files List */}
            {referenceFiles.length > 0 && (
              <div className="space-y-2">
                {referenceFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3"
                  >
                    <LinkIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />

                    {editingFileId === file.id ? (
                      <>
                        <input
                          type="text"
                          value={editingFileName}
                          onChange={(e) => setEditingFileName(e.target.value)}
                          className="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveFileName(file.id)}
                          className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEditFileName}
                          className="text-sm text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {file.fileName}
                          </p>
                        </div>
                        <button
                          onClick={() => handleStartEditFileName(file)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Edit display name"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveReferenceFile(file.id)}
                          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          title="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {editingQuestionIndex !== null ? (
              <>
                <PrimaryButton
                  text="Update Question"
                  onClick={onAddQuestion}
                  disabled={!questionTitle.trim()}
                  className="flex-1"
                />
                <PrimaryButton
                  text="Cancel"
                  onClick={onCancelEdit}
                  style="outline"
                  className="flex-1"
                />
              </>
            ) : (
              <PrimaryButton
                text="Add Question"
                icon={<FileUp />}
                onClick={onAddQuestion}
                disabled={!questionTitle.trim()}
                className="w-full"
              />
            )}
          </div>
        </div>
      </FormCard>

      {/* Questions List */}
      {questions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Questions Added ({questions.length})
          </h3>
          {questions.map((question, index) => (
            <FormCard
              key={index}
              title={`Question ${index + 1}: ${question.title}`}
              icon={<HelpCircle className="h-5 w-5" />}
            >
              <QuestionActionButtons
                index={index}
                totalQuestions={questions.length}
                onMoveUp={onMoveQuestionUp}
                onMoveDown={onMoveQuestionDown}
                onEdit={onEditQuestion}
                onRemove={onRemoveQuestion}
              />

              <div className="flex flex-col gap-3">
                {question.subtitle && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {question.subtitle}
                  </p>
                )}

                {question.referenceFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Reference Files:
                    </p>
                    <div className="space-y-1">
                      {question.referenceFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <LinkIcon className="h-3 w-3 text-gray-400" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({file.fileName})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FormCard>
          ))}
        </div>
      )}
    </div>
  );
}
