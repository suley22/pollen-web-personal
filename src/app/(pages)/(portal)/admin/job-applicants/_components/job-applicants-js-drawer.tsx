"use client";

import {
  X,
  Save,
  Send,
  Eye,
  EyeOff,
  Link as LinkIcon,
  ExternalLink,
  Copy,
  Check,
  Edit2,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
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
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [isSavingLink, setIsSavingLink] = useState(false);
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
      setIsEditingLink(false);
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

  const handleSaveCalendlyLink = () => {
    if (calendlyLink && jobSeeker?.application_id) {
      setIsSavingLink(true);
      onUpdateCalendlyLink(jobSeeker.application_id, calendlyLink);
      setTimeout(() => {
        setIsSavingLink(false);
        setIsEditingLink(false);
      }, 1000);
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

              {/* Calendly Interview Link Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-green-600" />
                      Interview Scheduling Link
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {calendlyLink
                        ? "Single-use link generated"
                        : "Generate a link to schedule an interview"}
                    </p>
                  </div>
                </div>

                {calendlyLink ? (
                  <div className="space-y-3">
                    <div className="bg-white border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-700">
                          Active Link
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={calendlyLink}
                          onChange={(e) => setCalendlyLink(e.target.value)}
                          readOnly={!isEditingLink}
                          className={`flex-1 text-sm border border-gray-200 rounded px-3 py-2 font-mono ${
                            isEditingLink
                              ? "bg-white text-gray-900"
                              : "bg-gray-50 text-gray-600"
                          }`}
                        />
                        {isEditingLink ? (
                          <>
                            <button
                              onClick={handleSaveCalendlyLink}
                              disabled={isSavingLink}
                              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 disabled:opacity-50"
                              title="Save link"
                            >
                              {isSavingLink ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                              ) : (
                                <Save className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setCalendlyLink(
                                  jobSeeker?.pollen_interview_invite_link ||
                                    null,
                                );
                                setIsEditingLink(false);
                              }}
                              className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors flex items-center gap-1"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setIsEditingLink(true)}
                              className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1"
                              title="Edit link"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
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
                              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
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
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                      ⚠️ This link can only be used once and will expire after
                      the event is scheduled.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLinkDialog(true)}
                    className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <LinkIcon className="w-5 h-5" />
                    Generate Interview Link
                  </button>
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
