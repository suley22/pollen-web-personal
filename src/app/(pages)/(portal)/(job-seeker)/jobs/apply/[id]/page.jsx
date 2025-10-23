"use client";
import { PageContainer } from "@/components/design-system";
import { useApply } from "../_hook/useApply";

import ApplyJobHeader from "../_components/apply-job-header";
import ProgressSteps from "../_components/progress-steps";
import JobDetails from "../_components/job-details";

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

      <div className="flex flex-col bg-white rounded-lg border border-gray-200 p-6"></div>
    </PageContainer>
  );
}
