"use client";

import { X, Save, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { AssessmentScoresCard } from "./job-applicants-assessment-scores-card";
import { useAssessmentResponse } from "../../../(job-seeker)/jobs/_services/assessment-response-service";

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
  const [assessmentScores, setAssessmentScores] = useState({
    score1: 0,
    score2: 0,
    score3: 0,
    score4: 0,
  });
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    status: string;
    subStatus: string;
  } | null>(null);
  const [hasScoreChanges, setHasScoreChanges] = useState(false);
  const [originalScores, setOriginalScores] = useState({
    score1: 0,
    score2: 0,
    score3: 0,
    score4: 0,
  });

  // Fetch assessment response data
  const {
    data: assessmentResponse,
    isLoading: isLoadingAssessment,
    error: assessmentError,
  } = useAssessmentResponse(jobSeeker?.assessment_response_id);

  // Actualizar substatus y scores cuando cambie el jobSeeker
  useEffect(() => {
    if (jobSeeker) {
      setSubStatus(jobSeeker.sub_status || "");

      // Cargar scores desde la BD
      const scores = {
        score1: jobSeeker.score1 || 0,
        score2: jobSeeker.score2 || 0,
        score3: jobSeeker.score3 || 0,
        score4: jobSeeker.score4 || 0,
      };

      setAssessmentScores(scores);
      setOriginalScores(scores);
      setHasScoreChanges(false);
    }
  }, [jobSeeker]);

  const handleScoreChange = (criteriaId: string, value: number) => {
    // Actualizar estado local
    setAssessmentScores((prev) => {
      const newScores = {
        ...prev,
        [criteriaId]: value,
      };

      // Verificar si hay cambios comparando con scores originales
      const hasChanges = Object.keys(newScores).some(
        (key) => newScores[key] !== originalScores[key],
      );
      setHasScoreChanges(hasChanges);

      return newScores;
    });
  };

  const handleSaveScores = () => {
    // Guardar en BD cuando se hace click en el botón
    if (jobSeeker?.application_id) {
      onUpdateScores(jobSeeker.application_id, assessmentScores);
      setOriginalScores(assessmentScores);
      setHasScoreChanges(false);
    }
  };

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

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-screen-lg bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold">
                {jobSeeker.name} - Assessment
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {jobSeeker && (
              <div className="flex flex-col gap-6">
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

                {/* Assessment Responses Section */}
                <div className="pt-4 border-t border-gray-200">
                  {isLoadingAssessment ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="space-y-3">
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ) : assessmentError ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700 text-sm">
                        Error loading assessment responses:{" "}
                        {assessmentError.message}
                      </p>
                    </div>
                  ) : !assessmentResponse ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <p className="text-gray-600 text-center">
                        No assessment responses available for this candidate.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Assessment Responses
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Skills Assessment
                        </span>
                      </div>

                      {/* Assessment Info */}
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">
                          {assessmentResponse.title || "Assessment"}
                        </h4>
                        <p className="text-sm text-blue-700">
                          {assessmentResponse.subtitle ||
                            "Assessment completed by the candidate"}
                        </p>
                      </div>

                      {/* Questions and Responses */}
                      <div className="space-y-8">
                        {assessmentResponse.questions?.map(
                          (question, index) => {
                            const userAnswer = question.user_answer;

                            return (
                              <div
                                key={question.id || index}
                                className="border-b border-gray-100 pb-6 last:border-b-0"
                              >
                                {/* Question */}
                                <div className="mb-4">
                                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {question.title}
                                  </h3>
                                  {question.description && (
                                    <p className="text-sm text-gray-600">
                                      {question.description}
                                    </p>
                                  )}
                                </div>

                                {/* Answer */}
                                <div className="ml-4">
                                  {question.type === "multiple_choice" ? (
                                    <div>
                                      {/* Multiple Choice Options */}
                                      <div className="space-y-2 mb-4">
                                        {question.multiple_choice?.options?.map(
                                          (option) => {
                                            const isSelected =
                                              userAnswer?.selected_value ===
                                                option.value ||
                                              userAnswer?.text_response ===
                                                option.value;

                                            return (
                                              <div
                                                key={option.value}
                                                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                                                  isSelected
                                                    ? "bg-blue-50 border-blue-200 text-blue-900"
                                                    : "bg-gray-50 border-gray-200 text-gray-700"
                                                }`}
                                              >
                                                <div
                                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                    isSelected
                                                      ? "border-blue-500 bg-blue-500"
                                                      : "border-gray-300"
                                                  }`}
                                                >
                                                  {isSelected && (
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                  )}
                                                </div>
                                                <span
                                                  className={
                                                    isSelected
                                                      ? "font-medium"
                                                      : ""
                                                  }
                                                >
                                                  {option.label || option.value}
                                                </span>
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>

                                      {/* No answer provided */}
                                      {!userAnswer?.selected_value &&
                                        !userAnswer?.text_response && (
                                          <div className="text-gray-500 italic p-3">
                                            No se proporcionó respuesta
                                          </div>
                                        )}
                                    </div>
                                  ) : question.type === "free_input" ? (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                      {userAnswer?.text_response ? (
                                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                          {userAnswer.text_response}
                                        </p>
                                      ) : (
                                        <p className="text-gray-500 italic">
                                          No se proporcionó respuesta
                                        </p>
                                      )}
                                    </div>
                                  ) : question.type === "file_upload" ? (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                      {userAnswer?.uploaded_file ? (
                                        <div className="flex items-center space-x-3">
                                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg
                                              className="w-5 h-5 text-blue-600"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                              />
                                            </svg>
                                          </div>
                                          <div>
                                            <p className="font-medium text-gray-900">
                                              {userAnswer.uploaded_file.name ||
                                                "Archivo subido"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                              {userAnswer.uploaded_file.size
                                                ? `${(userAnswer.uploaded_file.size / (1024 * 1024)).toFixed(1)} MB`
                                                : "Tamaño desconocido"}
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <p className="text-gray-500 italic">
                                          No se subió archivo
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 italic">
                                      Tipo de pregunta no reconocido
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Assessment Scores Card */}
                <div className="pt-4 border-t border-gray-200">
                  <AssessmentScoresCard
                    scores={assessmentScores}
                    isEditable={isScoresEditable}
                    onScoreChange={handleScoreChange}
                  />

                  {/* Action Buttons - 3 botones para new_applicants */}
                  {isScoresEditable && (
                    <div className="space-y-3 mt-6">
                      {/* Save Score Button - Solo activo si hay cambios */}
                      <button
                        onClick={handleSaveScores}
                        disabled={!hasScoreChanges}
                        className={`w-full px-4 py-2.5 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                          hasScoreChanges
                            ? "bg-pink-600 text-white hover:bg-pink-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <Save className="w-4 h-4" />
                        Save Score
                      </button>

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
                              handleStatusSelect("complete", "Not Progressing")
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
                              handleStatusSelect("complete", "Not Progressing")
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
