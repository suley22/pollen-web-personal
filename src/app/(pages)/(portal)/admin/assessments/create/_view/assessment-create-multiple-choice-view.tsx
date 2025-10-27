"use client";

import { PageContainer, PageHeader } from "@/components/design-system";
import { AssessmentCreateDetails } from "../_components/assessment-create-details";
import { AssessmentCreatePreview } from "../_components/assessment-create-preview";
import { AssessmentCreateCategories } from "../_components/assessment-create-categories";
import { AssessmentCreateQuestions } from "../_components/assessment-create-questions";
import { useAssessmentCreate } from "../_hooks/assessment-create-hook";

export default function AssessmentCreateMultipleChoiceView() {
  const {
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
  } = useAssessmentCreate({});

  return (
    <PageContainer>
      <PageHeader
        showBackButton={true}
        title="Create Multiple Choice Assessment"
        subtitle="Create an assessment with multiple choice questions and categories"
        onBack={handleBack}
      />

      <AssessmentCreateDetails
        internalPollenTitle={internalPollenTitle}
        assessmentTitle={assessmentTitle}
        assessmentDescription={assessmentDescription}
        instructionsTitle={instructionsTitle}
        instructionsDescription={instructionsDescription}
        onInternalPollenTitleChange={setInternalPollenTitle}
        onAssessmentTitleChange={setAssessmentTitle}
        onAssessmentDescriptionChange={setAssessmentDescription}
        onInstructionsTitleChange={setInstructionsTitle}
        onInstructionsDescriptionChange={setInstructionsDescription}
      />

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
      <AssessmentCreatePreview
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
    </PageContainer>
  );
}
