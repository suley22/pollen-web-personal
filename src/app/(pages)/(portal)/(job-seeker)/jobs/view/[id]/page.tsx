"use client";
import {
  PageContainer,
  PrimaryButton,
  ConfirmationDialog,
} from "@/components/design-system";
import { useApply } from "../_hook/useApply";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { AssessmentPreview } from "../_components/assessment-preview";

import ApplyJobHeader from "../_components/apply-job-header";
import ProgressSteps from "../_components/progress-steps";
import JobDetails from "../_components/job-details";
import WhatHappensNext from "../_components/what-happens-next";

export default function ApplyJobPage() {
  const {
    currentStep,

    handleBack,
    job,
    assessment,
    isLoadingAssessment,
    saveFavoriteJob,
    isSaved,
    handleStart,
    handleSubmitApplication,
    hasApplied,
    isDialogOpen,
    setIsDialogOpen,
    showAssessment,
    setShowAssessment,
    handleHideAssessment,
    handleCompanyDetails,
    isApplying,
    // Estados y funciones para respuestas del assessment
    multipleChoiceAnswers,
    freeInputAnswers,
    fileUploadAnswers,
    handleMultipleChoiceChange,
    handleFreeInputChange,
    handleFileUploadChange,
  } = useApply();

  // Convertir preguntas para preview (mismo patrón que otros componentes)
  const convertQuestionsForPreview = (assessment) => {
    if (!assessment?.questions) return [];

    return assessment.questions.map((q, index) => {
      const baseQuestion: any = {
        id: q.id || `question-${index}`,
        type: q.type,
        title: q.title,
        description: q.subtitle || "",
      };

      if (q.type === "multiple_choice" && q.multiple_choice) {
        baseQuestion.options_title = q.multiple_choice.options_title || "";
        baseQuestion.options = q.multiple_choice.options || [];
        baseQuestion.categoryId = q.multiple_choice.categoryId;
      } else if (q.type === "free_input" && q.free_input) {
        baseQuestion.max_characters = q.free_input.placeholder || "";
      } else if (q.type === "file_upload") {
        baseQuestion.file_upload = {
          referenceFiles: q.file_upload?.referenceFiles || [],
        };
      }

      return baseQuestion;
    });
  };

  return (
    <PageContainer>
      <ApplyJobHeader
        job={job}
        isSaved={isSaved}
        handleCompanyDetails={handleCompanyDetails}
        onToggleSave={() => saveFavoriteJob(job.id)}
        onBack={handleBack}
      />

      <ProgressSteps currentStep={currentStep} />
      <JobDetails job={job} />
      <WhatHappensNext />
      {/* Assessment Section */}
      {showAssessment && (
        <div className="space-y-6 mt-8">
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Assessment</h2>
              <Button variant="ghost" size="sm" onClick={handleHideAssessment}>
                <X className="w-4 h-4 mr-2" />
                Hide Assessment
              </Button>
            </div>

            {isLoadingAssessment ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading assessment...</p>
              </div>
            ) : !assessment ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No assessment required for this position.
                </p>
                <div className="mt-4">
                  <ConfirmationDialog
                    trigger={
                      <PrimaryButton
                        text="Submit Application"
                        className="px-6 py-4"
                      />
                    }
                    title="Submit your application?"
                    description="Are you sure you want to apply for this position? Once submitted, your application will be reviewed by our team."
                    confirmText="Submit Application"
                    cancelText="Cancel"
                    onConfirm={handleSubmitApplication}
                    isLoading={isApplying}
                    loadingText="Submitting..."
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-background">
                  <AssessmentPreview
                    assessmentTitle={assessment.title || ""}
                    assessmentDescription={assessment.subtitle || ""}
                    instructionsTitle={assessment.instructions_title || ""}
                    instructionsDescription={
                      assessment.instructions_description || ""
                    }
                    questions={convertQuestionsForPreview(assessment)}
                    categories={assessment.categories || []}
                    multipleChoiceAnswers={multipleChoiceAnswers}
                    freeInputAnswers={freeInputAnswers}
                    fileUploadAnswers={fileUploadAnswers}
                    onMultipleChoiceChange={handleMultipleChoiceChange}
                    onFreeInputChange={handleFreeInputChange}
                    onFileUploadChange={handleFileUploadChange}
                  />
                </div>

                <div className="flex justify-end">
                  <ConfirmationDialog
                    trigger={
                      <PrimaryButton
                        text="Complete Assessment & Submit Application"
                        className="px-6 py-4"
                      />
                    }
                    title="Submit your application?"
                    description="Are you sure you want to apply for this position? Once submitted, your application will be reviewed by our team."
                    confirmText="Submit Application"
                    cancelText="Cancel"
                    onConfirm={handleSubmitApplication}
                    isLoading={isApplying}
                    loadingText="Submitting..."
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col items-end">
        {!showAssessment && (
          <PrimaryButton
            text={hasApplied ? "Already Applied" : "Start Assessment"}
            className="px-6 py-4"
            disabled={hasApplied}
            onClick={handleStart}
          />
        )}
      </div>
    </PageContainer>
  );
}
