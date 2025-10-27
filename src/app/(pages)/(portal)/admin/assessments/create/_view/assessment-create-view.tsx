"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PageContainer,
  PageHeader,
  FormCard,
} from "@/components/design-system";
import { AssessmentCreateDetails } from "../_components/assessment-create-details";
import { ListChecks, FileText } from "lucide-react";
import AssessmentCreateMultipleChoiceView from "./assessment-create-multiple-choice-view";
import AssessmentCreateQuestionaryView from "./assessment-create-questionary-view";

export default function AssessmentCreateView() {
  const router = useRouter();

  // Assessment data state
  const [internalPollenTitle, setInternalPollenTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [instructionsTitle, setInstructionsTitle] = useState("");
  const [instructionsDescription, setInstructionsDescription] = useState("");
  const [selectedType, setSelectedType] = useState<
    "multiple_choice" | "free_input" | null
  >(null);

  const handleBack = () => {
    router.back();
  };

  const handleSelectType = (type: "multiple_choice" | "free_input") => {
    setSelectedType(type);
  };

  // If a type is selected, show the corresponding view
  if (selectedType === "multiple_choice") {
    return <AssessmentCreateMultipleChoiceView />;
  }

  if (selectedType === "free_input") {
    return <AssessmentCreateQuestionaryView />;
  }

  return (
    <PageContainer>
      <PageHeader
        showBackButton={true}
        title="Create Assessment"
        subtitle="Select assessment type and configure details"
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

      {/* Assessment Type Selector */}
      <FormCard title="Assessment Type">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Choose the type of assessment you want to create
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Multiple Choice Button */}
          <button
            onClick={() => handleSelectType("multiple_choice")}
            className={`
              relative p-6 rounded-lg border-2 transition-all
              ${
                selectedType === "multiple_choice"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className={`
                p-3 rounded-full 
                ${
                  selectedType === "multiple_choice"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }
              `}
              >
                <ListChecks className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Multiple Choice</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create questions with predefined options and categories for
                  scoring
                </p>
              </div>
            </div>
            {selectedType === "multiple_choice" && (
              <div className="absolute top-3 right-3">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>

          {/* Free Input Button */}
          <button
            onClick={() => handleSelectType("free_input")}
            className={`
              relative p-6 rounded-lg border-2 transition-all
              ${
                selectedType === "free_input"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className={`
                p-3 rounded-full 
                ${
                  selectedType === "free_input"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }
              `}
              >
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Free Input</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create open-ended questions where users can provide detailed
                  answers
                </p>
              </div>
            </div>
            {selectedType === "free_input" && (
              <div className="absolute top-3 right-3">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        </div>
      </FormCard>
    </PageContainer>
  );
}
