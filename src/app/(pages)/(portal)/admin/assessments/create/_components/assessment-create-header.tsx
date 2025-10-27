"use client";

import { FormCard, Input, TextareaInput } from "@/components/design-system";
import { Building2 } from "lucide-react";

interface AssessmentCreateHeaderProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  onAssessmentTitleChange: (value: string) => void;
  onAssessmentDescriptionChange: (value: string) => void;
  onInstructionsTitleChange: (value: string) => void;
  onInstructionsDescriptionChange: (value: string) => void;
}

export function AssessmentCreateHeader({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  onAssessmentTitleChange,
  onAssessmentDescriptionChange,
  onInstructionsTitleChange,
  onInstructionsDescriptionChange,
}: AssessmentCreateHeaderProps) {
  return (
    <FormCard
      title="Assessment Details"
      icon={<Building2 className="h-5 w-5" />}
    >
      <div className="flex flex-col gap-4">
        {/* Assessment Title */}
        <Input
          label="Title"
          type="text"
          name="assessment_title"
          id="assessment_title"
          placeholder="Enter assessment title"
          value={assessmentTitle}
          onChange={(e) => onAssessmentTitleChange(e.target.value)}
        />

        {/* Assessment Description */}
        <TextareaInput
          label="Description"
          name="assessment_description"
          id="assessment_description"
          placeholder="Enter assessment description"
          value={assessmentDescription}
          onChange={(e) => onAssessmentDescriptionChange(e.target.value)}
          rows={3}
        />

        {/* Instructions Title */}
        <Input
          label="Instructions Title"
          type="text"
          name="instructions_title"
          id="instructions_title"
          placeholder="Enter instructions title (e.g., 'Assessment Instructions')"
          value={instructionsTitle}
          onChange={(e) => onInstructionsTitleChange(e.target.value)}
        />

        {/* Instructions Description */}
        <TextareaInput
          label="Instructions Description"
          name="instructions_description"
          id="instructions_description"
          placeholder="Enter instructions for the assessment (e.g., 'Please answer all questions below...')"
          value={instructionsDescription}
          onChange={(e) => onInstructionsDescriptionChange(e.target.value)}
          rows={3}
        />
      </div>
    </FormCard>
  );
}
