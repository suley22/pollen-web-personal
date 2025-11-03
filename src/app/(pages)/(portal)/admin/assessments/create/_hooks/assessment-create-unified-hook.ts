"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  AssessmentQuestion,
  QuestionType,
} from "@/types/assessment-question";
import type { AssessmentCategory } from "@/types/assessment-types";
import { AdminRoutes } from "@/app/(pages)/(portal)/admin/router";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import {
  useCreateAssessment,
  useUpdateAssessment,
  useAssessmentById,
} from "@/app/(pages)/(portal)/admin/assessments/_services/assessments-page-service";

export function useAssessmentCreateUnified({
  id = null,
}: {
  id?: string | null;
}) {
  const router = useRouter();
  const { showSuccess, showError } = useToastNotifications();

  // Fetch assessment data if id is provided (edit mode)
  const { data: existingAssessment, isLoading: isLoadingAssessment } =
    useAssessmentById(id || "");

  // Assessment basic info
  const [internalPollenTitle, setInternalPollenTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [instructionsTitle, setInstructionsTitle] = useState("");
  const [instructionsDescription, setInstructionsDescription] = useState("");

  // Questions and categories
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [categories, setCategories] = useState<AssessmentCategory[]>([]);

  // Dialog states
  const [dialogType, setDialogType] = useState<QuestionType | null>(null);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

  // Mutations
  const createMutation = useCreateAssessment();
  const updateMutation = useUpdateAssessment();

  const isEditMode = !!id;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  // Load existing assessment data when in edit mode
  useEffect(() => {
    if (existingAssessment && id) {
      setInternalPollenTitle(existingAssessment.internal_pollen_title || "");
      setAssessmentTitle(existingAssessment.title || "");
      setAssessmentDescription(existingAssessment.subtitle || "");
      setEstimatedDuration(existingAssessment.estimated_duration || "");
      setInstructionsTitle(existingAssessment.instructions_title || "");
      setInstructionsDescription(
        existingAssessment.instructions_description || "",
      );

      // Load categories if available
      if (existingAssessment.categories) {
        setCategories(existingAssessment.categories);
      }

      // Load and convert questions from new format to old format
      if (existingAssessment.questions) {
        const convertedQuestions = existingAssessment.questions.map(
          (q: any, index: number) => {
            const baseQuestion: AssessmentQuestion = {
              id: q.id || `question-${index}`,
              type: q.type,
              title: q.title,
              description: q.subtitle || "",
            };

            // Add type-specific fields
            if (q.type === "multiple_choice" && q.multiple_choice) {
              baseQuestion.options_title =
                q.multiple_choice.options_title || "";
              baseQuestion.options = q.multiple_choice.options || [];
            } else if (q.type === "free_input" && q.free_input) {
              baseQuestion.max_characters = q.free_input.placeholder || "";
            } else if (q.type === "file_upload" && q.file_upload) {
              (baseQuestion as any).file_upload = {
                referenceFiles: q.file_upload.referenceFiles || [],
              };
            }

            return baseQuestion;
          },
        );
        setQuestions(convertedQuestions);
      }
    }
  }, [existingAssessment, id]);

  // Question management
  const handleAddQuestion = useCallback(
    (question: Omit<AssessmentQuestion, "id">) => {
      const newQuestion: AssessmentQuestion = {
        ...question,
        id: `temp_${Date.now()}`,
      };

      if (editingQuestionIndex !== null) {
        // Edit existing question
        const updatedQuestions = [...questions];
        updatedQuestions[editingQuestionIndex] = newQuestion;
        setQuestions(updatedQuestions);
        setEditingQuestionIndex(null);
      } else {
        // Add new question
        setQuestions([...questions, newQuestion]);
      }

      setDialogType(null);
    },
    [questions, editingQuestionIndex],
  );

  const handleEditQuestion = useCallback(
    (index: number) => {
      setEditingQuestionIndex(index);
      setDialogType(questions[index].type);
    },
    [questions],
  );

  const handleDeleteQuestion = useCallback(
    (index: number) => {
      setQuestions(questions.filter((_, i) => i !== index));
    },
    [questions],
  );

  const handleMoveQuestionUp = useCallback(
    (index: number) => {
      if (index === 0) return;
      const newQuestions = [...questions];
      [newQuestions[index - 1], newQuestions[index]] = [
        newQuestions[index],
        newQuestions[index - 1],
      ];
      setQuestions(newQuestions);
    },
    [questions],
  );

  const handleMoveQuestionDown = useCallback(
    (index: number) => {
      if (index === questions.length - 1) return;
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [
        newQuestions[index + 1],
        newQuestions[index],
      ];
      setQuestions(newQuestions);
    },
    [questions],
  );

  // Category management
  const handleAddCategory = useCallback(
    (category: Omit<AssessmentCategory, "id">) => {
      const newCategory: AssessmentCategory = {
        ...category,
        id: `temp_${Date.now()}`,
      };
      setCategories([...categories, newCategory]);
    },
    [categories],
  );

  const handleUpdateCategory = useCallback(
    (id: string, updates: Partial<AssessmentCategory>) => {
      setCategories(
        categories.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)),
      );
    },
    [categories],
  );

  const handleDeleteCategory = useCallback(
    (id: string) => {
      setCategories(categories.filter((cat) => cat.id !== id));
      // Remove category references from questions
      setQuestions(
        questions.map((q) => ({
          ...q,
          options: q.options?.map((opt) =>
            opt.categoryId === id ? { ...opt, categoryId: undefined } : opt,
          ),
        })),
      );
    },
    [categories, questions],
  );

  // Open dialog for adding new question
  const handleOpenDialog = useCallback((type: QuestionType) => {
    setEditingQuestionIndex(null);
    setDialogType(type);
  }, []);

  // Close dialog
  const handleCloseDialog = useCallback(() => {
    setDialogType(null);
    setEditingQuestionIndex(null);
  }, []);

  // Save assessment
  const handleSave = useCallback(async () => {
    try {
      // Determine assessment type based on questions (use "multiple_choice" as default)
      const assessmentType =
        questions.length > 0 ? questions[0].type : ("multiple_choice" as const);

      const assessmentData = {
        internal_pollen_title: internalPollenTitle,
        title: assessmentTitle,
        subtitle: assessmentDescription,
        estimated_duration: estimatedDuration,
        instructions_title: instructionsTitle,
        instructions_description: instructionsDescription,
        type: assessmentType,
        questions,
        categories,
      };

      if (isEditMode) {
        await updateMutation.mutateAsync({
          id: id!,
          input: {
            ...assessmentData,
            status: "draft" as const,
          },
        });
        showSuccess("Success!", "Assessment updated successfully");
      } else {
        await createMutation.mutateAsync(assessmentData);
        showSuccess("Success!", "Assessment created successfully");
      }

      router.push(AdminRoutes.assessments);
    } catch (error) {
      showError(
        "Error",
        isEditMode
          ? "Failed to update assessment"
          : "Failed to create assessment",
      );
      console.error("Error saving assessment:", error);
    }
  }, [
    internalPollenTitle,
    assessmentTitle,
    assessmentDescription,
    estimatedDuration,
    instructionsTitle,
    instructionsDescription,
    questions,
    categories,
    isEditMode,
    id,
    createMutation,
    updateMutation,
    router,
    showSuccess,
    showError,
  ]);

  // Navigation
  const handleBack = useCallback(() => {
    router.push(AdminRoutes.assessments);
  }, [router]);

  // Validation
  const canSave =
    internalPollenTitle.trim() !== "" &&
    assessmentTitle.trim() !== "" &&
    questions.length > 0;

  return {
    // Basic info
    internalPollenTitle,
    setInternalPollenTitle,
    assessmentTitle,
    setAssessmentTitle,
    assessmentDescription,
    setAssessmentDescription,
    estimatedDuration,
    setEstimatedDuration,
    instructionsTitle,
    setInstructionsTitle,
    instructionsDescription,
    setInstructionsDescription,

    // Questions
    questions,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,

    // Categories
    categories,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,

    // Dialogs
    dialogType,
    editingQuestionIndex,
    handleOpenDialog,
    handleCloseDialog,

    // Actions
    handleSave,
    handleBack,
    canSave,
    isSaving,
    isEditMode,
    isLoadingAssessment,
    assessment: existingAssessment,
  };
}
