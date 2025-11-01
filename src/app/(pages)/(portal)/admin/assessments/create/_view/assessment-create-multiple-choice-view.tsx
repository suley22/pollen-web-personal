"use client";

import { useEffect, useCallback } from "react";
import { AssessmentCreateMultipleChoicePreview } from "../_components/assessment-create-multiple-choice-preview";
import { AssessmentCreateCategories } from "../_components/assessment-create-categories";
import { AssessmentCreateQuestions } from "../_components/assessment-create-questions";
import { useAssessmentCreate } from "../_hooks/assessment-create-hook";
import type { Assessment } from "@/types/assessment-types";

interface AssessmentCreateMultipleChoiceViewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  internalPollenTitle: string;
  estimatedDuration: string;
  assessment?: Assessment;
  onSaveRef?: (fn: () => Promise<void>) => void;
  onSavingChange?: (isSaving: boolean) => void;
}

export default function AssessmentCreateMultipleChoiceView({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  internalPollenTitle,
  estimatedDuration,
  assessment,
  onSaveRef,
  onSavingChange,
}: AssessmentCreateMultipleChoiceViewProps) {
  const {
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
    handleBack,
    handleSubmit,
    isSaving,
  } = useAssessmentCreate({
    questions: assessment?.questions,
    categories: assessment?.categories,
  });

  const handleSaveDraft = useCallback(async () => {
    await handleSubmit("multiple_choice", {
      id: assessment?.id,
      internalPollenTitle,
      assessmentTitle,
      assessmentDescription,
      estimatedDuration,
      instructionsTitle,
      instructionsDescription,
    });
  }, [
    handleSubmit,
    assessment?.id,
    internalPollenTitle,
    assessmentTitle,
    assessmentDescription,
    estimatedDuration,
    instructionsTitle,
    instructionsDescription,
  ]);

  // Expose save function to parent
  useEffect(() => {
    if (onSaveRef) {
      onSaveRef(handleSaveDraft);
    }

    // Cleanup: remove the ref when component unmounts
    return () => {
      if (onSaveRef) {
        onSaveRef(null as any);
      }
    };
  }, [onSaveRef, handleSaveDraft]);

  // Sync saving state with parent
  useEffect(() => {
    if (onSavingChange) {
      onSavingChange(isSaving);
    }
  }, [isSaving, onSavingChange]);

  return (
    <div className="flex flex-col gap-6">
      <AssessmentCreateCategories
        categories={categories}
        categoryName={categoryName}
        categoryDescription={categoryDescription}
        categoryColor={categoryColor}
        onCategoryNameChange={setCategoryName}
        onCategoryDescriptionChange={setCategoryDescription}
        onCategoryColorChange={setCategoryColor}
        onAddCategory={handleAddCategory}
        onRemoveCategory={handleRemoveCategory}
        onMoveCategoryUp={handleMoveCategoryUp}
        getCategoryOptionsCount={getCategoryOptionsCount}
      />

      <AssessmentCreateQuestions
        title={title}
        description={description}
        optionsTitle={optionsTitle}
        options={options}
        currentOption={currentOption}
        currentOptionCategory={currentOptionCategory}
        categories={categories}
        editingQuestionIndex={editingQuestionIndex}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onOptionsTitleChange={setOptionsTitle}
        onCurrentOptionChange={setCurrentOption}
        onCurrentOptionCategoryChange={setCurrentOptionCategory}
        onAddOption={handleAddOption}
        onRemoveOption={handleRemoveOption}
        onAddQuestion={handleAddQuestion}
        onClearForm={handleClearForm}
      />

      {/* Assessment Preview */}
      <AssessmentCreateMultipleChoicePreview
        assessmentTitle={assessmentTitle}
        assessmentDescription={assessmentDescription}
        instructionsTitle={instructionsTitle}
        instructionsDescription={instructionsDescription}
        questions={questions}
        categories={categories}
        isEditMode={true}
        onMoveQuestionUp={handleMoveQuestionUp}
        onMoveQuestionDown={handleMoveQuestionDown}
        onEditQuestion={handleEditQuestion}
        onRemoveQuestion={handleRemoveQuestion}
      />
    </div>
  );
}
