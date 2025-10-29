"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PageContainer,
  PageHeader,
  ConfirmationDialog,
  PrimaryButton,
  FormActions,
} from "@/components/design-system";
import { CheckCircle } from "lucide-react";
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

export default function AssessmentCreateView() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  // Refs to child components save functions
  const multipleChoiceSaveRef = useRef<(() => Promise<void>) | null>(null);
  const freeInputSaveRef = useRef<(() => Promise<void>) | null>(null);
  const fileUploadSaveRef = useRef<(() => Promise<void>) | null>(null);

  // Assessment data state
  const [internalPollenTitle, setInternalPollenTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [instructionsTitle, setInstructionsTitle] = useState("");
  const [instructionsDescription, setInstructionsDescription] = useState("");
  const [selectedType, setSelectedType] = useState<
    "multiple_choice" | "free_input" | "file_upload" | null
  >(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [pendingType, setPendingType] = useState<
    "multiple_choice" | "free_input" | "file_upload" | null
  >(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (selectedType === "multiple_choice" && multipleChoiceSaveRef.current) {
        await multipleChoiceSaveRef.current();
      } else if (selectedType === "free_input" && freeInputSaveRef.current) {
        await freeInputSaveRef.current();
      } else if (selectedType === "file_upload" && fileUploadSaveRef.current) {
        await fileUploadSaveRef.current();
      }
    } finally {
      setIsSaving(false);
      setShowSaveDialog(false);
    }
  };

  const canSave = selectedType !== null && assessmentTitle.trim() !== "";

  const handleSelectType = (
    type: "multiple_choice" | "free_input" | "file_upload",
  ) => {
    // If there's already a type selected and user is changing it, show confirmation
    if (selectedType && selectedType !== type) {
      setPendingType(type);
      setShowConfirmDialog(true);
    } else {
      // First selection or same type, just set it
      setSelectedType(type);
    }
  };

  const handleConfirmChange = () => {
    if (pendingType) {
      setSelectedType(pendingType);
      setPendingType(null);
    }
    setShowConfirmDialog(false);
  };

  const handleCancelChange = () => {
    setPendingType(null);
    setShowConfirmDialog(false);
  };

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
      {selectedType === "multiple_choice" && (
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

      {selectedType === "free_input" && (
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

      {selectedType === "file_upload" && (
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
