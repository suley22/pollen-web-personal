"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Assessment, AssessmentResponse } from "@/types/assessment";

interface UseAssessmentTestProps {
  assessment: Assessment;
  onSubmit?: (response: AssessmentResponse) => Promise<void>;
}

export function useAssessmentTest({
  assessment,
  onSubmit,
}: UseAssessmentTestProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnswerChange = (questionId: string, optionValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(answers).length;
  };

  const getTotalQuestionsCount = () => {
    return assessment.questions.length;
  };

  const isAllQuestionsAnswered = () => {
    return getAnsweredQuestionsCount() === getTotalQuestionsCount();
  };

  const getCompletionPercentage = () => {
    const total = getTotalQuestionsCount();
    if (total === 0) return 0;
    return Math.round((getAnsweredQuestionsCount() / total) * 100);
  };

  const handleSubmit = async () => {
    if (!isAllQuestionsAnswered()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response: AssessmentResponse = {
        assessment_id: assessment.id,
        answers,
        completed_at: new Date().toISOString(),
      };

      if (onSubmit) {
        await onSubmit(response);
      }

      // Navigate back or to results page
      router.push("/admin/assessments");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Failed to submit assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }
  };

  const handleBack = () => {
    if (getAnsweredQuestionsCount() > 0) {
      const confirmLeave = window.confirm(
        "You have unsaved answers. Are you sure you want to leave?",
      );
      if (!confirmLeave) return;
    }
    router.back();
  };

  return {
    answers,
    isSubmitting,
    isDialogOpen,
    setIsDialogOpen,
    handleAnswerChange,
    handleSubmit,
    handleBack,
    getAnsweredQuestionsCount,
    getTotalQuestionsCount,
    isAllQuestionsAnswered,
    getCompletionPercentage,
  };
}
