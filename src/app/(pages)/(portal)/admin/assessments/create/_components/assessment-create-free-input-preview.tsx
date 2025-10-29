"use client";

import { useState } from "react";
import {
  FormCard,
  TextareaInput,
  InfoCard,
  PageHeader,
  WarningBadge,
  Divider,
  PrimaryButton,
  SecondaryButton,
} from "@/components/design-system";
import { QuestionActionButtons } from "./question-action-buttons";
import { AssessmentProgress } from "../../_components/assessment-progress";
import { HelpCircle, CheckCircle } from "lucide-react";

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

  // Estado para las respuestas enviadas
  const [submittedAnswers, setSubmittedAnswers] = useState<Set<number>>(
    new Set(),
  );

  const handleAnswerChange = (index: number, value: string) => {
    setPreviewAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmitAnswer = (index: number) => {
    if (previewAnswers[index]?.trim()) {
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

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
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
            const hasAnswer = previewAnswers[index]?.trim();

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

                    {/* Answer Textarea */}
                    <TextareaInput
                      label=""
                      name={`question_${index}_answer`}
                      id={`question_${index}_answer`}
                      placeholder={
                        question.placeholder || "Type your answer here..."
                      }
                      value={previewAnswers[index] || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      rows={5}
                      maxLength={1000}
                      showCharacterCount={true}
                      disabled={isSubmitted}
                    />

                    {/* Submit/Edit Button */}
                    <div className="flex justify-end">
                      {isSubmitted ? (
                        <SecondaryButton
                          text="Edit Answer"
                          icon={<CheckCircle />}
                          onClick={() => handleEditAnswer(index)}
                          className="w-full sm:w-auto"
                        />
                      ) : (
                        <PrimaryButton
                          text="Check Answer"
                          onClick={() => handleSubmitAnswer(index)}
                          disabled={!hasAnswer}
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
    </div>
  );
}
