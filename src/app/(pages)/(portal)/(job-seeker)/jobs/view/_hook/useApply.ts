import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getJobById,
  saveSavedJob,
  createJobApplication,
  checkIfUserApplied,
} from "../../_services/jobs-service";
import { useToastNotifications } from "@/hooks/useToastNotifications";

export function useApply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [jobs, setJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [savedJobs] = useState(new Set());
  const { showSuccess, showError } = useToastNotifications();

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

        // Check if user has already applied to this job
        const appliedResult = await checkIfUserApplied(jobId);
        if (appliedResult.success) {
          setHasApplied(appliedResult.hasApplied);
        }
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

  // Create job application
  const handleStart = async () => {
    if (!job?.id) {
      console.error("❌ No job ID available");
      showError("Error", "Job information is not available");
      return;
    }

    setIsApplying(true);

    try {
      const result = await createJobApplication(job.id);

      if (result.success) {
        console.log("✅ Job application created successfully:", result.data);
        setHasApplied(true);
        setIsDialogOpen(false);

        showSuccess(
          "Application submitted successfully!",
          "Your application has been submitted. We'll review it and get back to you soon.",
        );

        // Redirigir de vuelta a la lista de trabajos después de un breve delay
        setTimeout(() => {
          router.push("/jobs");
        }, 1500);
      } else {
        console.error("❌ Error creating job application:", result.error);
        setIsDialogOpen(false);
        showError(
          "Application failed",
          result.error ||
            "Unable to submit your application. Please try again.",
        );
      }
    } catch (error) {
      console.error("❌ Unexpected error in handleStart:", error);
      setIsDialogOpen(false);
      showError(
        "Application failed",
        "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsApplying(false);
    }
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
    handleStart,
    job,
    loading,
    hasApplied,
    isDialogOpen,
    setIsDialogOpen,
    isApplying,
    saveFavoriteJob: updateFavouriteJob,
    isSaved: (jobId) => savedJobs.has(jobId),
  };
}
