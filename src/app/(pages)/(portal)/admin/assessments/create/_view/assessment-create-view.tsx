"use client";

import { useRef, useEffect } from "react";
import {
  PageContainer,
  PageHeader,
  ConfirmationDialog,
  PrimaryButton,
  FormActions,
} from "@/components/design-system";
import { CheckCircle } from "lucide-react";
import { AssessmentTypeEnum } from "@/types/assessment-types";
import { useAssessmentCreate } from "../_hooks/assessment-create-main-hook";
import { AssessmentCreateDetails } from "../_components/assessment-create-details";
import { AssessmentTypeSelector } from "../_components/assessment-type-selector";
import AssessmentCreateMultipleChoiceView from "./assessment-create-multiple-choice-view";
import AssessmentCreateQuestionaryView from "./assessment-create-questionary-view";
import { AssessmentCreateFileUploadView } from "./assessment-create-file-upload-view";

const CreateAssessmentButton = ({ isLoading, onClick, disabled }) => (
  <PrimaryButton
    icon={<CheckCircle className="h-5 w-5" />}
    text="Create Assessment"
    loading={isLoading}
    disabled={disabled || isLoading}
    onClick={onClick}
  />
);

export default function AssessmentCreateView({
  id = null,
}: {
  id?: string | null;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
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

    // Type selection
    selectedType,
    handleSelectType,

    // Dialog states
    showConfirmDialog,
    setShowConfirmDialog,
    setShowSaveDialog,
    showSaveDialog,
    handleConfirmChange,
    handleCancelChange,

    // Save refs
    multipleChoiceSaveRef,
    freeInputSaveRef,
    fileUploadSaveRef,

    // Actions
    handleBack,
    handleSave,
    canSave,

    // Loading state
    isSaving,
    setIsSaving,
  } = useAssessmentCreate({ id });

  // Scroll to content when type is selected
  useEffect(() => {
    if (selectedType && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [selectedType]);

  return (
    <PageContainer>
      <PageHeader
        showBackButton={true}
        title="Create Assessment"
        subtitle="Select assessment type and configure details"
        onBack={handleBack}
      >
        <CreateAssessmentButton
          isLoading={isSaving}
          disabled={!canSave}
          onClick={() => setShowSaveDialog(true)}
        />
      </PageHeader>

      <AssessmentCreateDetails
        internalPollenTitle={internalPollenTitle}
        assessmentTitle={assessmentTitle}
        assessmentDescription={assessmentDescription}
        estimatedDuration={estimatedDuration}
        instructionsTitle={instructionsTitle}
        instructionsDescription={instructionsDescription}
        onInternalPollenTitleChange={setInternalPollenTitle}
        onAssessmentTitleChange={setAssessmentTitle}
        onAssessmentDescriptionChange={setAssessmentDescription}
        onEstimatedDurationChange={setEstimatedDuration}
        onInstructionsTitleChange={setInstructionsTitle}
        onInstructionsDescriptionChange={setInstructionsDescription}
      />

      {/* Assessment Type Selector */}
      <AssessmentTypeSelector
        selectedType={selectedType}
        onSelectType={handleSelectType}
      />

      {/* Show type-specific content based on selection */}
      {selectedType === AssessmentTypeEnum.MultipleChoice && (
        <div ref={contentRef} className="">
          <AssessmentCreateMultipleChoiceView
            assessmentTitle={assessmentTitle}
            assessmentDescription={assessmentDescription}
            instructionsTitle={instructionsTitle}
            instructionsDescription={instructionsDescription}
            internalPollenTitle={internalPollenTitle}
            estimatedDuration={estimatedDuration}
            onSaveRef={(fn) => (multipleChoiceSaveRef.current = fn)}
            onSavingChange={setIsSaving}
          />
        </div>
      )}

      {selectedType === AssessmentTypeEnum.FreeInput && (
        <div ref={contentRef} className="">
          <AssessmentCreateQuestionaryView
            internalPollenTitle={internalPollenTitle}
            assessmentTitle={assessmentTitle}
            assessmentDescription={assessmentDescription}
            estimatedDuration={estimatedDuration}
            instructionsTitle={instructionsTitle}
            instructionsDescription={instructionsDescription}
            onSaveRef={(fn) => (freeInputSaveRef.current = fn)}
            onSavingChange={setIsSaving}
          />
        </div>
      )}

      {selectedType === AssessmentTypeEnum.FileUpload && (
        <div ref={contentRef} className="">
          <AssessmentCreateFileUploadView
            assessmentTitle={assessmentTitle}
            assessmentDescription={assessmentDescription}
            instructionsTitle={instructionsTitle}
            instructionsDescription={instructionsDescription}
            onSaveRef={(fn) => (fileUploadSaveRef.current = fn)}
            onSavingChange={setIsSaving}
          />
        </div>
      )}

      {/* Form Actions at the bottom */}
      {selectedType && (
        <FormActions>
          <ConfirmationDialog
            trigger={
              <CreateAssessmentButton
                isLoading={isSaving}
                disabled={!canSave}
                onClick={() => setShowSaveDialog(true)}
              />
            }
            title="Confirm assessment creation?"
            description="Are you sure you want to create this assessment? This will create a new assessment in the system."
            confirmText="Confirm"
            cancelText="Cancel"
            isLoading={isSaving}
            loadingText="Creating..."
            open={showSaveDialog}
            onOpenChange={setShowSaveDialog}
            onConfirm={handleSave}
          />
        </FormActions>
      )}

      {/* Confirmation Dialog for type change */}
      <ConfirmationDialog
        trigger={<div />}
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Change Assessment Type?"
        description="Changing the assessment type will clear all your current progress. This action cannot be undone. Are you sure you want to continue?"
        confirmText="Change Type"
        cancelText="Keep Current Type"
        onConfirm={handleConfirmChange}
      />
    </PageContainer>
  );
}
