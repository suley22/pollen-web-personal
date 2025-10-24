import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getJobById } from "../../_services/jobs-service";

export function useApply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function loadJob() {
      const jobId = params.id;
      if (!jobId) return;

      const result = await getJobById(jobId);

      if (result.success) {
        setJob(result.data);
      } else {
        console.error("Error loading job:", result.error);
      }

      setLoading(false);
    }

    loadJob();
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleSaveJob = () => {
    // Logic to save the job
  };

  return {
    currentStep,
    showCompanyProfile,
    setShowCompanyProfile,
    handleSaveJob,
    handleBack,
    job,
    loading,
  };
}
