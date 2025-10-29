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
import { AssessmentCreateSkeleton } from "../_components/assessment-create-skeleton";
import AssessmentCreateMultipleChoiceView from "./assessment-create-multiple-choice-view";
import AssessmentCreateQuestionaryView from "./assessment-create-questionary-view";
import { AssessmentCreateFileUploadView } from "./assessment-create-file-upload-view";

const CreateAssessmentButton = ({
  isLoading,
  onClick,
  disabled,
  isEditMode,
}) => (
  <PrimaryButton
    icon={<CheckCircle className="h-5 w-5" />}
    text={isEditMode ? "Update Assessment" : "Create Assessment"}
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
    assessment,
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
    isLoadingAssessment,
    isSaving,
    setIsSaving,
  } = useAssessmentCreate({ id });

  // Track if this is the initial load
  const isInitialLoad = useRef(true);

  // Scroll to content when type is selected (but not on initial load in edit mode)
  useEffect(() => {
    if (selectedType && contentRef.current) {
      // Skip scroll on initial load if we're in edit mode (id exists)
      if (isInitialLoad.current && id) {
        isInitialLoad.current = false;
        return;
      }

      isInitialLoad.current = false;

      setTimeout(() => {
        contentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [selectedType, id]);

  return (
    <PageContainer>
      <PageHeader
        showBackButton={true}
        title={id ? "Edit Assessment" : "Create Assessment"}
        subtitle={
          id
            ? "Update assessment details and configuration"
            : "Select assessment type and configure details"
        }
        onBack={handleBack}
      >
        <CreateAssessmentButton
          isLoading={isSaving}
          disabled={!canSave}
          onClick={() => setShowSaveDialog(true)}
          isEditMode={!!id}
        />
      </PageHeader>

      {/* Show skeleton while loading in edit mode */}
      {id && isLoadingAssessment ? (
        <AssessmentCreateSkeleton />
      ) : (
        <>
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
        </>
      )}

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
            assessment={assessment}
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
            assessment={assessment}
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
            assessment={assessment}
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
                isEditMode={!!id}
              />
            }
            title={
              id ? "Confirm assessment update?" : "Confirm assessment creation?"
            }
            description={
              id
                ? "Are you sure you want to update this assessment? This will save all changes."
                : "Are you sure you want to create this assessment? This will create a new assessment in the system."
            }
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
