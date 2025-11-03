"use client";

import { X, Save, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { AssessmentScoresCard } from "./job-applicants-assessment-scores-card";

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
  const [assessmentScores, setAssessmentScores] = useState({
    score1: 0,
    score2: 0,
    score3: 0,
    score4: 0,
  });

  // Actualizar substatus y scores cuando cambie el jobSeeker
  useEffect(() => {
    if (jobSeeker) {
      setSubStatus(jobSeeker.sub_status || "");

      // Cargar scores desde la BD
      setAssessmentScores({
        score1: jobSeeker.score1 || 0,
        score2: jobSeeker.score2 || 0,
        score3: jobSeeker.score3 || 0,
        score4: jobSeeker.score4 || 0,
      });
    }
  }, [jobSeeker]);

  const handleScoreChange = (criteriaId: string, value: number) => {
    // Solo actualizar estado local (no guardar automáticamente)
    setAssessmentScores((prev) => ({
      ...prev,
      [criteriaId]: value,
    }));
  };

  const handleSaveScores = () => {
    // Guardar en BD cuando se hace click en el botón
    if (jobSeeker?.application_id) {
      onUpdateScores(jobSeeker.application_id, assessmentScores);
    }
  };

  const handleInviteToInterview = () => {
    if (jobSeeker?.application_id) {
      onInviteToInterview(jobSeeker.application_id);
    }
  };

  // Determinar si los scores son editables (solo en new_applicants)
  const isScoresEditable = jobSeeker?.status === "new_applicants";

  // Helper para determinar el estilo del botón según si es el sub_status actual
  const getButtonStyle = (buttonSubStatus: string, isDestructive = false) => {
    const isCurrentStatus = jobSeeker?.sub_status === buttonSubStatus;

    if (isCurrentStatus) {
      return isDestructive
        ? "px-4 py-3 bg-red-100 text-red-700 border-2 border-red-300 font-medium rounded-lg cursor-default"
        : "px-4 py-3 bg-blue-100 text-blue-700 border-2 border-blue-300 font-medium rounded-lg cursor-default";
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

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-screen-lg bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="text-xl font-bold">
              {jobSeeker.name} - Assessment
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {jobSeeker && (
              <div className="flex flex-col gap-6">
                {/* Status and Sub Status - Side by side */}
                <div className="flex gap-6">
                  {/* Status */}
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Status
                    </label>
                    <div className="mt-2">
                      <span
                        className={`${jobSeeker.statusColor} text-white text-xs px-2 py-1 rounded-full`}
                      >
                        {jobSeeker.statusLabel}
                      </span>
                    </div>
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
                </div>

                {/* Assessment Scores Card */}
                <div className="pt-4 border-t border-gray-200">
                  <AssessmentScoresCard
                    scores={assessmentScores}
                    isEditable={isScoresEditable}
                    onScoreChange={handleScoreChange}
                  />

                  {/* Action Buttons */}
                  {isScoresEditable && (
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleSaveScores}
                        className="flex-1 px-4 py-2.5 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Score
                      </button>
                      <button
                        onClick={handleInviteToInterview}
                        className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Invite to Pollen Interview
                      </button>
                    </div>
                  )}
                </div>

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
                        <div className="space-y-2">
                          <button
                            onClick={() =>
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "matched_to_employer",
                                "Interview Requested",
                              )
                            }
                            className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-200 font-medium rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors text-left"
                          >
                            Pollen Interview Complete
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "not_progressing",
                                "",
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
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "matched_to_employer",
                                "Interview Booked",
                              )
                            }
                            className={getButtonStyle("Interview Booked")}
                            disabled={
                              jobSeeker?.sub_status === "Interview Booked"
                            }
                          >
                            Interview Booked
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "matched_to_employer",
                                "Interview Complete",
                              )
                            }
                            className={getButtonStyle("Interview Complete")}
                            disabled={
                              jobSeeker?.sub_status === "Interview Complete"
                            }
                          >
                            Interview Complete
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "matched_to_employer",
                                "Awaiting Employer",
                              )
                            }
                            className={getButtonStyle("Awaiting Employer")}
                            disabled={
                              jobSeeker?.sub_status === "Awaiting Employer"
                            }
                          >
                            Awaiting Employer
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "matched_to_employer",
                                "Offer Issued",
                              )
                            }
                            className={getButtonStyle("Offer Issued")}
                            disabled={jobSeeker?.sub_status === "Offer Issued"}
                          >
                            Offer Issued
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "not_progressing",
                                "",
                              )
                            }
                            className={getButtonStyle("", true)}
                          >
                            Not Progressing
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatusAndSubStatus(
                                jobSeeker.application_id,
                                "complete",
                                "Hired",
                              )
                            }
                            className="px-4 py-3 bg-white text-green-600 border border-green-200 font-medium rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                          >
                            Hired
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
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
    </>
  );
}
