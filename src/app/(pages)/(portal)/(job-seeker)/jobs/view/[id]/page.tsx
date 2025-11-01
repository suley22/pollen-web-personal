"use client";
import {
  PageContainer,
  PrimaryButton,
  ConfirmationDialog,
} from "@/components/design-system";
import { useApply } from "../_hook/useApply";

import ApplyJobHeader from "../_components/apply-job-header";
import ProgressSteps from "../_components/progress-steps";
import JobDetails from "../_components/job-details";
import WhatHappensNext from "../_components/what-happens-next";

export default function ApplyJobPage() {
  const {
    currentStep,
    showCompanyProfile,
    setShowCompanyProfile,

    handleBack,
    job,
    saveFavoriteJob,
    isSaved,
    handleStart,
    hasApplied,
    isDialogOpen,
    setIsDialogOpen,
    isApplying,
  } = useApply();

  return (
    <PageContainer>
      <ApplyJobHeader
        job={job}
        isSaved={isSaved}
        showCompanyProfile={showCompanyProfile}
        setShowCompanyProfile={setShowCompanyProfile}
        onToggleSave={() => saveFavoriteJob(job.id)}
        onBack={handleBack}
      />

      <ProgressSteps currentStep={currentStep} />
      <JobDetails job={job} />
      <WhatHappensNext />
      <div className="flex flex-col items-end">
        <ConfirmationDialog
          trigger={
            <PrimaryButton
              text={hasApplied ? "Already Applied" : "Start Assessment"}
              className="px-6 py-4"
              disabled={hasApplied}
            />
          }
          title="Submit your application?"
          description="Are you sure you want to apply for this position? Once submitted, your application will be reviewed by our team."
          confirmText="Submit Application"
          cancelText="Cancel"
          onConfirm={handleStart}
          isLoading={isApplying}
          loadingText="Submitting..."
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
    </PageContainer>
  );
}
