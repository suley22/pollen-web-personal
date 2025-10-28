"use client";

import { FormCard } from "@/components/design-system";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import type { AssessmentQuestion } from "@/types/assessment-question";

interface AssessmentQuestionCardProps {
  question: AssessmentQuestion;
  questionNumber: number;
  selectedValue?: string;
  onAnswerChange: (questionId: string, optionValue: string) => void;
}

export function AssessmentQuestionCard({
  question,
  questionNumber,
  selectedValue,
  onAnswerChange,
}: AssessmentQuestionCardProps) {
  return (
    <FormCard title={question.title} icon={<HelpCircle className="h-5 w-5" />}>
      <div className="flex flex-col gap-4">
        {question.description && (
          <p className="text-sm text-gray-600">{question.description}</p>
        )}

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-semibold text-gray-700">
            {question.options_title}
          </Label>

          <div className="flex flex-col gap-3 mt-2">
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`${question.id}-${option.value}`}
                  name={question.id}
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
                <Label
                  htmlFor={`${question.id}-${option.value}`}
                  className="font-normal cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormCard>
  );
}
