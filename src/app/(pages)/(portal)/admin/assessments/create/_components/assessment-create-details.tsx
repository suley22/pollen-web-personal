"use client";

import { FormCard, Input, TextareaInput } from "@/components/design-system";
import { Building2 } from "lucide-react";

interface AssessmentCreateHeaderProps {
  internalPollenTitle: string;
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
  onInternalPollenTitleChange: (value: string) => void;
  onAssessmentTitleChange: (value: string) => void;
  onAssessmentDescriptionChange: (value: string) => void;
  onInstructionsTitleChange: (value: string) => void;
  onInstructionsDescriptionChange: (value: string) => void;
}

export function AssessmentCreateDetails({
  internalPollenTitle,
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
  onInternalPollenTitleChange,
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
        {/* Internal Pollen Title - Optional */}
        <Input
          label="Internal Pollen Title"
          type="text"
          name="internal_pollen_title"
          id="internal_pollen_title"
          placeholder="Enter internal title (only visible to Pollen)"
          value={internalPollenTitle}
          onChange={(e) => onInternalPollenTitleChange(e.target.value)}
          helperText="This title is only visible to Pollen administrators"
        />
        {/* Assessment Title - Required */}
        <Input
          label="Title"
          type="text"
          name="assessment_title"
          id="assessment_title"
          placeholder="Enter assessment title"
          value={assessmentTitle}
          onChange={(e) => onAssessmentTitleChange(e.target.value)}
          required
        />

        {/* Assessment Subtitle (Description) */}
        <Input
          label="Subtitle"
          name="assessment_subtitle"
          id="assessment_subtitle"
          placeholder="Enter assessment subtitle"
          value={assessmentDescription}
          onChange={(e) => onAssessmentDescriptionChange(e.target.value)}
        />

        {/* Instructions Title - Optional */}
        <Input
          label="Instructions Title"
          type="text"
          name="instructions_title"
          id="instructions_title"
          placeholder="Enter instructions title (e.g., 'Assessment Instructions')"
          value={instructionsTitle}
          onChange={(e) => onInstructionsTitleChange(e.target.value)}
        />

        {/* Instructions Description - Optional */}
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
