"use client";

import {
  FormCard,
  TextareaInput,
  PrimaryButton,
  SecondaryButton,
} from "@/components/design-system";
import { HelpCircle, CheckCircle } from "lucide-react";
import type { AssessmentQuestion } from "@/types/assessment-question";

interface PreviewFreeInputQuestionProps {
  question: AssessmentQuestion;
  questionNumber: number;
  answer: string;
  isSubmitted: boolean;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onEdit: () => void;
}

export function PreviewFreeInputQuestion({
  question,
  questionNumber,
  answer,
  isSubmitted,
  onAnswerChange,
  onSubmit,
  onEdit,
}: PreviewFreeInputQuestionProps) {
  return (
    <FormCard title={question.title} icon={<HelpCircle className="h-5 w-5" />}>
      <div className="flex flex-col gap-4">
        {/* Question Description */}
        {question.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {question.description}
          </p>
        )}

        {/* Answer Textarea */}
        <TextareaInput
          label=""
          name={`question_${questionNumber}_answer`}
          id={`question_${questionNumber}_answer`}
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          rows={5}
          maxLength={question.max_characters || 1000}
          showCharacterCount={true}
          disabled={isSubmitted}
        />

        {/* Submit/Edit Button */}
        <div className="flex justify-end">
          {isSubmitted ? (
            <SecondaryButton
              text="Edit Answer"
              icon={<CheckCircle />}
              onClick={onEdit}
              className="w-full sm:w-auto"
            />
          ) : (
            <PrimaryButton
              text="Check Answer"
              onClick={onSubmit}
              disabled={!answer?.trim()}
              className="w-full sm:w-auto"
            />
          )}
        </div>
      </div>
    </FormCard>
  );
}
