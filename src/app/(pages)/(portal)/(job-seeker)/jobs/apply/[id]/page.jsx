"use client";
import { PageContainer } from "@/components/design-system";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ApplyJobHeader from "../_components/apply-job-header";
import ProgressSteps from "../_components/progress-steps";
import JobDetails from "../_components/job-details";

// Mock data para maquetado //
const job = {
  job_title: "Software Engineer",
  company_name: "Tech Corp",
};

const isSaved = false;
const saveJobMutation = { isPending: false };
const removeSavedJobMutation = { isPending: false };

// ----------------------- //

export default function ApplyJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const router = useRouter();

  const handleSaveJob = () => {
    // Lógica para guardar/quitar el trabajo de favoritos
    console.log("Toggle save job");
  };

  return (
    <PageContainer>
      <ApplyJobHeader
        job={job}
        isSaved={isSaved}
        showCompanyProfile={showCompanyProfile}
        setShowCompanyProfile={setShowCompanyProfile}
        onSaveJob={handleSaveJob}
        onBack={() => router.back()}
        saveJobMutation={saveJobMutation}
        removeSavedJobMutation={removeSavedJobMutation}
      />

      <ProgressSteps currentStep={currentStep} />
      <JobDetails job={job} />

      <div className="flex flex-col bg-white rounded-lg border border-gray-200 p-6"></div>
    </PageContainer>
  );
}
