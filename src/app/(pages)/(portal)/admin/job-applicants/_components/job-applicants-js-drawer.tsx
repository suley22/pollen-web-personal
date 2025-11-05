"use client";

import {
  X,
  Send,
  Eye,
  EyeOff,
  Link as LinkIcon,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Video,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAssessmentResponse } from "../../../(job-seeker)/jobs/_services/assessment-response-service";
import { useSkillRatings } from "@/hooks/useSkillRatings";
import { AssessmentPreview } from "@/components/assessment/assessment-preview";
import { SkillSliderRating } from "@/components/design-system/skill-slider-rating";
import { Divider, PrimaryButton } from "@/components/design-system";
import {
  ApplicationStatus,
  ApplicationSubStatus,
} from "@/types/application-status";
import { StatusButtonGroup } from "@/components/design-system/status-button-group";
import {
  useCalendlyEventTypes,
  createSingleUseSchedulingLink,
} from "../../events/_services/calendly-service";

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

interface TaskDrawerProps {
  isOpen: boolean;
  jobSeeker: any;
  onClose: () => void;
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
  onInviteToInterview: (applicationId: string) => void;
  onUpdateStatusAndSubStatus: (
    applicationId: string,
    status: string,
    subStatus: string,
    stoppedAtStage?: string,
  ) => void;
}

