"use client";

import { useEffect, useCallback } from "react";
import { AssessmentCreateFreeInputQuestions } from "../_components/assessment-create-free-input-questions";
import { AssessmentCreateFreeInputPreview } from "../_components/assessment-create-free-input-preview";
import { useAssessmentCreateFreeInput } from "../_hooks/assessment-create-free-input-hook";
import type { Assessment } from "@/types/assessment-types";

interface AssessmentCreateQuestionaryViewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  estimatedDuration: string;
  internalPollenTitle: string;
  instructionsTitle: string;
  instructionsDescription: string;
  assessment?: Assessment;
  onSaveRef?: (fn: () => Promise<void>) => void;
  onSavingChange?: (isSaving: boolean) => void;
}

export default function AssessmentCreateQuestionaryView({
  assessmentTitle,
  assessmentDescription,
  estimatedDuration,
  internalPollenTitle,
  instructionsTitle,
  instructionsDescription,
  assessment,
  onSaveRef,
  onSavingChange,
}: AssessmentCreateQuestionaryViewProps) {
  const {
    // Questions
    questions,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    placeholder,
    setPlaceholder,
    handleAddQuestion,
    handleEditQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,
    handleRemoveQuestion,
    handleBack,
    handleSubmit,
    isSaving,
  } = useAssessmentCreateFreeInput({ assessment });

  const handleSaveDraft = useCallback(async () => {
    await handleSubmit("free_input", {
      internal_pollen_title: internalPollenTitle,
      title: assessmentTitle,
      subtitle: assessmentDescription,
      estimated_duration: estimatedDuration,
      instructions_title: instructionsTitle,
      instructions_description: instructionsDescription,
    });
  }, [
    handleSubmit,
    internalPollenTitle,
    assessmentTitle,
    assessmentDescription,
    estimatedDuration,
    instructionsTitle,
    instructionsDescription,
  ]);

  // Expose save function to parent
  useEffect(() => {
    if (onSaveRef) {
      onSaveRef(handleSaveDraft);
    }

    // Cleanup: remove the ref when component unmounts
    return () => {
      if (onSaveRef) {
        onSaveRef(null as any);
      }
    };
  }, [onSaveRef, handleSaveDraft]);

  // Sync saving state with parent
  useEffect(() => {
    if (onSavingChange) {
      onSavingChange(isSaving);
    }
  }, [isSaving, onSavingChange]);

  return (
    <div className="flex flex-col gap-6">
      <AssessmentCreateFreeInputQuestions
        title={title}
        subtitle={subtitle}
        placeholder={placeholder}
        onTitleChange={setTitle}
        onSubtitleChange={setSubtitle}
        onPlaceholderChange={setPlaceholder}
        onAddQuestion={handleAddQuestion}
      />

      <AssessmentCreateFreeInputPreview
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
    </div>
  );
}
