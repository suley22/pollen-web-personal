"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAssessmentResponse } from "../../../(job-seeker)/jobs/_services/assessment-response-service";
import { useSkillRatings } from "@/hooks/useSkillRatings";
import {
  useCalendlyEventTypes,
  createSingleUseSchedulingLink,
} from "../../events/_services/calendly-service";
import {
  ApplicationStatus,
  ApplicationSubStatus,
} from "@/types/application-status";

// Función para obtener detalles del evento de Calendly
async function fetchCalendlyEventDetails(eventUri: string) {
  const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN;

  if (!CALENDLY_API_TOKEN) {
    throw new Error("Calendly API token not configured");
  }

  const response = await fetch(eventUri, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch event details");
  }

  const data = await response.json();
  return data.resource;
}

interface UseJobApplicantDrawerProps {
  jobSeeker: any;
  onUpdateScores: (
    applicationId: string,
    scores: {
      score1: number;
      score2: number;
      score3: number;
      score4: number;
    },
  ) => void;
  onUpdateCalendlyLink: (applicationId: string, calendlyLink: string) => void;
  onUpdateStatusAndSubStatus: (
    applicationId: string,
    status: string,
    subStatus: string,
    stoppedAtStage?: string,
  ) => void;
}

export function useJobApplicantDrawer({
  jobSeeker,
  onUpdateScores,
  onUpdateCalendlyLink,
  onUpdateStatusAndSubStatus,
}: UseJobApplicantDrawerProps) {
  // State management
  const [subStatus, setSubStatus] = useState(jobSeeker?.sub_status || "");
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    status: string;
    subStatus: string;
  } | null>(null);
  const [previewMode, setPreviewMode] = useState<
    "assessment" | "calendly" | null
  >(null);

  // Calendly link states
  const [calendlyLink, setCalendlyLink] = useState<string | null>(
    jobSeeker?.pollen_interview_invite_link || null,
  );
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch event types for Calendly
  const { data: eventTypes, isLoading: isLoadingEventTypes } =
    useCalendlyEventTypes();

  // Fetch assessment response data
  const {
    data: assessmentResponse,
    isLoading: isLoadingAssessment,
    error: assessmentError,
  } = useAssessmentResponse(jobSeeker?.assessment_response_id);

  // Extraer el URI del evento si es un URI de invitee
  const calendlyEventUri = jobSeeker?.calendly_invite;
  const eventUri = calendlyEventUri?.includes("/invitees/")
    ? calendlyEventUri.split("/invitees/")[0]
    : calendlyEventUri;

  // Fetch Calendly event details if event is scheduled
  const { data: eventDetails, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["calendly-event-admin", eventUri],
    queryFn: () => fetchCalendlyEventDetails(eventUri!),
    enabled: !!eventUri,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Memoize initial ratings to prevent unnecessary re-renders (trabajo directo con 0-10)
  const initialRatings = useMemo(
    () => ({
      score1: jobSeeker?.score1 || 0,
      score2: jobSeeker?.score2 || 0,
      score3: jobSeeker?.score3 || 0,
      score4: jobSeeker?.score4 || 0,
    }),
    [
      jobSeeker?.score1,
      jobSeeker?.score2,
      jobSeeker?.score3,
      jobSeeker?.score4,
    ],
  );

  // Use the skill ratings hook
  const {
    skillRatings,
    ratings,
    updateRating,
    hasChanges,
    save: saveRatings,
    isSaving,
  } = useSkillRatings({
    skills: [
      {
        id: "score1",
        name: "Creative Campaign Development",
        description: "Ability to develop creative and innovative campaigns",
      },
      {
        id: "score2",
        name: "Data Analysis & Insights",
        description: "Skills in analyzing data and extracting insights",
      },
      {
        id: "score3",
        name: "Communication & Presentation",
        description: "Effectiveness in communication and presentation",
      },
      {
        id: "score4",
        name: "Strategic Thinking",
        description: "Strategic approach and long-term planning",
      },
    ],
    initialRatings,
    onSave: async (ratings) => {
      if (jobSeeker?.application_id) {
        // Los ratings ya están en escala 0-10, guardar directamente
        const scores = {
          score1: ratings.score1,
          score2: ratings.score2,
          score3: ratings.score3,
          score4: ratings.score4,
        };
        onUpdateScores(jobSeeker.application_id, scores);
      }
    },
  });

  // Actualizar substatus y calendly link cuando cambie el jobSeeker
  useEffect(() => {
    if (jobSeeker) {
      setSubStatus(jobSeeker.sub_status || "");
      setCalendlyLink(jobSeeker.pollen_interview_invite_link || null);
    }
  }, [jobSeeker]);

  // Status handlers
  const handleStatusSelect = (status: string, newSubStatus: string) => {
    setPendingStatusChange({ status, subStatus: newSubStatus });
    setSubStatus(newSubStatus);
  };

  const handleSaveStatusChange = () => {
    if (pendingStatusChange && jobSeeker?.application_id) {
      const stoppedAtStage =
        pendingStatusChange.status === "complete"
          ? jobSeeker.sub_status
          : undefined;
      onUpdateStatusAndSubStatus(
        jobSeeker.application_id,
        pendingStatusChange.status,
        pendingStatusChange.subStatus,
        stoppedAtStage,
      );
      setPendingStatusChange(null);
    }
  };

  const handleCancelStatusChange = () => {
    setPendingStatusChange(null);
    setSubStatus(jobSeeker?.sub_status || "");
  };

  // Calendly handlers
  const handleGenerateCalendlyLink = async () => {
    if (!selectedEventType) {
      alert("Please select an event type");
      return;
    }

    setIsGeneratingLink(true);
    try {
      const link = await createSingleUseSchedulingLink(selectedEventType, {
        utm_source: "JOB_APPLICATION",
        utm_content: jobSeeker?.application_id || "",
      });
      setCalendlyLink(link.booking_url);
      setShowLinkDialog(false);

      // Save to database
      if (jobSeeker?.application_id) {
        onUpdateCalendlyLink(jobSeeker.application_id, link.booking_url);
      }
    } catch (error) {
      console.error("Error generating Calendly link:", error);
      alert("Failed to generate link. Please try again.");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleCopyLink = () => {
    if (calendlyLink) {
      navigator.clipboard.writeText(calendlyLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determinar si los scores son editables (solo en new_applicants)
  const isScoresEditable =
    jobSeeker?.status === ApplicationStatus.NEW_APPLICANTS;

  return {
    // State
    subStatus,
    pendingStatusChange,
    previewMode,
    setPreviewMode,
    calendlyLink,
    isGeneratingLink,
    selectedEventType,
    setSelectedEventType,
    showLinkDialog,
    setShowLinkDialog,
    copied,

    // Calendly data
    eventTypes,
    isLoadingEventTypes,
    eventUri,
    eventDetails,
    isLoadingEvent,

    // Assessment data
    assessmentResponse,
    isLoadingAssessment,
    assessmentError,

    // Skill ratings
    skillRatings,
    ratings,
    updateRating,
    hasChanges,
    saveRatings,
    isSaving,
    isScoresEditable,

    // Handlers
    handleStatusSelect,
    handleSaveStatusChange,
    handleCancelStatusChange,
    handleGenerateCalendlyLink,
    handleCopyLink,
  };
}
