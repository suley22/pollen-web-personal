"use client";

import {
  PageContainer,
  PageHeader,
  FormContainer,
  FormActions,
  PrimaryButton,
  ConfirmationDialog,
} from "@/components/design-system";
import { CheckCircle, FileText } from "lucide-react";
import { useAssessmentTest } from "../_hooks/assessment-test-hook";
import { AssessmentQuestionCard } from "../_components/assessment-question-card";
import { AssessmentProgress } from "../_components/assessment-progress";
import type { Assessment } from "@/types/assessment";

interface AssessmentTestViewProps {
  assessment: Assessment;
  onSubmit?: (response: any) => Promise<void>;
}

const SubmitButton = ({ isLoading, isDisabled, onClick }) => (
  <PrimaryButton
    icon={<CheckCircle className="h-5 w-5" />}
    text="Submit Assessment"
    loading={isLoading}
    disabled={isDisabled || isLoading}
    onClick={onClick}
  />
);

export function AssessmentTestView({
  assessment,
  onSubmit,
}: AssessmentTestViewProps) {
  const {
    answers,
    isSubmitting,
    isDialogOpen,
    setIsDialogOpen,
    handleAnswerChange,
    handleSubmit,
    handleBack,
    getAnsweredQuestionsCount,
    getTotalQuestionsCount,
    isAllQuestionsAnswered,
    getCompletionPercentage,
  } = useAssessmentTest({ assessment, onSubmit });

  return (
    <PageContainer>
      <PageHeader
        title={assessment.title}
        subtitle={assessment.description}
        showBackButton={true}
        onBack={handleBack}
      >
        <SubmitButton
          isLoading={isSubmitting}
          isDisabled={!isAllQuestionsAnswered()}
          onClick={() => setIsDialogOpen(true)}
        />
      </PageHeader>

      <FormContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions Section - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Assessment Instructions
                  </h3>
                  <p className="text-sm text-blue-800">
                    Please answer all questions below. Your responses will help
                    us understand your preferences and provide better
                    recommendations. You can change your answers before
                    submitting.
                  </p>
                </div>
              </div>
            </div>

            {/* Questions */}
            {assessment.questions.map((question, index) => (
              <AssessmentQuestionCard
                key={question.id}
                question={question}
                questionNumber={index + 1}
                selectedValue={answers[question.id]}
                onAnswerChange={handleAnswerChange}
              />
            ))}
          </div>

          {/* Progress Sidebar - 1/3 width */}
          <div className="space-y-6">
            <AssessmentProgress
              answeredCount={getAnsweredQuestionsCount()}
              totalCount={getTotalQuestionsCount()}
              percentage={getCompletionPercentage()}
            />
          </div>
        </div>

        <FormActions>
          <ConfirmationDialog
            trigger={
              <SubmitButton
                isLoading={isSubmitting}
                isDisabled={!isAllQuestionsAnswered()}
                onClick={() => setIsDialogOpen(true)}
              />
            }
            title="Submit Assessment?"
            description={
              isAllQuestionsAnswered()
                ? "Are you sure you want to submit your assessment? You won't be able to change your answers after submission."
                : "Please answer all questions before submitting the assessment."
            }
            confirmText="Submit"
            cancelText="Cancel"
            isLoading={isSubmitting}
            loadingText="Submitting..."
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={handleSubmit}
          />
        </FormActions>
      </FormContainer>
    </PageContainer>
  );
}
