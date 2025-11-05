"use client";

import { Eye, EyeOff } from "lucide-react";
import { PrimaryButton } from "@/components/design-system";
import { SkillSliderRating } from "@/components/design-system/skill-slider-rating";

interface AssessmentSectionProps {
  assessmentResponse?: any;
  previewMode: "assessment" | "calendly" | null;
  skillRatings: any[];
  hasChanges: boolean;
  isSaving: boolean;
  isScoresEditable: boolean;
  onTogglePreview: () => void;
  onUpdateRating: (skillId: string, value: number) => void;
  onSaveRatings: () => void;
}

export function AssessmentSection({
  assessmentResponse,
  previewMode,
  skillRatings,
  hasChanges,
  isSaving,
  isScoresEditable,
  onTogglePreview,
  onUpdateRating,
  onSaveRatings,
}: AssessmentSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Assessment Info Card */}
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
                          (q: any) => q.type !== "assessment_results",
                        ).length
                      }{" "}
                      Questions
                    </span>
                  </div>
                  {assessmentResponse.questions.find(
                    (q: any) => q.type === "assessment_results",
                  )?.category_results && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {assessmentResponse.questions.find(
                          (q: any) => q.type === "assessment_results",
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
                  onClick={onTogglePreview}
                  style={
                    previewMode === "assessment" ? "destructive" : "outline"
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assessment Scores */}
      <div className="pt-4 border-t border-gray-200">
        <SkillSliderRating
          title="Individual Assessment Scores"
          skills={skillRatings}
          onChange={onUpdateRating}
          onSave={onSaveRatings}
          hasChanges={hasChanges}
          isSaving={isSaving}
          initialEditMode={isScoresEditable}
        />
      </div>
    </div>
  );
}
