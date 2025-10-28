"use client";

import { AssessmentCreateFreeInputQuestions } from "../_components/assessment-create-free-input-questions";
import { AssessmentCreateFreeInputPreview } from "../_components/assessment-create-free-input-preview";
import { useAssessmentCreateFreeInput } from "../_hooks/assessment-create-free-input-hook";
import {
  FormActions,
  PrimaryButton,
  SecondaryButton,
} from "@/components/design-system";
import { Save } from "lucide-react";

interface AssessmentCreateQuestionaryViewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  estimatedDuration: string;
  internalPollenTitle: string;
  instructionsTitle: string;
  instructionsDescription: string;
}

export default function AssessmentCreateQuestionaryView({
  assessmentTitle,
  assessmentDescription,
  estimatedDuration,
  internalPollenTitle,
  instructionsTitle,
  instructionsDescription,
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
  } = useAssessmentCreateFreeInput();

  const handleSaveDraft = async () => {
    await handleSubmit("free_input", {
      internal_pollen_title: internalPollenTitle,
      title: assessmentTitle,
      subtitle: assessmentDescription,
      estimated_duration: estimatedDuration,
      instructions_title: instructionsTitle,
      instructions_description: instructionsDescription,
    });
  };

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

      {/* Action Buttons */}
      <FormActions>
        <SecondaryButton
          text="Cancel"
          onClick={handleBack}
          disabled={isSaving}
        />
        <PrimaryButton
          icon={<Save />}
          text={isSaving ? "Saving..." : "Save Assessment"}
          onClick={handleSaveDraft}
          disabled={isSaving || !assessmentTitle || questions.length === 0}
        />
      </FormActions>
    </div>
  );
}
