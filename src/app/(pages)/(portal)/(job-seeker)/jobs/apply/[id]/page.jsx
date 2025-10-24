"use client";
import { PageContainer, PrimaryButton } from "@/components/design-system";
import { useApply } from "../_hook/useApply";

import ApplyJobHeader from "../_components/apply-job-header";
import ProgressSteps from "../_components/progress-steps";
import JobDetails from "../_components/job-details";
import WhatHappensNext from "../_components/what-happens-next";

// Mocked data (to be replaced with real data fetching logic)

const isSaved = false;
const saveJobMutation = { isPending: false };
const removeSavedJobMutation = { isPending: false };

// ----------------------- //

export default function ApplyJobPage() {
  const {
    currentStep,
    showCompanyProfile,
    setShowCompanyProfile,
    handleSaveJob,
    handleBack,
    job,
  } = useApply();

  return (
    <PageContainer>
      <ApplyJobHeader
        job={job}
        isSaved={isSaved}
        showCompanyProfile={showCompanyProfile}
        setShowCompanyProfile={setShowCompanyProfile}
        onSaveJob={handleSaveJob}
        onBack={handleBack}
        saveJobMutation={saveJobMutation}
        removeSavedJobMutation={removeSavedJobMutation}
      />

      <ProgressSteps currentStep={currentStep} />
      <JobDetails job={job} />
      <WhatHappensNext />
      <div className="flex flex-col items-end">
        <PrimaryButton text="Start Assessment" className="px-6 py-4" />
      </div>
    </PageContainer>
  );
}
