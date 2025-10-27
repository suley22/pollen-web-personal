"use client";

import { AssessmentCreateFreeInputQuestions } from "../_components/assessment-create-free-input-questions";
import { AssessmentCreateFreeInputPreview } from "../_components/assessment-create-free-input-preview";
import { useAssessmentCreateFreeInput } from "../_hooks/assessment-create-free-input-hook";

interface AssessmentCreateQuestionaryViewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
}

export default function AssessmentCreateQuestionaryView({
  assessmentTitle,
  assessmentDescription,
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
  } = useAssessmentCreateFreeInput();

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
