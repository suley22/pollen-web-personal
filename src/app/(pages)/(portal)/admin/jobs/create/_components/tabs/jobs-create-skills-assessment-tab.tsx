"use client";

import { useState, useEffect } from "react";
import { Brain, Search, Plus, Edit, Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/design-system/form-card";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AssessmentSelector } from "../jobs-create-assessment-selector";
import { useAssessmentById } from "@/assessments/_services/assessments-page-service";
import { AssessmentCreateUnifiedPreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-unified-preview";

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

export function AssessmentTab({
  initialAssessmentId = null,
  onAssessmentChange,
}) {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isAssessmentSelectorOpen, setIsAssessmentSelectorOpen] =
    useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Cargar datos completos del assessment seleccionado
  const { data: fullAssessment, isLoading: isLoadingFullAssessment } =
    useAssessmentById(selectedAssessment?.id || "");

  // Cargar assessment inicial si existe
  const { data: initialAssessment } = useAssessmentById(
    initialAssessmentId || "",
  );

  // Efecto para establecer el assessment inicial
  useEffect(() => {
    if (initialAssessment && !selectedAssessment) {
      setSelectedAssessment(initialAssessment);
    }
  }, [initialAssessment, selectedAssessment]);

  const handleSelectAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    // Notificar al componente padre del cambio
    if (onAssessmentChange) {
      onAssessmentChange(assessment?.id || null);
    }
  };

  const handleRemoveAssessment = () => {
    setSelectedAssessment(null);
    setShowPreview(false);
    // Notificar al componente padre que se removió
    if (onAssessmentChange) {
      onAssessmentChange(null);
    }
  };

  const handleEditAssessment = () => {
    setIsAssessmentSelectorOpen(true);
  };

  // Convertir preguntas para preview (mismo patrón que otros componentes)
  const convertQuestionsForPreview = (assessment) => {
    if (!assessment?.questions) return [];

    return assessment.questions.map((q, index) => {
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
        baseQuestion.file_upload = {
          referenceFiles: q.file_upload?.referenceFiles || [],
        };
      }

      return baseQuestion;
    });
  };

  return (
    <div className="space-y-6">
      {/* Skills Assessment Assignment Card */}
      <FormCard title="Skills Assessment" icon={<Brain className="h-5 w-5" />}>
        <div className="space-y-4">
          <div>
            <Label>Assign Skills Assessment (Optional)</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select a skills assessment to evaluate candidate technical
              abilities
            </p>

            {!selectedAssessment ? (
              <Button
                size="default"
                variant="outline"
                className="w-full"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsAssessmentSelectorOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skills Assessment
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Selected Assessment Card */}
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
                    type="button"
                    variant="outline"
                    size="default"
                    className="flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleEditAssessment();
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Change Assessment
                  </Button>
                  <Button
                    type="button"
                    size="default"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPreview(!showPreview);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? "Hide" : "Preview"} Assessment
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveAssessment();
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </FormCard>

      {/* Assessment Preview - Inline */}
      {showPreview && selectedAssessment && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Skills Assessment Preview</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPreview(false);
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Close Preview
            </Button>
          </div>

          {isLoadingFullAssessment || !fullAssessment ? (
            <div className="border rounded-lg p-8 bg-muted/30">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Loading assessment preview...
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6 bg-background">
              <AssessmentCreateUnifiedPreview
                assessmentTitle={fullAssessment.title || ""}
                assessmentDescription={fullAssessment.subtitle || ""}
                instructionsTitle={fullAssessment.instructions_title || ""}
                instructionsDescription={
                  fullAssessment.instructions_description || ""
                }
                questions={convertQuestionsForPreview(fullAssessment)}
                categories={fullAssessment.categories || []}
                isEditMode={false}
              />
            </div>
          )}
        </div>
      )}

      {/* Assessment Selector Dialog */}
      <AssessmentSelector
        isOpen={isAssessmentSelectorOpen}
        onClose={() => setIsAssessmentSelectorOpen(false)}
        onSelect={handleSelectAssessment}
      />
    </div>
  );
}
