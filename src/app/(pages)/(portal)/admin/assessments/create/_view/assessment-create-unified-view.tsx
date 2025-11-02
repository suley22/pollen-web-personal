"use client";

import { useState } from "react";
import {
  PageContainer,
  PageHeader,
  FormCard,
  Input,
  PrimaryButton,
  FormActions,
  ConfirmationDialog,
} from "@/components/design-system";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ListPlus } from "lucide-react";
import { useAssessmentCreateUnified } from "../_hooks/assessment-create-unified-hook";
import { AddQuestionButton } from "../_components/add-question-button";
import { AddMultipleChoiceQuestionDialog } from "../_components/add-multiple-choice-question-dialog";
import { AddFreeInputQuestionDialog } from "../_components/add-free-input-question-dialog";
import { AddFileUploadQuestionDialog } from "../_components/add-file-upload-question-dialog";
import { AssessmentCreateUnifiedPreview } from "../_components/assessment-create-unified-preview";

export default function AssessmentCreateUnifiedView({
  id = null,
}: {
  id?: string | null;
}) {
  const {
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
  } = useAssessmentCreateUnified({ id });

  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const editingQuestion =
    editingQuestionIndex !== null ? questions[editingQuestionIndex] : null;

  return (
    <PageContainer>
      <PageHeader
        title={isEditMode ? "Edit Assessment" : "Create Assessment"}
        onBack={handleBack}
      />

      <div className="space-y-6">
        {/* Basic Information */}
        <FormCard title="Basic Information">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="" htmlFor="internalTitle">
                Internal Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="internalTitle"
                value={internalPollenTitle}
                onChange={(e) => setInternalPollenTitle(e.target.value)}
                placeholder="Internal reference name (not shown to candidates)"
              />
            </div>

            <div className="space-y-2">
              <Label className="" htmlFor="title">
                Assessment Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
                placeholder="Title shown to candidates"
              />
            </div>

            <div className="space-y-2">
              <Label className="" htmlFor="description">
                Description
              </Label>
              <Textarea
                className=""
                id="description"
                value={assessmentDescription}
                onChange={(e) => setAssessmentDescription(e.target.value)}
                placeholder="Brief description of the assessment"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="" htmlFor="duration">
                Estimated Duration
              </Label>
              <Input
                id="duration"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                placeholder="e.g., 15 minutes"
              />
            </div>
          </div>
        </FormCard>

        {/* Instructions */}
        <FormCard title="Instructions">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="" htmlFor="instructionsTitle">
                Instructions Title
              </Label>
              <Input
                id="instructionsTitle"
                value={instructionsTitle}
                onChange={(e) => setInstructionsTitle(e.target.value)}
                placeholder="Title for instructions section"
              />
            </div>

            <div className="space-y-2">
              <Label className="" htmlFor="instructionsDescription">
                Instructions Description
              </Label>
              <Textarea
                className=""
                id="instructionsDescription"
                value={instructionsDescription}
                onChange={(e) => setInstructionsDescription(e.target.value)}
                placeholder="Detailed instructions for candidates"
                rows={4}
              />
            </div>
          </div>
        </FormCard>

        {/* Categories - TODO: Implement category management UI */}
        {/* Will be added in next iteration */}

        {/* Questions Section with Unified Preview */}
        <FormCard
          title="Questions"
          icon={<ListPlus className="h-5 w-5" />}
          titleButtons={
            <AddQuestionButton
              onSelectType={handleOpenDialog}
              disabled={isSaving}
            />
          }
        >
          {questions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ListPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No questions yet</p>
              <p className="text-sm">
                Start building your assessment by adding questions above
              </p>
            </div>
          ) : (
            <AssessmentCreateUnifiedPreview
              assessmentTitle={assessmentTitle || "Assessment Preview"}
              assessmentDescription={assessmentDescription || ""}
              instructionsTitle={instructionsTitle || ""}
              instructionsDescription={instructionsDescription || ""}
              questions={questions}
              categories={categories}
              isEditMode={true}
              onMoveQuestionUp={handleMoveQuestionUp}
              onMoveQuestionDown={handleMoveQuestionDown}
              onEditQuestion={handleEditQuestion}
              onRemoveQuestion={handleDeleteQuestion}
            />
          )}
        </FormCard>

        {/* Form Actions */}
        <FormActions>
          <ConfirmationDialog
            trigger={
              <PrimaryButton
                icon={<CheckCircle className="h-5 w-5" />}
                text={isEditMode ? "Update Assessment" : "Create Assessment"}
                loading={isSaving}
                disabled={!canSave || isSaving}
                onClick={() => setShowSaveDialog(true)}
              />
            }
            title={
              isEditMode
                ? "Confirm assessment update?"
                : "Confirm assessment creation?"
            }
            description={
              isEditMode
                ? "Are you sure you want to update this assessment? This will save all changes."
                : "Are you sure you want to create this assessment? This will create a new assessment in the system."
            }
            confirmText="Confirm"
            cancelText="Cancel"
            isLoading={isSaving}
            loadingText={isEditMode ? "Updating..." : "Creating..."}
            open={showSaveDialog}
            onOpenChange={setShowSaveDialog}
            onConfirm={handleSave}
          />
        </FormActions>
      </div>

      {/* Question Dialogs */}
      <AddMultipleChoiceQuestionDialog
        open={dialogType === "multiple_choice"}
        onOpenChange={handleCloseDialog}
        onSave={handleAddQuestion}
        categories={categories}
        editingQuestion={editingQuestion}
      />

      <AddFreeInputQuestionDialog
        open={dialogType === "free_input"}
        onOpenChange={handleCloseDialog}
        onSave={handleAddQuestion}
        editingQuestion={editingQuestion}
      />

      <AddFileUploadQuestionDialog
        open={dialogType === "file_upload"}
        onOpenChange={handleCloseDialog}
        onSave={handleAddQuestion}
        editingQuestion={editingQuestion}
      />
    </PageContainer>
  );
}
