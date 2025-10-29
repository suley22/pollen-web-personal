"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateAssessment,
  useUpdateAssessment,
} from "../../_services/assessments-page-service";
import { AdminRoutes } from "@/admin/router";
import type { Assessment } from "@/types/assessment-types";

export interface ReferenceFile {
  id: string;
  name: string; // Display name for the link
  file: File | null; // File object (uploaded on save, not immediately)
  fileName: string; // Original file name
}

export interface FileUploadQuestion {
  title: string;
  subtitle: string;
  referenceFiles: ReferenceFile[]; // Multiple reference files
}

export function useAssessmentCreateFileUpload({
  assessment,
}: { assessment?: Assessment } = {}) {
  const router = useRouter();
  const createAssessmentMutation = useCreateAssessment();
  const updateAssessmentMutation = useUpdateAssessment();

  const [questions, setQuestions] = useState<FileUploadQuestion[]>([]);

  // Form state for adding/editing questions
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionSubtitle, setQuestionSubtitle] = useState("");
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([]);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

  // Initialize state from assessment data (edit mode)
  useEffect(() => {
    if (assessment && assessment.questions && assessment.questions.length > 0) {
      const loadedQuestions = assessment.questions.map((q) => ({
        title: q.title,
        subtitle: q.subtitle || "",
        referenceFiles: (q.file_upload?.referenceFiles || []).map((rf) => ({
          id: rf.id,
          name: rf.name,
          fileName: rf.fileName,
          file: rf.file || null,
        })),
      }));
      setQuestions(loadedQuestions);
    }
  }, [assessment]);

  // Reference file management
  const handleAddReferenceFile = (name: string, file: File) => {
    const newFile: ReferenceFile = {
      id: `ref-${Date.now()}-${Math.random()}`,
      name,
      file,
      fileName: file.name,
    };
    setReferenceFiles((prev) => [...prev, newFile]);
  };

  const handleRemoveReferenceFile = (id: string) => {
    setReferenceFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleUpdateReferenceFileName = (id: string, newName: string) => {
    setReferenceFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, name: newName } : file)),
    );
  };

  // Question management
  const handleAddQuestion = () => {
    if (!questionTitle.trim()) {
      return;
    }

    const newQuestion: FileUploadQuestion = {
      title: questionTitle.trim(),
      subtitle: questionSubtitle.trim(),
      referenceFiles: [...referenceFiles],
    };

    if (editingQuestionIndex !== null) {
      // Update existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editingQuestionIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditingQuestionIndex(null);
    } else {
      // Add new question
      setQuestions((prev) => [...prev, newQuestion]);
    }

    handleClearForm();

    // Scroll to preview after adding question
    setTimeout(() => {
      const previewElement = document.getElementById(
        "file-upload-preview-section",
      );
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleEditQuestion = (index: number) => {
    const question = questions[index];
    setQuestionTitle(question.title);
    setQuestionSubtitle(question.subtitle);
    setReferenceFiles([...question.referenceFiles]);
    setEditingQuestionIndex(index);

    // Scroll to form
    setTimeout(() => {
      const formElement = document.getElementById(
        "file-upload-question-form-card",
      );
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    if (editingQuestionIndex === index) {
      handleClearForm();
    }
  };

  const handleMoveQuestionUp = (index: number) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    [newQuestions[index - 1], newQuestions[index]] = [
      newQuestions[index],
      newQuestions[index - 1],
    ];
    setQuestions(newQuestions);
  };

  const handleMoveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index + 1]] = [
      newQuestions[index + 1],
      newQuestions[index],
    ];
    setQuestions(newQuestions);
  };

  const handleClearForm = () => {
    setQuestionTitle("");
    setQuestionSubtitle("");
    setReferenceFiles([]);
    setEditingQuestionIndex(null);
  };

  // Navigation and submit
  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (
    assessmentType: "file_upload",
    assessmentData: {
      internal_pollen_title?: string;
      title: string;
      subtitle?: string;
      estimated_duration?: string;
      instructions_title?: string;
      instructions_description?: string;
    },
  ) => {
    try {
      // Validate required fields
      if (!assessmentData.title.trim()) {
        throw new Error("Assessment title is required");
      }

      // Only validate questions if this is a file_upload assessment
      if (assessmentType === "file_upload" && questions.length === 0) {
        throw new Error("At least one question is required");
      }

      const assessmentInput = {
        internal_pollen_title:
          assessmentData.internal_pollen_title || undefined,
        title: assessmentData.title,
        subtitle: assessmentData.subtitle || undefined,
        estimated_duration: assessmentData.estimated_duration || undefined,
        instructions_title: assessmentData.instructions_title || undefined,
        instructions_description:
          assessmentData.instructions_description || undefined,
        type: assessmentType,
        questions: questions.map((q) => ({
          title: q.title,
          subtitle: q.subtitle,
          type: assessmentType,
          file_upload: {
            referenceFiles: q.referenceFiles,
          },
        })),
      };

      // Use update mutation if assessment exists, otherwise create
      const result = assessment?.id
        ? await updateAssessmentMutation.mutateAsync({
            id: assessment.id,
            input: assessmentInput,
          })
        : await createAssessmentMutation.mutateAsync(assessmentInput);

      console.log(
        assessment?.id
          ? "Assessment updated successfully:"
          : "Assessment created successfully:",
        result,
      );

      // Navigate to assessments list
      router.push(AdminRoutes.assessments);
    } catch (error) {
      console.error("Failed to create assessment:", error);
      throw error;
    }
  };

  const handleCancelEdit = () => {
    handleClearForm();
  };

  return {
    // Questions state
    questions,

    // Form state
    questionTitle,
    setQuestionTitle,
    questionSubtitle,
    setQuestionSubtitle,
    referenceFiles,
    editingQuestionIndex,

    // Reference file handlers
    handleAddReferenceFile,
    handleRemoveReferenceFile,
    handleUpdateReferenceFileName,

    // Question handlers
    handleAddQuestion,
    handleEditQuestion,
    handleRemoveQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,
    handleClearForm,
    handleCancelEdit,

    // Navigation and submit
    handleBack,
    handleSubmit,
    isSaving: createAssessmentMutation.isPending,
    saveError: createAssessmentMutation.error,
  };
}
