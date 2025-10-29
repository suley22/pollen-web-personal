"use client";

import { AssessmentQuestion } from "@/types/assessment-types";
import { AssessmentCreateMultipleChoicePreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-multiple-choice-preview";
import { AssessmentCreateFreeInputPreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-free-input-preview";
import { AssessmentCreateFileUploadPreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-file-upload-preview";

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
  // Render the appropriate preview component based on type
  if (type === "multiple_choice") {
    const convertedQuestions = questions.map((q) => ({
      title: q.title,
      description: q.subtitle || "",
      options_title: q.multiple_choice?.options_title || "",
      options: q.multiple_choice?.options || [],
      categoryId: q.multiple_choice?.categoryId,
    }));

    return (
      <AssessmentCreateMultipleChoicePreview
        assessmentTitle={assessmentTitle}
        assessmentDescription={assessmentDescription}
        instructionsTitle={instructionsTitle}
        instructionsDescription={instructionsDescription}
        questions={convertedQuestions}
        categories={categories}
      />
    );
  }

  if (type === "free_input") {
    const convertedQuestions = questions.map((q) => ({
      title: q.title,
      subtitle: q.subtitle || "",
      placeholder: q.free_input?.placeholder || "",
    }));

    return (
      <AssessmentCreateFreeInputPreview
        assessmentTitle={assessmentTitle}
        assessmentDescription={assessmentDescription}
        instructionsTitle={instructionsTitle}
        instructionsDescription={instructionsDescription}
        questions={convertedQuestions}
      />
    );
  }

  if (type === "file_upload") {
    const convertedQuestions = questions.map((q) => ({
      title: q.title,
      subtitle: q.subtitle || "",
      referenceFiles:
        q.file_upload?.referenceFiles?.map((rf) => ({
          id: rf.id,
          name: rf.name,
          fileName: rf.fileName,
          file: rf.file || null,
        })) || [],
    }));

    return (
      <AssessmentCreateFileUploadPreview
        assessmentTitle={assessmentTitle}
        assessmentDescription={assessmentDescription}
        instructionsTitle={instructionsTitle}
        instructionsDescription={instructionsDescription}
        questions={convertedQuestions}
      />
    );
  }

  return null;
}
