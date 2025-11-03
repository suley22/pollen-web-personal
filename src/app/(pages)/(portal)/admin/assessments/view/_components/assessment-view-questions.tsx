"use client";

import { AssessmentQuestion } from "@/types/assessment-types";
import { AssessmentCreateUnifiedPreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-unified-preview";

interface AssessmentQuestionsProps {
  questions: AssessmentQuestion[];
  type: string;
  assessmentTitle?: string;
  assessmentDescription?: string;
  instructionsTitle?: string;
  instructionsDescription?: string;
  categories?: any[];
}

export function AssessmentQuestions({
  questions,
  type,
  assessmentTitle = "",
  assessmentDescription = "",
  instructionsTitle = "",
  instructionsDescription = "",
  categories = [],
}: AssessmentQuestionsProps) {
  // Convert new AssessmentQuestion format to old format expected by the unified preview
  const convertedQuestions = questions.map((q, index) => {
    // Base question structure with common fields
    const baseQuestion: any = {
      id: q.id || `question-${index}`,
      type: q.type,
      title: q.title,
      description: q.subtitle || "", // Map subtitle to description
    };

    // Add type-specific fields based on question type
    if (q.type === "multiple_choice" && q.multiple_choice) {
      baseQuestion.options_title = q.multiple_choice.options_title || "";
      baseQuestion.options = q.multiple_choice.options || [];
      baseQuestion.categoryId = q.multiple_choice.categoryId;
    } else if (q.type === "free_input" && q.free_input) {
      baseQuestion.max_characters = q.free_input.placeholder || "";
    } else if (q.type === "file_upload" && q.file_upload) {
      // For file_upload, we need to pass the file_upload object with referenceFiles
      baseQuestion.file_upload = {
        referenceFiles: q.file_upload.referenceFiles || [],
      };
    }

    return baseQuestion;
  });

  return (
    <AssessmentCreateUnifiedPreview
      assessmentTitle={assessmentTitle}
      assessmentDescription={assessmentDescription}
      instructionsTitle={instructionsTitle}
      instructionsDescription={instructionsDescription}
      questions={convertedQuestions}
      categories={categories}
      isEditMode={false}
    />
  );
}
