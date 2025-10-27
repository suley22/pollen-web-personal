"use client";

import { useState } from "react";
import {
  FormCard,
  TextareaInput,
  InfoCard,
  PageHeader,
  WarningBadge,
  Divider,
} from "@/components/design-system";
import { QuestionActionButtons } from "./question-action-buttons";
import { HelpCircle } from "lucide-react";

interface FreeInputQuestion {
  title: string;
  subtitle: string;
  placeholder: string;
}

interface AssessmentCreateFreeInputPreviewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  questions: FreeInputQuestion[];
  isEditMode?: boolean;
  onMoveQuestionUp?: (index: number) => void;
  onMoveQuestionDown?: (index: number) => void;
  onEditQuestion?: (index: number) => void;
  onRemoveQuestion?: (index: number) => void;
}

export function AssessmentCreateFreeInputPreview({
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
}: AssessmentCreateFreeInputPreviewProps) {
  // Estado para las respuestas del preview
  const [previewAnswers, setPreviewAnswers] = useState<Record<number, string>>(
    {},
  );

  const handleAnswerChange = (index: number, value: string) => {
    setPreviewAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <>
      {/* Assessment Header */}

      <Divider />

      <WarningBadge className="h-8 justify-center">
        This is a preview of the free input assessment. In edit mode, answers
        cannot be submitted.
      </WarningBadge>

      <Divider />

      <PageHeader
        title={assessmentTitle}
        subtitle={assessmentDescription}
      ></PageHeader>

      {/* Instructions */}
      {instructionsTitle && instructionsDescription && (
        <InfoCard
          title={instructionsTitle}
          description={instructionsDescription}
          color="blue"
        />
      )}

      {/* Questions */}
      {questions.map((question, index) => (
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

            {/* Answer Textarea */}
            <TextareaInput
              label=""
              name={`question_${index}_answer`}
              id={`question_${index}_answer`}
              placeholder={question.placeholder || "Type your answer here..."}
              value={previewAnswers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              rows={5}
              maxLength={1000}
              showCharacterCount={true}
            />
          </div>
        </FormCard>
      ))}
    </>
  );
}
