"use client";

import { useState } from "react";
import { UserCheck, Search, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/design-system/form-card";
import { Label } from "@/components/ui/label";
import { AssessmentSelector } from "../assessment-selector";

export function PersonaTab({ personaData }) {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectAssessment = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleRemoveAssessment = () => {
    setSelectedAssessment(null);
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
                {/* Selected Assessment Card */}
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">
                          {selectedAssessment.internal_pollen_title ??
                            selectedAssessment.title}
                        </h4>
                        <Badge variant="outline">
                          {selectedAssessment.status}
                        </Badge>
                      </div>
                      {selectedAssessment.subtitle && (
                        <p className="text-sm text-muted-foreground">
                          {selectedAssessment.subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{selectedAssessment.type.replace("_", " ")}</span>
                        <span>•</span>
                        <span>
                          {selectedAssessment.questions_count} questions
                        </span>
                        <span>•</span>
                        <span>{selectedAssessment.estimated_duration}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveAssessment}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Assessment Preview Placeholder */}
                <div className="border rounded-lg p-6 bg-background">
                  <h4 className="font-medium mb-4">Assessment Preview</h4>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">
                        This assessment will be shown to candidates during the
                        application process.
                      </p>
                      {/* TODO: Add actual assessment preview component here */}
                      <div className="bg-muted/50 rounded p-8 text-center">
                        <p className="text-sm">
                          Assessment preview will appear here
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          (Integration with AssessmentQuestions preview
                          component)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </FormCard>

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