export function TaskDrawer({
  isOpen,
  jobSeeker,
  onClose,
  onUpdateScores,
  onUpdateCalendlyLink,
  onInviteToInterview,
  onUpdateStatusAndSubStatus,
}: TaskDrawerProps) {
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

  const handleInviteToInterview = () => {
    if (jobSeeker?.application_id) {
      onUpdateStatusAndSubStatus(
        jobSeeker.application_id,
        ApplicationStatus.IN_PROGRESS,
        ApplicationSubStatus.INVITED_TO_POLLEN_INTERVIEW,
      );
    }
  };

  const handleNotProgressing = () => {
    if (jobSeeker?.application_id) {
      onUpdateStatusAndSubStatus(
        jobSeeker.application_id,
        ApplicationStatus.COMPLETE,
        ApplicationSubStatus.NOT_PROGRESSING,
        jobSeeker.sub_status, // stopped_at_stage = current sub_status before changing to complete
      );
    }
  };

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

  // Calendly link functions
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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Split Panel Layout - Fixed sizes, no animations */}
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Left Panel - Preview (50%) - Conditional */}
        {previewMode && (
          <div className="w-1/2 bg-gray-50 shadow-xl overflow-hidden border-r border-gray-300">
            <div className="flex flex-col h-full">
              {/* Left Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold">
                    {previewMode === "assessment"
                      ? "Assessment Preview"
                      : "Calendly Booking Preview"}
                  </div>
                </div>
                {/* Close Preview Button */}
                <button
                  onClick={() => setPreviewMode(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Close Preview"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Left Content - Assessment or Calendly */}
              <div className="flex-1 overflow-y-auto">
                {previewMode === "assessment" ? (
                  <div className="p-6">
                    <AssessmentPreview
                      title={assessmentResponse?.title}
                      subtitle={assessmentResponse?.subtitle}
                      questions={assessmentResponse?.questions || []}
                      showCategorySummary={true}
                      isLoading={isLoadingAssessment}
                      error={assessmentError?.message}
                    />
                  </div>
                ) : calendlyLink ? (
                  <div className="h-full">
                    <iframe
                      src={calendlyLink}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Calendly Booking Page"
                    />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-6">
                    <p className="text-gray-500">No Calendly link available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - Actions & Scoring - Always 50% width */}
        <div className="w-1/2 bg-white shadow-xl overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Right Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold">
                  {jobSeeker.name} - Evaluation
                </div>
                <div
                  className={`${jobSeeker.statusColor} text-white text-xs px-2 py-1 rounded-full`}
                >
                  {jobSeeker.statusLabel}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Right Content */}
            <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-4">
              {/* Sub Status */}
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Current Sub Status
                </label>

                <Divider />

                {/* Status Button Group Component */}
                <StatusButtonGroup
                  currentStatus={jobSeeker.status}
                  currentSubStatus={subStatus}
                  pendingStatusChange={pendingStatusChange}
                  onStatusSelect={handleStatusSelect}
                  onSaveStatusChange={handleSaveStatusChange}
                  onCancelStatusChange={handleCancelStatusChange}
                />
              </div>
              <Divider />

              {/* Unified Interview Management Card */}
              <div>
                {eventUri && eventDetails ? (
                  // ESTADO 3: Entrevista Confirmada - Card Verde
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Interview Scheduled
                            </h3>
                            <span className="bg-green-100 text-green-700 border border-green-300 text-xs px-2 py-1 rounded-full font-medium">
                              Confirmed
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {/* Date and Time */}
                          {eventDetails.start_time && (
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 text-gray-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {new Date(
                                    eventDetails.start_time,
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {new Date(
                                    eventDetails.start_time,
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZoneName: "short",
                                  })}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Duration */}
                          {eventDetails.start_time && eventDetails.end_time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-600" />
                              <p className="text-xs text-gray-600">
                                {Math.round(
                                  (new Date(eventDetails.end_time).getTime() -
                                    new Date(
                                      eventDetails.start_time,
                                    ).getTime()) /
                                    (1000 * 60),
                                )}{" "}
                                minutes
                              </p>
                            </div>
                          )}

                          {/* Location */}
                          {eventDetails.location && (
                            <div className="flex items-start gap-2">
                              {eventDetails.location.type === "physical" ? (
                                <>
                                  <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                                  <p className="text-xs text-gray-600">
                                    {eventDetails.location.location ||
                                      "Physical location"}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <Video className="w-4 h-4 text-gray-600 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-xs text-gray-600 mb-1">
                                      Video conference
                                    </p>
                                    {eventDetails.location.join_url && (
                                      <a
                                        href={eventDetails.location.join_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
                                      >
                                        Join Meeting
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Event Name */}
                          {eventDetails.name && (
                            <div className="pt-2 border-t border-green-200">
                              <p className="text-xs text-gray-600">
                                <strong>Event:</strong> {eventDetails.name}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Scheduling Link - Collapsed */}
                        {calendlyLink && (
                          <div className="pt-3 border-t border-green-200">
                            <details className="group">
                              <summary className="cursor-pointer text-xs font-medium text-green-700 hover:text-green-800 flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" />
                                View Scheduling Link
                              </summary>
                              <div className="mt-2 bg-white border border-green-200 rounded-lg p-2">
                                <input
                                  type="text"
                                  value={calendlyLink}
                                  readOnly
                                  className="w-full text-xs border border-gray-200 rounded px-2 py-1 font-mono bg-gray-50 text-gray-600"
                                />
                              </div>
                            </details>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : calendlyLink ? (
                  // ESTADO 2: Link Generado - Esperando Respuesta del Candidato
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Awaiting Candidate Response
                            </h3>
                            <span className="bg-purple-100 text-purple-700 border border-purple-300 text-xs px-2 py-1 rounded-full font-medium">
                              Pending
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">
                          Interview link has been sent to{" "}
                          <strong>{jobSeeker?.name}</strong>. Waiting for them
                          to schedule a time.
                        </p>

                        {/* Link Management */}
                        <div className="space-y-3">
                          <div className="bg-white border border-purple-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-xs font-medium text-purple-700">
                                Active Scheduling Link
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={calendlyLink}
                                readOnly
                                className="flex-1 text-sm border border-gray-200 rounded px-3 py-2 font-mono bg-gray-50 text-gray-600"
                              />
                              <button
                                onClick={() =>
                                  setPreviewMode(
                                    previewMode === "calendly"
                                      ? null
                                      : "calendly",
                                  )
                                }
                                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                                  previewMode === "calendly"
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                }`}
                                title={
                                  previewMode === "calendly"
                                    ? "Hide preview"
                                    : "Show preview"
                                }
                              >
                                {previewMode === "calendly" ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={handleCopyLink}
                                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1"
                                title="Copy link"
                              >
                                {copied ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    <span className="text-xs">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4" />
                                    <span className="text-xs">Copy</span>
                                  </>
                                )}
                              </button>
                              <a
                                href={calendlyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1"
                                title="Open link"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 text-xs text-purple-600 bg-purple-50 p-2 rounded border border-purple-200">
                            <span>⚠️</span>
                            <p>
                              This link can only be used once and will expire
                              after the event is scheduled.
                            </p>
                          </div>

                          {/* Option to generate new link */}
                          <button
                            onClick={() => setShowLinkDialog(true)}
                            className="w-full px-3 py-2 bg-white border-2 border-purple-300 text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <LinkIcon className="w-4 h-4" />
                            Generate New Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // ESTADO 1: Sin Link - Generar Invitación
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <LinkIcon className="w-5 h-5 text-green-600" />
                          Interview Scheduling
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Generate a link to invite the candidate to schedule an
                          interview
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowLinkDialog(true)}
                      className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <LinkIcon className="w-5 h-5" />
                      Generate Interview Link
                    </button>
                  </div>
                )}
              </div>

              <Divider />

              {jobSeeker && (
                <div className="flex flex-col gap-6">
                  {/* Assessment Section */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Assessment Response
                        </h3>
                        <p className="text-sm text-gray-600">
                          {assessmentResponse?.title || "Skills Assessment"}
                        </p>
                        {assessmentResponse?.subtitle && (
                          <p className="text-xs text-gray-500 mt-1">
                            {assessmentResponse.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Assessment Stats */}
                    {assessmentResponse?.questions && (
                      <div className="flex flex-row justify-between">
                        <div className="flex w-full items-center gap-4 mt-4 pt-4 border-t border-indigo-200">
                          <div className="flex w-full justify-between gap-4">
                            <div className="flex justify-center gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">
                                  {
                                    assessmentResponse.questions.filter(
                                      (q) => q.type !== "assessment_results",
                                    ).length
                                  }{" "}
                                  Questions
                                </span>
                              </div>
                              {assessmentResponse.questions.find(
                                (q) => q.type === "assessment_results",
                              )?.category_results && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                  <span className="text-sm text-gray-600">
                                    {assessmentResponse.questions.find(
                                      (q) => q.type === "assessment_results",
                                    )?.category_results?.length || 0}{" "}
                                    Categories
                                  </span>
                                </div>
                              )}
                            </div>

                            <PrimaryButton
                              text={"Preview Assessment"}
                              icon={
                                previewMode === "assessment" ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )
                              }
                              onClick={() =>
                                setPreviewMode(
                                  previewMode === "assessment"
                                    ? null
                                    : "assessment",
                                )
                              }
                              style={
                                previewMode === "assessment"
                                  ? "destructive"
                                  : "outline"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Assessment Scores with Sliders */}
                  <div className="pt-4 border-t border-gray-200">
                    <SkillSliderRating
                      title="Individual Assessment Scores"
                      skills={skillRatings}
                      onChange={(skillId, value) => {
                        updateRating(skillId, value); // Trabajar directamente con 0-10
                      }}
                      onSave={saveRatings}
                      hasChanges={hasChanges}
                      isSaving={isSaving}
                      initialEditMode={isScoresEditable}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog for selecting event type */}
      {showLinkDialog && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
            onClick={() => setShowLinkDialog(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[70] bg-white rounded-lg shadow-xl p-6 w-[500px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Select Event Type
              </h3>
              <button
                onClick={() => setShowLinkDialog(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Choose the type of interview event to generate a scheduling link
              for {jobSeeker?.name}.
            </p>

            <div className="space-y-3 mb-6">
              {isLoadingEventTypes ? (
                <div className="text-center py-4 text-sm text-gray-500">
                  Loading event types...
                </div>
              ) : eventTypes && eventTypes.length > 0 ? (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {eventTypes.map((eventType: any) => (
                    <button
                      key={eventType.uri}
                      onClick={() => setSelectedEventType(eventType.uri)}
                      className={`w-full text-left p-3 border rounded-lg transition-colors ${
                        selectedEventType === eventType.uri
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {eventType.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {eventType.duration} minutes
                          </div>
                        </div>
                        {selectedEventType === eventType.uri && (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">
                  No event types available
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLinkDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCalendlyLink}
                disabled={!selectedEventType || isGeneratingLink}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGeneratingLink ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    Generate Link
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
