"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentCategory } from "@/types/assessment-category";

interface MultipleChoiceQuestion {
  title: string;
  description: string;
  options_title: string;
  options: { value: string; label: string; categoryId?: string }[];
  categoryId?: string;
}

export function useAssessmentCreate({ id = null }) {
  const router = useRouter();

  // Estado para el assessment
  const [internalPollenTitle, setInternalPollenTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
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
    if (!title.trim() || !optionsTitle.trim() || options.length === 0) {
      alert("Please fill in all required fields and add at least one option");
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

  const handleSubmit = async () => {
    try {
      // TODO: Implement save logic
      console.log("Saving assessment:", {
        assessmentTitle,
        assessmentDescription,
        instructionsTitle,
        instructionsDescription,
        categories,
        questions,
      });
      // After save, redirect or show success message
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
  };
}
