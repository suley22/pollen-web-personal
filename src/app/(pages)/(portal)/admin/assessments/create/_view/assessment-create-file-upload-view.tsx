"use client";

import { useEffect, useCallback } from "react";
import { Divider } from "@/components/design-system";
import { AssessmentCreateFileUploadQuestions } from "../_components/assessment-create-file-upload-questions";
import { AssessmentCreateFileUploadPreview } from "../_components/assessment-create-file-upload-preview";
import { useAssessmentCreateFileUpload } from "../_hooks/assessment-create-file-upload-hook";

interface AssessmentCreateFileUploadViewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  onSaveRef?: (fn: () => Promise<void>) => void;
  onSavingChange?: (isSaving: boolean) => void;
}

export function AssessmentCreateFileUploadView({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  onSaveRef,
  onSavingChange,
}: AssessmentCreateFileUploadViewProps) {
  const {
    questions,
    questionTitle,
    setQuestionTitle,
    questionSubtitle,
    setQuestionSubtitle,
    referenceFiles,
    editingQuestionIndex,
    handleAddReferenceFile,
    handleRemoveReferenceFile,
    handleUpdateReferenceFileName,
    handleAddQuestion,
    handleEditQuestion,
    handleRemoveQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,
    handleCancelEdit,
    handleBack,
    handleSubmit,
    isSaving,
  } = useAssessmentCreateFileUpload();

  const handleSaveDraft = useCallback(async () => {
    await handleSubmit("file_upload", {
      internal_pollen_title: "",
      title: assessmentTitle,
      subtitle: assessmentDescription,
      estimated_duration: "",
      instructions_title: instructionsTitle,
      instructions_description: instructionsDescription,
    });
  }, [
    handleSubmit,
    assessmentTitle,
    assessmentDescription,
    instructionsTitle,
    instructionsDescription,
  ]);

  // Expose save function to parent
  useEffect(() => {
    if (onSaveRef) {
      onSaveRef(handleSaveDraft);
    }
  }, [onSaveRef, handleSaveDraft]);

  // Sync saving state with parent
  useEffect(() => {
    if (onSavingChange) {
      onSavingChange(isSaving);
    }
  }, [isSaving, onSavingChange]);

  return (
    <div className="flex flex-col gap-6">
      <Divider />

      {/* Questions Form */}
      <AssessmentCreateFileUploadQuestions
        questionTitle={questionTitle}
        setQuestionTitle={setQuestionTitle}
        questionSubtitle={questionSubtitle}
        setQuestionSubtitle={setQuestionSubtitle}
        referenceFiles={referenceFiles}
        editingQuestionIndex={editingQuestionIndex}
        questions={questions}
        onAddReferenceFile={handleAddReferenceFile}
        onRemoveReferenceFile={handleRemoveReferenceFile}
        onUpdateReferenceFileName={handleUpdateReferenceFileName}
        onAddQuestion={handleAddQuestion}
        onCancelEdit={handleCancelEdit}
        onEditQuestion={handleEditQuestion}
        onRemoveQuestion={handleRemoveQuestion}
        onMoveQuestionUp={handleMoveQuestionUp}
        onMoveQuestionDown={handleMoveQuestionDown}
      />

      {/* Preview */}
      {questions.length > 0 && (
        <AssessmentCreateFileUploadPreview
          assessmentTitle={assessmentTitle}
          assessmentDescription={assessmentDescription}
          instructionsTitle={instructionsTitle}
          instructionsDescription={instructionsDescription}
          questions={questions}
          isEditMode={true}
          onMoveQuestionUp={handleMoveQuestionUp}
          onMoveQuestionDown={handleMoveQuestionDown}
          onEditQuestion={handleEditQuestion}
          onRemoveQuestion={handleRemoveQuestion}
        />
      )}
    </div>
  );
}
