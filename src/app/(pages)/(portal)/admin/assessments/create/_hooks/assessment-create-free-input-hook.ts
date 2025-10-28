"use client";

import { useState } from "react";

interface FreeInputQuestion {
  title: string;
  subtitle: string;
  placeholder: string;
}

export function useAssessmentCreateFreeInput() {
  // Estado para preguntas
  const [questions, setQuestions] = useState<FreeInputQuestion[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

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
  };
}
