"use client";

import { Lightbulb, BarChart3, MessageSquare, TrendingUp } from "lucide-react";

const ASSESSMENT_CRITERIA = [
  {
    id: "score1",
    label: "Creative Campaign Development",
    icon: Lightbulb,
  },
  {
    id: "score2",
    label: "Data Analysis & Insights",
    icon: BarChart3,
  },
  {
    id: "score3",
    label: "Communication & Presentation",
    icon: MessageSquare,
  },
  {
    id: "score4",
    label: "Strategic Thinking",
    icon: TrendingUp,
  },
];

interface AssessmentScoresCardProps {
  scores: {
    score1: number;
    score2: number;
    score3: number;
    score4: number;
  };
  isEditable: boolean;
  onScoreChange?: (criteriaId: string, value: number) => void;
}

export function AssessmentScoresCard({
  scores,
  isEditable,
  onScoreChange,
}: AssessmentScoresCardProps) {
  const handleSliderChange = (criteriaId: string, value: number) => {
    if (isEditable && onScoreChange) {
      onScoreChange(criteriaId, value);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Individual Assessment Scores
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Rate performance across key areas (0-10 scale)
        </p>
      </div>

      {/* Criteria List */}
      <div className="space-y-6">
        {ASSESSMENT_CRITERIA.map((criteria) => {
          const IconComponent = criteria.icon;
          const score = scores[criteria.id] || 0;

          return (
            <div key={criteria.id} className="space-y-2">
              {/* Label and Score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {criteria.label}
                  </span>
                </div>
                <span className="text-lg font-bold text-pink-600">
                  {score}/10
                </span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={score}
                  onChange={(e) =>
                    handleSliderChange(criteria.id, Number(e.target.value))
                  }
                  disabled={!isEditable}
                  className={`
                    w-full h-2 rounded-lg appearance-none
                    ${isEditable ? "cursor-pointer" : "cursor-not-allowed opacity-70"}
                  `}
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(score / 10) * 100}%, #e5e7eb ${(score / 10) * 100}%, #e5e7eb 100%)`,
                  }}
                />

                {/* Scale labels */}
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit mode indicator */}
      {!isEditable && (
        <div className="mt-4 text-xs text-gray-400 italic">
          Scores can only be edited when status is &quot;New Applicants&quot;
        </div>
      )}
    </div>
  );
}
