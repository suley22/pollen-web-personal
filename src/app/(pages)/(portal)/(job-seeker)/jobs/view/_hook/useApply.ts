import { useRouter, useParams } from "next/navigation";
import { useState, useCallback } from "react";
import {
  useJobById,
  useSaveJob,
  useCreateJobApplication,
  useCheckIfUserApplied,
} from "../../_services/jobs-service";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { useAssessmentById } from "@/assessments/_services/assessments-page-service";

import { JobSeekerRoutes } from "../../../router";

export function useApply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const { showSuccess, showError } = useToastNotifications();

  const jobId = params.id as string;

  const { data: job = null, isLoading: loading } = useJobById(jobId);

  const { data: assessment, isLoading: isLoadingAssessment } =
    useAssessmentById(job?.skills_assessment_id);

  const { data: applicationStatus } = useCheckIfUserApplied(jobId);
  const hasApplied = applicationStatus?.hasApplied || false;

  const createApplicationMutation = useCreateJobApplication();

  const saveJobMutation = useSaveJob();

  const handleBack = () => {
    router.back();
  };

  const handleStart = useCallback(() => {
    setIsDialogOpen(false);
    setShowAssessment(true);
    setCurrentStep(2);
  }, []);

  const handleHideAssessment = useCallback(() => {
    setShowAssessment(false);
    setCurrentStep(1);
  }, []);

  const handleSubmitApplication = useCallback(async () => {
    if (!job?.id) {
      console.error("❌ No job ID available");
      showError("Error", "Job information is not available");
      return;
    }

    createApplicationMutation.mutate(job.id, {
      onSuccess: () => {
        showSuccess(
          "Application submitted successfully!",
          "Your application has been submitted. We'll review it and get back to you soon.",
        );

        setTimeout(() => {
          router.push("/jobs");
        }, 1500);
      },
      onError: (error: any) => {
        showError(
          "Application failed",
          error?.message ||
            "Unable to submit your application. Please try again.",
        );
      },
    });
  }, [job?.id, createApplicationMutation, router, showSuccess, showError]);

  const saveFavoriteJob = useCallback(
    (jobId: string) => {
      const alreadySaved = savedJobs.has(jobId);

      if (alreadySaved) {
        setSavedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
      } else {
        setSavedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.add(jobId);
          return newSet;
        });
      }

      saveJobMutation.mutate(jobId, {
        onError: () => {
          if (alreadySaved) {
            setSavedJobs((prev) => {
              const newSet = new Set(prev);
              newSet.add(jobId);
              return newSet;
            });
          } else {
            setSavedJobs((prev) => {
              const newSet = new Set(prev);
              newSet.delete(jobId);
              return newSet;
            });
          }
        },
      });
    },
    [savedJobs, saveJobMutation],
  );

  const isSaved = useCallback(
    (jobId: string) => {
      return savedJobs.has(jobId);
    },
    [savedJobs],
  );

  const handleCompanyDetails = useCallback(() => {
    if (job?.company_id) {
      router.push(JobSeekerRoutes.companyView(job.company_id));
    }
  }, [job?.company_id, router]);

  return {
    currentStep,
    showCompanyProfile,
    setShowCompanyProfile,
    handleBack,
    handleStart,
    handleSubmitApplication,
    handleCompanyDetails,
    job,
    assessment,
    loading,
    isLoadingAssessment,
    hasApplied,
    isDialogOpen,
    setIsDialogOpen,
    showAssessment,
    setShowAssessment,
    handleHideAssessment,
    isApplying: createApplicationMutation.isPending,
    saveFavoriteJob,
    isSaved,
  };
}
