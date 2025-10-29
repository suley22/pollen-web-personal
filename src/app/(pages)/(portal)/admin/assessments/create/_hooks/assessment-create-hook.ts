"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentCategory } from "@/types/assessment-category";
import {
  useCreateAssessment,
  useUpdateAssessment,
} from "../../_services/assessments-page-service";
import { AdminRoutes } from "@/admin/router";
import type { Assessment } from "@/types/assessment-types";

interface MultipleChoiceQuestion {
  title: string;
  description: string;
  options_title: string;
  options: { value: string; label: string; categoryId?: string }[];
  categoryId?: string;
}

export function useAssessmentCreate({
  assessment,
}: {
  assessment?: Assessment;
}) {
  const router = useRouter();
  const createAssessmentMutation = useCreateAssessment();
  const updateAssessmentMutation = useUpdateAssessment();

  // Estado para el assessment
  const [internalPollenTitle, setInternalPollenTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [instructionsTitle, setInstructionsTitle] = useState("");
  const [instructionsDescription, setInstructionsDescription] = useState("");

  // Estado para categorías
  const [categories, setCategories] = useState<AssessmentCategory[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryColor, setCategoryColor] = useState("#3B82F6");

  // Estado para preguntas
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optionsTitle, setOptionsTitle] = useState("");
  const [options, setOptions] = useState<
    { value: string; label: string; categoryId?: string }[]
  >([]);
  const [currentOption, setCurrentOption] = useState("");
  const [currentOptionCategory, setCurrentOptionCategory] = useState<
    string | undefined
  >();
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

  // Initialize state from assessment data (edit mode)
  useEffect(() => {
    if (assessment) {
      // Load categories if available
      if (assessment.categories) {
        const loadedCategories = assessment.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          description: cat.description || "",
          color: cat.color,
        }));
        setCategories(loadedCategories);
      }

      // Load questions and convert them from the new structure
      if (assessment.questions && assessment.questions.length > 0) {
        const loadedQuestions = assessment.questions.map((q) => ({
          title: q.title,
          description: q.subtitle || "",
          options_title: q.multiple_choice?.options_title || "",
          options: q.multiple_choice?.options || [],
          categoryId: q.multiple_choice?.categoryId,
        }));
        setQuestions(loadedQuestions);
      }
    }
  }, [assessment]);

  // Funciones para categorías
  const handleAddCategory = () => {
    if (!categoryName.trim()) return;

    const newCategory: AssessmentCategory = {
      id: Date.now().toString(),
      name: categoryName.trim(),
      description: categoryDescription.trim(),
      color: categoryColor,
    };

    setCategories([...categories, newCategory]);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryColor("#3B82F6");
  };

  const handleRemoveCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  const handleMoveCategoryUp = (index: number) => {
    if (index === 0) return;

    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index - 1];
    newCategories[index - 1] = temp;
    setCategories(newCategories);
  };

  const getCategoryOptionsCount = (categoryId: string) => {
    return questions
      .flatMap((q) => q.options)
      .filter((opt) => opt.categoryId === categoryId).length;
  };

  // Funciones para opciones
  const handleAddOption = () => {
    if (!currentOption.trim()) return;

    const newOption = {
      value: (options.length + 1).toString(),
      label: currentOption.trim(),
      categoryId: currentOptionCategory,
    };

    setOptions([...options, newOption]);
    setCurrentOption("");
    setCurrentOptionCategory(undefined);
  };

  const handleRemoveOption = (value: string) => {
    setOptions(options.filter((option) => option.value !== value));
  };

  // Funciones para preguntas
  const handleAddQuestion = () => {
    if (!title.trim() || options.length < 2) {
      alert("Please fill in all required fields and add at least 2 options");
      return;
    }

    const questionData: MultipleChoiceQuestion = {
      title: title.trim(),
      description: description.trim(),
      options_title: optionsTitle.trim(),
      options: options,
    };

    if (editingQuestionIndex !== null) {
      // Actualizar pregunta existente
      const newQuestions = [...questions];
      newQuestions[editingQuestionIndex] = questionData;
      setQuestions(newQuestions);
    } else {
      // Agregar nueva pregunta
      setQuestions([...questions, questionData]);
    }

    handleClearForm();
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    // Si estamos editando esta pregunta, limpiar el formulario
    if (editingQuestionIndex === index) {
      handleClearForm();
      setEditingQuestionIndex(null);
    }
  };

  const handleEditQuestion = (index: number) => {
    const question = questions[index];
    setTitle(question.title);
    setDescription(question.description);
    setOptionsTitle(question.options_title);
    setOptions(question.options);
    setEditingQuestionIndex(index);
    // Scroll al campo de título de la pregunta
    setTimeout(() => {
      const titleInput = document.getElementById("question_title");
      if (titleInput) {
        titleInput.scrollIntoView({ behavior: "smooth", block: "center" });
        titleInput.focus();
      }
    }, 100);
  };

  const handleMoveQuestionUp = (index: number) => {
    if (index === 0) return;

    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;
    setQuestions(newQuestions);
  };

  const handleMoveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;

    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;
    setQuestions(newQuestions);
  };

  const handleClearForm = () => {
    setTitle("");
    setDescription("");
    setOptionsTitle("");
    setOptions([]);
    setCurrentOption("");
    setEditingQuestionIndex(null);
  };

  // Funciones de navegación
  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (
    assessmentType: "multiple_choice" | "free_input" | "file_upload",
    assessmentData?: {
      internalPollenTitle?: string;
      assessmentTitle?: string;
      assessmentDescription?: string;
      estimatedDuration?: string;
      instructionsTitle?: string;
      instructionsDescription?: string;
    },
  ) => {
    try {
      console.log(
        "[Multiple Choice Hook] handleSubmit called with type:",
        assessmentType,
      );
      console.log("[Multiple Choice Hook] Questions count:", questions.length);

      // Use provided data or fall back to hook state
      const dataToSubmit = {
        internalPollenTitle:
          assessmentData?.internalPollenTitle ?? internalPollenTitle,
        assessmentTitle: assessmentData?.assessmentTitle ?? assessmentTitle,
        assessmentDescription:
          assessmentData?.assessmentDescription ?? assessmentDescription,
        estimatedDuration:
          assessmentData?.estimatedDuration ?? estimatedDuration,
        instructionsTitle:
          assessmentData?.instructionsTitle ?? instructionsTitle,
        instructionsDescription:
          assessmentData?.instructionsDescription ?? instructionsDescription,
      };

      // Validate required fields
      if (!dataToSubmit.assessmentTitle.trim()) {
        throw new Error("Assessment title is required");
      }

      // Only validate questions if this is a multiple_choice assessment
      if (assessmentType === "multiple_choice" && questions.length === 0) {
        throw new Error("At least one question is required");
      }

      const assessmentInput = {
        internal_pollen_title: dataToSubmit.internalPollenTitle || null,
        title: dataToSubmit.assessmentTitle,
        subtitle: dataToSubmit.assessmentDescription || null,
        estimated_duration: dataToSubmit.estimatedDuration || null,
        instructions_title: dataToSubmit.instructionsTitle || null,
        instructions_description: dataToSubmit.instructionsDescription || null,
        type: assessmentType,
        categories: categories.length > 0 ? categories : undefined,
        questions: questions.map((q) => ({
          title: q.title,
          subtitle: q.description,
          type: assessmentType,
          multiple_choice: {
            options: q.options,
            options_title: q.options_title,
            categoryId: q.categoryId,
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
      console.error("Error saving assessment:", error);
      throw error;
    }
  };

  return {
    // Assessment data
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

    // Categories
    categories,
    categoryName,
    setCategoryName,
    categoryDescription,
    setCategoryDescription,
    categoryColor,
    setCategoryColor,
    handleAddCategory,
    handleRemoveCategory,
    handleMoveCategoryUp,
    getCategoryOptionsCount,

    // Questions
    questions,
    title,
    setTitle,
    description,
    setDescription,
    optionsTitle,
    setOptionsTitle,
    options,
    currentOption,
    setCurrentOption,
    currentOptionCategory,
    setCurrentOptionCategory,
    editingQuestionIndex,
    handleAddOption,
    handleRemoveOption,
    handleAddQuestion,
    handleRemoveQuestion,
    handleEditQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,
    handleClearForm,

    // Navigation
    handleBack,
    handleSubmit,

    // Mutation states
    isSaving: createAssessmentMutation.isPending,
    saveError: createAssessmentMutation.error,
  };
}
