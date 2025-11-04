"use client";

import { X, Save, Send, Eye, EyeOff } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { AssessmentScoresCard } from "./job-applicants-assessment-scores-card";
import { useAssessmentResponse } from "../../../(job-seeker)/jobs/_services/assessment-response-service";
import { SkillRatingGroup } from "@/components/design-system/skill-rating";
import { useSkillRatings } from "@/hooks/useSkillRatings";
import { AssessmentPreview } from "@/components/assessment/assessment-preview";
import { SkillSliderRating } from "@/components/design-system/skill-slider-rating";
import { PrimaryButton } from "@/components/design-system";

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
  onInviteToInterview,
  onUpdateStatusAndSubStatus,
}: TaskDrawerProps) {
  const [subStatus, setSubStatus] = useState(jobSeeker?.sub_status || "");
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    status: string;
    subStatus: string;
  } | null>(null);
  const [showAssessmentPreview, setShowAssessmentPreview] = useState(false);

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

  // Actualizar substatus cuando cambie el jobSeeker
  useEffect(() => {
    if (jobSeeker) {
      setSubStatus(jobSeeker.sub_status || "");
    }
  }, [jobSeeker]);

  const handleInviteToInterview = () => {
    if (jobSeeker?.application_id) {
      onUpdateStatusAndSubStatus(
        jobSeeker.application_id,
        "in_progress",
        "Invited to Pollen Interview",
      );
    }
  };

  const handleNotProgressing = () => {
    if (jobSeeker?.application_id) {
      onUpdateStatusAndSubStatus(
        jobSeeker.application_id,
        "complete",
        "Not Progressing",
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

  // Determinar si los scores son editables (solo en new_applicants)
  const isScoresEditable = jobSeeker?.status === "new_applicants";

  // Helper para determinar el estilo del botón según si es el sub_status actual o pendiente
  const getButtonStyle = (buttonSubStatus: string, isDestructive = false) => {
    const isCurrentStatus = jobSeeker?.sub_status === buttonSubStatus;
    const isPendingStatus = pendingStatusChange?.subStatus === buttonSubStatus;

    if (isCurrentStatus && !pendingStatusChange) {
      return isDestructive
        ? "px-4 py-3 bg-red-100 text-red-700 border-2 border-red-300 font-medium rounded-lg cursor-default"
        : "px-4 py-3 bg-blue-100 text-blue-700 border-2 border-blue-300 font-medium rounded-lg cursor-default";
    }

    if (isPendingStatus) {
      return isDestructive
        ? "px-4 py-3 bg-yellow-100 text-yellow-800 border-2 border-yellow-400 font-medium rounded-lg"
        : "px-4 py-3 bg-yellow-100 text-yellow-800 border-2 border-yellow-400 font-medium rounded-lg";
    }

    return isDestructive
      ? "px-4 py-3 bg-white text-red-600 border border-red-200 font-medium rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
      : "px-4 py-3 bg-white text-gray-700 border border-gray-200 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors";
  };

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
        {/* Left Panel - Assessment Preview (50%) - Conditional */}
        {showAssessmentPreview && (
          <div className="w-1/2 bg-gray-50 shadow-xl overflow-hidden border-r border-gray-300">
            <div className="flex flex-col h-full">
              {/* Left Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold">Assessment Preview</div>
                </div>
              </div>

              {/* Left Content - Assessment Responses */}
              <div className="flex-1 overflow-y-auto p-6">
                <AssessmentPreview
                  title={assessmentResponse?.title}
                  subtitle={assessmentResponse?.subtitle}
                  questions={assessmentResponse?.questions || []}
                  showCategorySummary={true}
                  isLoading={isLoadingAssessment}
                  error={assessmentError?.message}
                />
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
            <div className="flex-1 overflow-y-auto p-6">
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
                              text={"Toggle Preview"}
                              icon={
                                showAssessmentPreview ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )
                              }
                              onClick={() =>
                                setShowAssessmentPreview(!showAssessmentPreview)
                              }
                              style={
                                showAssessmentPreview
                                  ? "destructive"
                                  : "outline"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sub Status */}
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Current Sub Status
                    </label>
                    <div className="mt-2">
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          <span className="text-blue-800 font-medium text-sm">
                            {subStatus || "No status assigned"}
                          </span>
                        </div>
                      </div>
                    </div>
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

                  {/* Action Buttons - 2 botones para new_applicants */}
                  {isScoresEditable && (
                    <div className="pt-6 border-t border-gray-200 mt-6">
                      <div className="space-y-3">
                        {/* Invited to Pollen Interview Button */}
                        <button
                          onClick={handleInviteToInterview}
                          className="w-full px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Invited to Pollen Interview
                        </button>

                        {/* Not Progressing Button */}
                        <button
                          onClick={handleNotProgressing}
                          className="w-full px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Not Progressing
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sub Status Action Card - Only show when status is not new_applicants */}
                  {jobSeeker.status !== "new_applicants" && (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Update Sub Status
                          </h3>
                          {subStatus && (
                            <div className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-blue-200">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-blue-700 font-medium text-sm">
                                Current: {subStatus}
                              </span>
                            </div>
                          )}
                        </div>

                        {jobSeeker.status === "in_progress" && (
                          <div className=" flex flex-row justify-center gap-6 ">
                            <button
                              onClick={() =>
                                handleStatusSelect(
                                  "matched_to_employer",
                                  "Interview Requested",
                                )
                              }
                              className="flex px-4 py-3 bg-white text-gray-700 border border-gray-200 font-medium rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors text-left"
                            >
                              Pollen Interview Complete
                            </button>
                            <button
                              onClick={() =>
                                handleStatusSelect(
                                  "complete",
                                  "Not Progressing",
                                )
                              }
                              className={getButtonStyle("", true)}
                            >
                              Not Progressing
                            </button>
                          </div>
                        )}

                        {jobSeeker.status === "matched_to_employer" && (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() =>
                                handleStatusSelect(
                                  "matched_to_employer",
                                  "Interview Booked",
                                )
                              }
                              className={getButtonStyle("Interview Booked")}
                            >
                              Interview Booked
                            </button>
                            <button
                              onClick={() =>
                                handleStatusSelect(
                                  "matched_to_employer",
                                  "Interview Complete",
                                )
                              }
                              className={getButtonStyle("Interview Complete")}
                            >
                              Interview Complete
                            </button>
                            <button
                              onClick={() =>
                                handleStatusSelect(
                                  "matched_to_employer",
                                  "Awaiting Employer",
                                )
                              }
                              className={getButtonStyle("Awaiting Employer")}
                            >
                              Awaiting Employer
                            </button>
                            <button
                              onClick={() =>
                                handleStatusSelect(
                                  "matched_to_employer",
                                  "Offer Issued",
                                )
                              }
                              className={getButtonStyle("Offer Issued")}
                            >
                              Offer Issued
                            </button>
                            <button
                              onClick={() =>
                                handleStatusSelect(
                                  "complete",
                                  "Not Progressing",
                                )
                              }
                              className={getButtonStyle("", true)}
                            >
                              Not Progressing
                            </button>
                            <button
                              onClick={() =>
                                handleStatusSelect("complete", "Hired")
                              }
                              className="px-4 py-3 bg-white text-green-600 border border-green-200 font-medium rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                            >
                              Hired
                            </button>
                          </div>
                        )}

                        {/* Save/Cancel Buttons - Show when there's a pending change */}
                        {pendingStatusChange && (
                          <div className="mt-4 pt-4 border-t border-gray-300">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                <p className="text-sm text-yellow-800">
                                  <span className="font-medium">
                                    Pending change:
                                  </span>{" "}
                                  {pendingStatusChange.subStatus || "No status"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={handleSaveStatusChange}
                                className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                              >
                                <Save className="w-4 h-4" />
                                Save Changes
                              </button>
                              <button
                                onClick={handleCancelStatusChange}
                                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
    </>
  );
}
