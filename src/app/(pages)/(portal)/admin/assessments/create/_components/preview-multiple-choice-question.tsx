"use client";

import { AssessmentQuestionCard } from "../../_components/assessment-question-card";
import type { AssessmentQuestion } from "@/types/assessment-question";

interface PreviewMultipleChoiceQuestionProps {
  question: AssessmentQuestion;
  questionNumber: number;
  questionId: string;
  selectedValue?: string;
  onAnswerChange: (questionId: string, optionValue: string) => void;
}

export function PreviewMultipleChoiceQuestion({
  question,
  questionNumber,
  questionId,
  selectedValue,
  onAnswerChange,
}: PreviewMultipleChoiceQuestionProps) {
  return (
    <AssessmentQuestionCard
      question={{
        id: questionId,
        type: "multiple_choice",
        title: question.title,
        description: question.description,
        options_title: question.options_title || "",
        options: question.options || [],
      }}
      questionNumber={questionNumber}
      selectedValue={selectedValue}
      onAnswerChange={onAnswerChange}
    />
  );
}
