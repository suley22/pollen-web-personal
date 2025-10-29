"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateAssessment } from "../../_services/assessments-page-service";
import { AdminRoutes } from "@/admin/router";
import type { Assessment } from "@/types/assessment-types";

interface FreeInputQuestion {
  title: string;
  subtitle: string;
  placeholder: string;
}

export function useAssessmentCreateFreeInput({
  assessment,
}: { assessment?: Assessment } = {}) {
  const router = useRouter();
  const createAssessmentMutation = useCreateAssessment();

  // Estado para preguntas
  const [questions, setQuestions] = useState<FreeInputQuestion[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

  // Initialize state from assessment data (edit mode)
  useEffect(() => {
    if (assessment && assessment.questions && assessment.questions.length > 0) {
      const loadedQuestions = assessment.questions.map((q) => ({
        title: q.title,
        subtitle: q.subtitle || "",
        placeholder: q.free_input?.placeholder || "",
      }));
      setQuestions(loadedQuestions);
    }
  }, [assessment]);

  // Agregar pregunta
  const handleAddQuestion = () => {
    if (!title.trim()) return;

    const newQuestion: FreeInputQuestion = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      placeholder: placeholder.trim(),
    };

    if (editingQuestionIndex !== null) {
      // Modo edición: actualizar pregunta existente
      const updatedQuestions = [...questions];
      updatedQuestions[editingQuestionIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditingQuestionIndex(null);
    } else {
      // Modo agregar: añadir nueva pregunta
      setQuestions([...questions, newQuestion]);
    }

    // Limpiar formulario
    handleClearForm();
  };

  // Remover pregunta
  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));

    // Si estamos editando esta pregunta, cancelar edición
    if (editingQuestionIndex === index) {
      handleClearForm();
    }
  };

  // Editar pregunta
  const handleEditQuestion = (index: number) => {
    const question = questions[index];
    setTitle(question.title);
    setSubtitle(question.subtitle);
    setPlaceholder(question.placeholder);
    setEditingQuestionIndex(index);

    // Scroll al formulario
    setTimeout(() => {
      const formElement = document.getElementById("question_title");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
        formElement.focus();
      }
    }, 100);
  };

  // Limpiar formulario
  const handleClearForm = () => {
    setTitle("");
    setSubtitle("");
    setPlaceholder("");
    setEditingQuestionIndex(null);
  };

  // Mover pregunta arriba
  const handleMoveQuestionUp = (index: number) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    [newQuestions[index - 1], newQuestions[index]] = [
      newQuestions[index],
      newQuestions[index - 1],
    ];
    setQuestions(newQuestions);
  };

  // Mover pregunta abajo
  const handleMoveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index + 1]] = [
      newQuestions[index + 1],
      newQuestions[index],
    ];
    setQuestions(newQuestions);
  };

  // Funciones de navegación
  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (
    assessmentType: "free_input",
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

      // Only validate questions if this is a free_input assessment
      if (assessmentType === "free_input" && questions.length === 0) {
        throw new Error("At least one question is required");
      }

      // Create assessment using mutation
      const result = await createAssessmentMutation.mutateAsync({
        internal_pollen_title: assessmentData.internal_pollen_title,
        title: assessmentData.title,
        subtitle: assessmentData.subtitle,
        estimated_duration: assessmentData.estimated_duration,
        instructions_title: assessmentData.instructions_title,
        instructions_description: assessmentData.instructions_description,
        type: assessmentType,
        questions: questions.map((q) => ({
          title: q.title,
          subtitle: q.subtitle,
          type: assessmentType,
          free_input: {
            placeholder: q.placeholder,
          },
        })),
      });

      console.log("Assessment created successfully:", result);

      // Navigate to assessments list
      router.push(AdminRoutes.assessments);
    } catch (error) {
      console.error("Error saving assessment:", error);
      throw error;
    }
  };

  return {
    // Questions
    questions,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    placeholder,
    setPlaceholder,
    editingQuestionIndex,
    handleAddQuestion,
    handleRemoveQuestion,
    handleEditQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,
    handleClearForm,

    // Navigation and submission
    handleBack,
    handleSubmit,
    isSaving: createAssessmentMutation.isPending,
    saveError: createAssessmentMutation.error,
  };
}
