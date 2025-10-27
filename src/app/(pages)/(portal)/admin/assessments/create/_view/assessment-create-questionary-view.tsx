"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer, PageHeader } from "@/components/design-system";
import { AssessmentCreateDetails } from "../_components/assessment-create-details";

export default function AssessmentCreateQuestionaryView() {
  const router = useRouter();

  // Assessment data state
  const [internalPollenTitle, setInternalPollenTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [instructionsTitle, setInstructionsTitle] = useState("");
  const [instructionsDescription, setInstructionsDescription] = useState("");

  const handleBack = () => {
    router.back();
  };

  return (
    <PageContainer>
      <PageHeader
        showBackButton={true}
        title="Create Free Input Assessment"
        subtitle="Create an assessment with open-ended questions"
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

      {/* TODO: Add free input questions section */}
    </PageContainer>
  );
}
