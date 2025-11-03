"use client";

import { useState, useMemo } from "react";
import { AssessmentProgress } from "@/app/(pages)/(portal)/admin/assessments/_components/assessment-progress";
import { AssessmentCategoryProgress } from "@/app/(pages)/(portal)/admin/assessments/_components/assessment-category-progress";
import { PageHeader, InfoCard, Divider } from "@/components/design-system";
import { PreviewMultipleChoiceQuestion } from "@/app/(pages)/(portal)/admin/assessments/create/_components/preview-multiple-choice-question";
import { PreviewFreeInputQuestion } from "@/app/(pages)/(portal)/admin/assessments/create/_components/preview-free-input-question";
import { PreviewFileUploadQuestion } from "@/app/(pages)/(portal)/admin/assessments/create/_components/preview-file-upload-question";
import type { AssessmentQuestion } from "@/types/assessment-question";
import type { AssessmentCategory } from "@/types/assessment-types";
import { useToastNotifications } from "@/hooks/useToastNotifications";

interface AssessmentPreviewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  questions: AssessmentQuestion[];
  categories?: AssessmentCategory[];
}

interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

export function AssessmentPreview({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  questions,
  categories = [],
}: AssessmentPreviewProps) {
  const { showError } = useToastNotifications();

  // Estado para Multiple Choice questions
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<
    Record<string, string>
  >({});

  // Estado para Free Input questions
  const [freeInputAnswers, setFreeInputAnswers] = useState<
    Record<number, string>
  >({});
  const [freeInputSubmitted, setFreeInputSubmitted] = useState<Set<number>>(
    new Set(),
  );

  // Estado para File Upload questions
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, UploadedFile | null>
  >({});
  const [fileUploadSubmitted, setFileUploadSubmitted] = useState<Set<number>>(
    new Set(),
  );

  // Handlers para Multiple Choice
  const handleMultipleChoiceChange = (
    questionId: string,
    optionValue: string,
  ) => {
    setMultipleChoiceAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  // Handlers para Free Input
  const handleFreeInputChange = (index: number, value: string) => {
    setFreeInputAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleFreeInputSubmit = (index: number) => {
    if (freeInputAnswers[index]?.trim()) {
      setFreeInputSubmitted((prev) => new Set(prev).add(index));
    }
  };

  const handleFreeInputEdit = (index: number) => {
    setFreeInputSubmitted((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  // Handlers para File Upload
  const handleFileUpload = (questionIndex: number, file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      file,
    };

    setUploadedFiles((prev) => ({
      ...prev,
      [questionIndex]: newFile,
    }));
  };

  const handleRemoveFile = (questionIndex: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [questionIndex]: null,
    }));
  };

  const handleFileUploadSubmit = (index: number) => {
    const hasFile =
      uploadedFiles[index] !== null && uploadedFiles[index] !== undefined;
    if (hasFile) {
      setFileUploadSubmitted((prev) => new Set(prev).add(index));
    }
  };

  const handleFileUploadEdit = (index: number) => {
    setFileUploadSubmitted((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  // Calculate progress
  const getAnsweredCount = () => {
    return (
      Object.keys(multipleChoiceAnswers).length +
      freeInputSubmitted.size +
      fileUploadSubmitted.size
    );
  };

  const getPercentage = () => {
    const total = questions.length;
    if (total === 0) return 0;
    return Math.round((getAnsweredCount() / total) * 100);
  };

  // Calculate category breakdown (only for multiple choice questions)
  const categoryBreakdown = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    let totalAnswered = 0;

    Object.entries(multipleChoiceAnswers).forEach(
      ([questionId, optionValue]) => {
        const questionIndex = parseInt(questionId.split("-")[1]);
        const question = questions[questionIndex];

        if (question?.type === "multiple_choice" && question.options) {
          const selectedOption = question.options.find(
            (opt) => opt.value === optionValue,
          );
          if (selectedOption?.categoryId) {
            categoryCounts.set(
              selectedOption.categoryId,
              (categoryCounts.get(selectedOption.categoryId) || 0) + 1,
            );
            totalAnswered++;
          }
        }
      },
    );

    return categories
      .map((category) => {
        const count = categoryCounts.get(category.id) || 0;
        const percentage =
          totalAnswered > 0 ? Math.round((count / totalAnswered) * 100) : 0;
        return {
          ...category,
          count,
          percentage,
        };
      })
      .filter((cat) => cat.count > 0);
  }, [multipleChoiceAnswers, questions, categories]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Divider />

      <PageHeader title={assessmentTitle} subtitle={assessmentDescription} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Instructions */}
          {instructionsTitle && instructionsDescription && (
            <InfoCard
              title={instructionsTitle}
              description={instructionsDescription}
              color="blue"
            />
          )}

          {/* Questions */}
          {questions.map((question, index) => {
            const questionId = `q-${index}`;

            return (
              <div key={index} className="relative">
                {/* Multiple Choice Question */}
                {question.type === "multiple_choice" && (
                  <PreviewMultipleChoiceQuestion
                    question={question}
                    questionNumber={index + 1}
                    questionId={questionId}
                    selectedValue={multipleChoiceAnswers[questionId]}
                    onAnswerChange={handleMultipleChoiceChange}
                  />
                )}

                {/* Free Input Question */}
                {question.type === "free_input" && (
                  <PreviewFreeInputQuestion
                    question={question}
                    questionNumber={index + 1}
                    answer={freeInputAnswers[index] || ""}
                    isSubmitted={freeInputSubmitted.has(index)}
                    onAnswerChange={(value) =>
                      handleFreeInputChange(index, value)
                    }
                    onSubmit={() => handleFreeInputSubmit(index)}
                    onEdit={() => handleFreeInputEdit(index)}
                  />
                )}

                {/* File Upload Question */}
                {question.type === "file_upload" && (
                  <PreviewFileUploadQuestion
                    question={question}
                    questionNumber={index + 1}
                    uploadedFile={uploadedFiles[index]}
                    isSubmitted={fileUploadSubmitted.has(index)}
                    onFileUpload={(file) => handleFileUpload(index, file)}
                    onRemoveFile={() => handleRemoveFile(index)}
                    onSubmit={() => handleFileUploadSubmit(index)}
                    onEdit={() => handleFileUploadEdit(index)}
                    onError={showError}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Sidebar - 1/3 width */}
        <div className="space-y-6">
          <AssessmentProgress
            answeredCount={getAnsweredCount()}
            totalCount={questions.length}
            percentage={getPercentage()}
          />

          {/* Category Breakdown */}
          <AssessmentCategoryProgress categories={categoryBreakdown} />
        </div>
      </div>
    </div>
  );
}
