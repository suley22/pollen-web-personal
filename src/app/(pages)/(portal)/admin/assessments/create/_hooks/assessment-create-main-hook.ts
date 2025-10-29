"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AssessmentType } from "@/types/assessment-types";
import {
  useAssessmentById,
  useCreateAssessment,
  useUpdateAssessment,
} from "../../_services/assessments-page-service";
import { AdminRoutes } from "@/admin/router";

interface UseAssessmentCreateProps {
  id?: string | null;
}

export function useAssessmentCreate({ id = null }: UseAssessmentCreateProps) {
  const router = useRouter();

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
  const [selectedType, setSelectedType] = useState<AssessmentType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [pendingType, setPendingType] = useState<AssessmentType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Query para obtener assessment (solo si hay id - modo edición)
  const { data: assessment, isLoading } = useAssessmentById(id || "");

  // Mutation para crear
  const createMutation = useCreateAssessment();

  // Mutation para actualizar
  const updateMutation = useUpdateAssessment();

  // Update state when assessment data loads (edit mode)
  useEffect(() => {
    if (assessment) {
      setInternalPollenTitle(assessment.internal_pollen_title || "");
      setAssessmentTitle(assessment.title || "");
      setAssessmentDescription(assessment.subtitle || "");
      setEstimatedDuration(assessment.estimated_duration || "");
      setInstructionsTitle(assessment.instructions_title || "");
      setInstructionsDescription(assessment.instructions_description || "");
      setSelectedType(assessment.type);
    }
  }, [assessment]);

  const handleBack = () => {
    router.back();
  };

  const handleSelectType = (type: AssessmentType) => {
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

  const handleSave = async () => {
    try {
      // Call the appropriate save function based on selected type
      if (multipleChoiceSaveRef.current) {
        await multipleChoiceSaveRef.current();
      } else if (freeInputSaveRef.current) {
        await freeInputSaveRef.current();
      } else if (fileUploadSaveRef.current) {
        await fileUploadSaveRef.current();
      }

      // Navigation is handled by individual hooks after successful save
    } catch (error) {
      console.error("Error saving assessment:", error);
      throw error;
    }
  };

  const canSave = selectedType !== null && assessmentTitle.trim() !== "";

  const isLoadingAssessment =
    isLoading || createMutation.isPending || updateMutation.isPending;

  return {
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
    setSelectedType,
    handleSelectType,

    // Dialog states
    showConfirmDialog,
    setShowConfirmDialog,
    showSaveDialog,
    setShowSaveDialog,
    pendingType,
    setPendingType,
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
  };
}
