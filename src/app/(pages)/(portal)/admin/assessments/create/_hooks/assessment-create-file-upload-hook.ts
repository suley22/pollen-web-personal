"use client";

import { useState } from "react";

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
  allowMultipleUploads: boolean; // Can job seeker upload multiple files?
}

export function useAssessmentCreateFileUpload() {
  const [questions, setQuestions] = useState<FileUploadQuestion[]>([]);

  // Form state for adding/editing questions
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionSubtitle, setQuestionSubtitle] = useState("");
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([]);
  const [allowMultipleUploads, setAllowMultipleUploads] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

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
      allowMultipleUploads,
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
  };

  const handleEditQuestion = (index: number) => {
    const question = questions[index];
    setQuestionTitle(question.title);
    setQuestionSubtitle(question.subtitle);
    setReferenceFiles([...question.referenceFiles]);
    setAllowMultipleUploads(question.allowMultipleUploads);
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
    setAllowMultipleUploads(false);
    setEditingQuestionIndex(null);
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
    allowMultipleUploads,
    setAllowMultipleUploads,
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
  };
}
