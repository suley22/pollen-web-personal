import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getJobById, saveSavedJob } from "../../_services/jobs-service";
import { is } from "zod/v4/locales";

export function useApply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const [jobs, setJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [savedJobs] = useState(new Set());

  useEffect(() => {
    // Forzar re-render cuando savedJobs cambie
    console.log("Saved jobs updated:", Array.from(savedJobs));
  }, [savedJobs]);

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

  const updateFavouriteJob = (jobId) => {
    const alreadySaved = savedJobs.has(jobId);

    if (alreadySaved) {
      updateSavedJobList(jobId, false);
      savedJobs.delete(jobId);

      const result = saveSavedJob(jobId);

      if (!result.success) {
        console.error("❌ Error saving favorite job:", result.error);
        updateSavedJobList(jobId, true);
      }
    } else {
      updateSavedJobList(jobId, true);
      savedJobs.add(jobId);

      const result = saveSavedJob(jobId);

      if (!result.success) {
        console.error("❌ Error saving favorite job:", result.error);
        updateSavedJobList(jobId, true);
      }
    }
  };

  const updateSavedJobList = (jobId, isSaved) => {
    setJobs((items) => updateSavedJob(items, jobId, isSaved));
    setHiddenJobs((items) => updateSavedJob(items, jobId, isSaved));
  };

  const updateSavedJob = (items, jobId, isSaved) => {
    return items.map((job) =>
      job.id === jobId ? { ...job, isSaved: isSaved } : job,
    );
  };

  return {
    currentStep,
    showCompanyProfile,
    setShowCompanyProfile,

    handleBack,
    job,
    loading,
    saveFavoriteJob: updateFavouriteJob,
    isSaved: (jobId) => savedJobs.has(jobId),
  };
}
