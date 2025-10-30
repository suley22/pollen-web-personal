"use client";

import { useState } from "react";
import { UserCheck, Search, Plus, Edit, Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/design-system/form-card";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AssessmentSelector } from "../assessment-selector";
import { useAssessmentById } from "@/app/(pages)/(portal)/admin/assessments/_services/assessments-page-service";
import { AssessmentCreateMultipleChoicePreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-multiple-choice-preview";
import { AssessmentCreateFreeInputPreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-free-input-preview";
import { AssessmentCreateFileUploadPreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-file-upload-preview";

const STATUS_COLORS = {
  draft: "bg-yellow-50 text-yellow-700 border-yellow-200",
  live: "bg-green-50 text-green-700 border-green-200",
  paused: "bg-orange-50 text-orange-700 border-orange-200",
  archived: "bg-gray-50 text-gray-700 border-gray-200",
};

const STATUS_LABELS = {
  draft: "Draft",
  live: "Live",
  paused: "Paused",
  archived: "Archived",
};

const ASSESSMENT_TYPE_LABELS = {
  multiple_choice: "Multiple Choice",
  free_input: "Free Input",
  file_upload: "File Upload",
};

export function PersonaTab({ personaData }) {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Cargar datos completos del assessment seleccionado
  const { data: fullAssessment, isLoading: isLoadingFullAssessment } =
    useAssessmentById(selectedAssessment?.id, {
      enabled: !!selectedAssessment?.id && showPreview,
    });

  const handleSelectAssessment = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleRemoveAssessment = () => {
    setSelectedAssessment(null);
    setShowPreview(false);
  };

  const handleEditAssessment = () => {
    setIsDialogOpen(true);
  };

  // Renderizar preview según tipo de assessment
  const renderAssessmentPreview = () => {
    if (!fullAssessment) return null;

    const commonProps = {
      assessmentTitle:
        fullAssessment.internal_pollen_title || fullAssessment.title,
      assessmentDescription: fullAssessment.subtitle || "",
      instructionsTitle: fullAssessment.instructions_title || "",
      instructionsDescription: fullAssessment.instructions_description || "",
      questions: fullAssessment.questions || [],
      categories: fullAssessment.categories || [],
      isEditMode: false, // No mostramos botones de edición en el preview
    };

    switch (fullAssessment.type) {
      case "multiple_choice":
        return <AssessmentCreateMultipleChoicePreview {...commonProps} />;
      case "free_input":
        return <AssessmentCreateFreeInputPreview {...commonProps} />;
      case "file_upload":
        return <AssessmentCreateFileUploadPreview {...commonProps} />;
      default:
        return (
          <div className="border rounded-lg p-8 bg-muted/30">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Preview not available for this assessment type
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Assessment Assignment Card */}
      <FormCard
        title="Candidate Assessment"
        icon={<Search className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <Label>Assign Assessment (Optional)</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select an assessment to evaluate candidates for this position
            </p>

            {!selectedAssessment ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Assessment
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Selected Assessment Card - Same as selector */}
                <Card className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left Section - Info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Title and Badges */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-semibold text-foreground">
                            {selectedAssessment.internal_pollen_title ??
                              selectedAssessment.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "font-medium",
                              STATUS_COLORS[selectedAssessment.status],
                            )}
                          >
                            {STATUS_LABELS[selectedAssessment.status]}
                          </Badge>
                        </div>

                        {/* Subtitle */}
                        {selectedAssessment.subtitle && (
                          <p className="text-sm text-muted-foreground">
                            {selectedAssessment.subtitle}
                          </p>
                        )}

                        {/* Assessment Details */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {ASSESSMENT_TYPE_LABELS[selectedAssessment.type]}
                          </span>
                          <span>•</span>
                          <span>
                            {selectedAssessment.questions_count}{" "}
                            {selectedAssessment.questions_count === 1
                              ? "Question"
                              : "Questions"}
                          </span>
                          <span>•</span>
                          <span>{selectedAssessment.estimated_duration}</span>
                        </div>
                      </div>

                      {/* Right Section - Completeness */}
                      <div className="text-right bg-muted/30 p-3 rounded-lg min-w-[100px]">
                        <div className="text-xs text-muted-foreground">
                          Completeness
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {selectedAssessment.assessment_completeness}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleEditAssessment}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Change Assessment
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? "Hide" : "Preview"} Assessment
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveAssessment}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </FormCard>

      {/* Assessment Preview - Outside cards */}
      {showPreview && selectedAssessment && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Assessment Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
            >
              <X className="w-4 h-4 mr-2" />
              Close Preview
            </Button>
          </div>

          {isLoadingFullAssessment ? (
            <div className="border rounded-lg p-8 bg-muted/30">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Loading assessment preview...
                </p>
              </div>
            </div>
          ) : (
            renderAssessmentPreview()
          )}
        </div>
      )}

      {/* Assessment Selector Dialog */}
      <AssessmentSelector
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelect={handleSelectAssessment}
      />

      {/* Persona Results Card */}
      <FormCard
        title="Employer Persona Questionnaire Results"
        icon={<UserCheck className="h-5 w-5" />}
      >
        {personaData ? (
          <div className="space-y-4"></div>
        ) : (
          <div className="text-center py-8">
            <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Persona Data Available
            </h3>
            <p className="text-gray-600">
              Persona questionnaire has not been completed yet.
            </p>
          </div>
        )}
      </FormCard>
    </div>
  );
}
