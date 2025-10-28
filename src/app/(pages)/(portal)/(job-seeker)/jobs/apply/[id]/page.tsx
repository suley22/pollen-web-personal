"use client";
import { PageContainer, PrimaryButton } from "@/components/design-system";
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
        <PrimaryButton text="Start Assessment" className="px-6 py-4" />
      </div>
    </PageContainer>
  );
}
