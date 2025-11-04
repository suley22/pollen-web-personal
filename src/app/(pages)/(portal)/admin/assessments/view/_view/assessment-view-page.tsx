"use client";

import { useState } from "react";
import { AssessmentViewHeader } from "../_components/assessment-view-header";
import { AssessmentInformation } from "../_components/assessment-view-information";
import { AssessmentMetadata } from "../_components/assessment-view-metadata";
import { AssessmentQuestions } from "../_components/assessment-view-questions";
import { AssessmentViewSkeleton } from "./assessment-view-skeleton";
import { useAssessmentView } from "../_hooks/assessment-view-hook";
import { DescriptionCard, PrimaryButton } from "@/components/design-system";
import { FileText, Eye } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AssessmentCreateUnifiedPreview } from "../../create/_components/assessment-create-unified-preview";

export default function AssessmentView({ id = null }: { id?: string | null }) {
  const {
    assessment,
    isLoading,
    handleEdit,
    handleSetLive,
    handlePause,
    handleArchive,
    handleDelete,
    handleBack,
    isDeleting,
    isUpdating,
  } = useAssessmentView(id);

  const [previewOpen, setPreviewOpen] = useState(false);

  if (!assessment || isLoading) {
    return <AssessmentViewSkeleton />;
  }

  // Convert questions for preview
  const convertedQuestions = (assessment?.questions || []).map(
    (q: any, index: number) => {
      const baseQuestion: any = {
        id: q.id || `question-${index}`,
        type: q.type,
        title: q.title,
        description: q.subtitle || "",
      };

      if (q.type === "multiple_choice" && q.multiple_choice) {
        baseQuestion.options_title = q.multiple_choice.options_title || "";
        baseQuestion.options = q.multiple_choice.options || [];
        baseQuestion.categoryId = q.multiple_choice.categoryId;
      } else if (q.type === "free_input" && q.free_input) {
        baseQuestion.max_characters = q.free_input.placeholder || "";
      } else if (q.type === "file_upload") {
        // Keep file_upload structure for compatibility
        baseQuestion.file_upload = {
          referenceFiles: q.file_upload?.referenceFiles || [],
        };
      }

      return baseQuestion;
    },
  );

  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header */}
      <AssessmentViewHeader
        title={assessment.title}
        status={assessment.status}
        onBack={handleBack}
        onEdit={handleEdit}
        onSetLive={handleSetLive}
        onPause={handlePause}
        onArchive={handleArchive}
        onDelete={handleDelete}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
      >
        <PrimaryButton
          text="Preview"
          icon={<Eye className="h-5 w-5" />}
          onClick={() => setPreviewOpen(true)}
          style="outline"
        />
      </AssessmentViewHeader>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <AssessmentInformation
            internalPollenTitle={assessment.internal_pollen_title}
            title={assessment.title}
            subtitle={assessment.subtitle}
            estimatedDuration={assessment.estimated_duration}
            questionsCount={assessment.questions_count}
            totalSubmissions={assessment.total_submissions}
          />

          {assessment.instructions_description && (
            <DescriptionCard
              title={assessment.instructions_title || "Instructions"}
              icon={<FileText className="h-5 w-5" />}
              value={assessment.instructions_description}
            />
          )}
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          <AssessmentMetadata
            status={assessment.status}
            createdBy={assessment.created_by?.full_name}
            createdDate={assessment.created_at}
            lastUpdatedBy={assessment.updated_by?.full_name}
            lastUpdatedDate={assessment.updated_at}
            assessmentCompleteness={assessment.assessment_completeness}
          />
        </div>
      </div>
      <AssessmentQuestions
        questions={assessment.questions || []}
        type={assessment.type}
        assessmentTitle={assessment.title}
        assessmentDescription={assessment.subtitle}
        instructionsTitle={assessment.instructions_title}
        instructionsDescription={assessment.instructions_description}
        categories={assessment.categories || []}
      />

      {/* Preview Sheet */}
      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent
          side="right"
          className="!w-[90vw] !max-w-[90vw] overflow-y-auto p-6"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="">Assessment Preview</SheetTitle>
          </SheetHeader>

          <AssessmentCreateUnifiedPreview
            assessmentTitle={assessment.title || ""}
            assessmentDescription={assessment.subtitle || ""}
            instructionsTitle={assessment.instructions_title || ""}
            instructionsDescription={assessment.instructions_description || ""}
            questions={convertedQuestions}
            categories={assessment.categories || []}
            isEditMode={false}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
