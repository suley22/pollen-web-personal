"use client";

import { AssessmentViewHeader } from "../_components/assessment-view-header";
import { AssessmentInformation } from "../_components/assessment-view-information";
import { AssessmentMetadata } from "../_components/assessment-view-metadata";
import { AssessmentQuestions } from "../_components/assessment-view-questions";
import { AssessmentViewSkeleton } from "./assessment-view-skeleton";
import { useAssessmentView } from "../_hooks/assessment-view-hook";
import { DescriptionCard } from "@/components/design-system";
import { FileText } from "lucide-react";

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

  if (!assessment || isLoading) {
    return <AssessmentViewSkeleton />;
  }

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
      />

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
    </div>
  );
}
