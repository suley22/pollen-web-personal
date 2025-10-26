"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

interface AssessmentProgressProps {
  answeredCount: number;
  totalCount: number;
  percentage: number;
}

export function AssessmentProgress({
  answeredCount,
  totalCount,
  percentage,
}: AssessmentProgressProps) {
  return (
    <Card className="p-6 sticky top-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Your Progress</h3>
          <span className="text-2xl font-bold text-blue-600">
            {percentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Questions Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Questions Answered</span>
          <span className="font-semibold">
            {answeredCount} / {totalCount}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mt-2">
          {answeredCount === totalCount ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                All questions answered!
              </span>
            </>
          ) : (
            <>
              <Circle className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {totalCount - answeredCount} question
                {totalCount - answeredCount !== 1 ? "s" : ""} remaining
              </span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
