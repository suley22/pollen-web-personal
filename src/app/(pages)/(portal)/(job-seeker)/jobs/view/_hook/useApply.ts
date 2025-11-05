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
import {
  useCreateAssessmentResponse,
  prepareUserAnswers,
} from "../../_services/assessment-response-service";

import { JobSeekerRoutes } from "../../../router";

export function useApply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  // Estados para respuestas del assessment
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<
    Record<string, string>
  >({});
  const [freeInputAnswers, setFreeInputAnswers] = useState<string[]>([]);
  const [fileUploadAnswers, setFileUploadAnswers] = useState<
    Record<number, any>
  >({});

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
  const interviewLink = applicationStatus?.interviewLink || null;
  const calendlyEventUri = applicationStatus?.calendlyEventUri || null;

  const createApplicationMutation = useCreateJobApplication();
  const createAssessmentResponseMutation = useCreateAssessmentResponse();

  const saveJobMutation = useSaveJob();

  const handleBack = () => {
    router.back();
  };

  const handleStart = useCallback(() => {
    setIsDialogOpen(false);
    setShowAssessment(true);
    setCurrentStep(2);

    // Scroll automático hacia el assessment después de un pequeño delay para que el DOM se actualice
    setTimeout(() => {
      // Intentar encontrar el assessment específicamente
      const assessmentElement = document.querySelector(
        "[data-assessment-container]",
      );
      if (assessmentElement) {
        assessmentElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else {
        // Fallback: scroll hacia abajo
        window.scrollTo({
          top: window.innerHeight * 0.7,
          behavior: "smooth",
        });
      }
    }, 150);
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

    try {
      let assessmentResponseId: string | undefined;

      // Si hay assessment, crear assessment response primero
      if (assessment) {
        // Preparar respuestas del usuario
        const userAnswers = prepareUserAnswers(
          multipleChoiceAnswers,
          freeInputAnswers,
          fileUploadAnswers,
          assessment.questions || [],
        );

        // Crear assessment response
        const responseResult =
          await createAssessmentResponseMutation.mutateAsync({
            assessmentData: assessment,
            userAnswers: userAnswers,
          });

        assessmentResponseId = responseResult.id;
      }

      // Crear job application con el assessment response ID (si existe)
      await createApplicationMutation.mutateAsync({
        jobId: job.id,
        assessmentResponseId: assessmentResponseId,
      });

      showSuccess(
        "Application submitted successfully!",
        "Your application has been submitted. We'll review it and get back to you soon.",
      );

      setTimeout(() => {
        router.push("/jobs");
      }, 1500);
    } catch (error: any) {
      console.error("❌ Error in application submission:", error);
      showError(
        "Application failed",
        error?.message ||
          "Unable to submit your application. Please try again.",
      );
    }
  }, [
    job?.id,
    assessment,
    multipleChoiceAnswers,
    freeInputAnswers,
    fileUploadAnswers,
    createApplicationMutation,
    createAssessmentResponseMutation,
    router,
    showSuccess,
    showError,
  ]);

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

  // Funciones para manejar respuestas del assessment
  const handleMultipleChoiceChange = useCallback(
    (questionId: string, optionValue: string) => {
      setMultipleChoiceAnswers((prev) => ({
        ...prev,
        [questionId]: optionValue,
      }));
    },
    [],
  );

  const handleFreeInputChange = useCallback((index: number, value: string) => {
    setFreeInputAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  }, []);

  const handleFileUploadChange = useCallback((index: number, file: any) => {
    setFileUploadAnswers((prev) => ({
      ...prev,
      [index]: file,
    }));
  }, []);

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
    interviewLink,
    calendlyEventUri,
    isDialogOpen,
    setIsDialogOpen,
    showAssessment,
    setShowAssessment,
    handleHideAssessment,
    isApplying:
      createApplicationMutation.isPending ||
      createAssessmentResponseMutation.isPending,
    saveFavoriteJob,
    isSaved,
    // Assessment response handling
    multipleChoiceAnswers,
    freeInputAnswers,
    fileUploadAnswers,
    handleMultipleChoiceChange,
    handleFreeInputChange,
    handleFileUploadChange,
  };
}
