"use client";

import { AssessmentCreateMultipleChoicePreview } from "../_components/assessment-create-multiple-choice-preview";
import { AssessmentCreateCategories } from "../_components/assessment-create-categories";
import { AssessmentCreateQuestions } from "../_components/assessment-create-questions";
import { useAssessmentCreate } from "../_hooks/assessment-create-hook";
import {
  FormActions,
  PrimaryButton,
  SecondaryButton,
} from "@/components/design-system";
import { Save, Send } from "lucide-react";

interface AssessmentCreateMultipleChoiceViewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  internalPollenTitle: string;
  estimatedDuration: string;
}

export default function AssessmentCreateMultipleChoiceView({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  internalPollenTitle,
  estimatedDuration,
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
  } = useAssessmentCreate({});

  const handleSaveDraft = async () => {
    await handleSubmit("multiple_choice", {
      internalPollenTitle,
      assessmentTitle,
      assessmentDescription,
      estimatedDuration,
      instructionsTitle,
      instructionsDescription,
    });
  };

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

      {/* Action Buttons */}
      <FormActions>
        <SecondaryButton
          text="Cancel"
          onClick={handleBack}
          disabled={isSaving}
        />
        <PrimaryButton
          icon={<Save />}
          text={isSaving ? "Saving..." : "Save Assessment"}
          onClick={handleSaveDraft}
          disabled={isSaving || !assessmentTitle || questions.length === 0}
        />
      </FormActions>
    </div>
  );
}
