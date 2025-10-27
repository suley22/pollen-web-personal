"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { AssessmentQuestionCard } from "../../test/_components/assessment-question-card";
import { AssessmentProgress } from "../../test/_components/assessment-progress";
import { PageHeader, InfoCard } from "@/components/design-system";
import { QuestionActionButtons } from "./question-action-buttons";

interface AssessmentOption {
  value: string;
  label: string;
  categoryId?: string;
}

interface MultipleChoiceQuestion {
  title: string;
  description: string;
  options_title: string;
  options: AssessmentOption[];
}

interface AssessmentCreatePreviewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  questions: MultipleChoiceQuestion[];
  // Edit mode props (optional - only for create page)
  isEditMode?: boolean;
  onMoveQuestionUp?: (index: number) => void;
  onMoveQuestionDown?: (index: number) => void;
  onEditQuestion?: (index: number) => void;
  onRemoveQuestion?: (index: number) => void;
}

export function AssessmentCreatePreview({
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
}: AssessmentCreatePreviewProps) {
  // Estado para el preview del assessment
  const [previewAnswers, setPreviewAnswers] = useState<Record<string, string>>(
    {},
  );

  // Funciones para el preview
  const handlePreviewAnswerChange = (
    questionId: string,
    optionValue: string,
  ) => {
    setPreviewAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const getPreviewAnsweredCount = () => {
    return Object.keys(previewAnswers).length;
  };

  const getPreviewPercentage = () => {
    const total = questions.length;
    if (total === 0) return 0;
    return Math.round((getPreviewAnsweredCount() / total) * 100);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={assessmentTitle} subtitle={assessmentDescription} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assessment Instructions Card */}
          {(instructionsTitle || instructionsDescription) && (
            <InfoCard
              icon={FileText}
              color="blue"
              title={instructionsTitle || "Assessment Instructions"}
              description={
                instructionsDescription ||
                "Please answer all questions below. Your responses will help us understand your preferences and provide better recommendations. You can change your answers before submitting."
              }
            />
          )}

          {/* Questions */}
          {questions.map((question, index) => {
            // Convert question to AssessmentQuestion format
            const assessmentQuestion = {
              id: `q-${index}`,
              title: question.title,
              description: question.description,
              options_title: question.options_title,
              options: question.options,
            };

            return (
              <div key={index} className="relative">
                <AssessmentQuestionCard
                  question={assessmentQuestion}
                  questionNumber={index + 1}
                  selectedValue={previewAnswers[`q-${index}`]}
                  onAnswerChange={handlePreviewAnswerChange}
                />

                {/* Action Buttons Overlay - Only in Edit Mode */}
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
            answeredCount={getPreviewAnsweredCount()}
            totalCount={questions.length}
            percentage={getPreviewPercentage()}
          />
        </div>
      </div>
    </div>
  );
}
