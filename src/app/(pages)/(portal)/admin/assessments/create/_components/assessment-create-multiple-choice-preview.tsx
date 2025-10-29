"use client";

import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import { AssessmentQuestionCard } from "../../_components/assessment-question-card";
import { AssessmentProgress } from "../../_components/assessment-progress";
import {
  PageHeader,
  InfoCard,
  Divider,
  WarningBadge,
} from "@/components/design-system";
import { QuestionActionButtons } from "./question-action-buttons";
import type { AssessmentCategory } from "@/types/assessment-category";

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

interface AssessmentCreateMultipleChoicePreviewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  questions: MultipleChoiceQuestion[];
  categories?: AssessmentCategory[];
  // Edit mode props (optional - only for create page)
  isEditMode?: boolean;
  onMoveQuestionUp?: (index: number) => void;
  onMoveQuestionDown?: (index: number) => void;
  onEditQuestion?: (index: number) => void;
  onRemoveQuestion?: (index: number) => void;
}

export function AssessmentCreateMultipleChoicePreview({
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
}: AssessmentCreateMultipleChoicePreviewProps) {
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

  // Calcular porcentajes por categoría
  const categoryBreakdown = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    let totalAnswered = 0;

    // Contar respuestas por categoría
    Object.entries(previewAnswers).forEach(([questionId, optionValue]) => {
      const questionIndex = parseInt(questionId.split("-")[1]);
      const question = questions[questionIndex];
      const selectedOption = question?.options.find(
        (opt) => opt.value === optionValue,
      );

      if (selectedOption?.categoryId) {
        categoryCounts.set(
          selectedOption.categoryId,
          (categoryCounts.get(selectedOption.categoryId) || 0) + 1,
        );
        totalAnswered++;
      }
    });

    // Calcular porcentajes
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
  }, [previewAnswers, questions, categories]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Divider />

      <WarningBadge className="h-8 justify-center">
        This is a preview of the multiple choice assessment. In edit mode,
        answers cannot be submitted.
      </WarningBadge>

      <Divider />

      <PageHeader
        title={assessmentTitle}
        subtitle={assessmentDescription}
      ></PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assessment Instructions Card */}
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
