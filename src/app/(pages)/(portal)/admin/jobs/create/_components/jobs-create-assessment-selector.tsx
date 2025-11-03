"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAssessmentsList } from "@/assessments/_services/assessments-page-service";

const ASSESSMENT_TYPE_LABELS = {
  multiple_choice: "Multiple Choice",
  free_input: "Free Input",
  file_upload: "File Upload",
};

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

export function AssessmentSelector({ isOpen, onClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: Technical Debt - Using assessments service from admin module
  // Fetch only live assessments
  const { data } = useAssessmentsList({
    status: "live",
    searchTerm: searchTerm,
    page: 1,
    pageSize: 100, // Get all live assessments
  });

  // Client-side filtering for better UX (in addition to server-side search)
  const filteredAssessments = useMemo(() => {
    const assessments = data?.assessments || [];
    if (!searchTerm.trim()) return assessments;

    const search = searchTerm.toLowerCase();
    return assessments.filter(
      (assessment) =>
        assessment.title?.toLowerCase().includes(search) ||
        assessment.internal_pollen_title?.toLowerCase().includes(search) ||
        assessment.subtitle?.toLowerCase().includes(search),
    );
  }, [data?.assessments, searchTerm]);

  const handleSelectAssessment = (assessment) => {
    onSelect(assessment);
    onClose();
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Select Assessment</DialogTitle>
          <DialogDescription>
            Choose an assessment to assign to this job position
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search assessments by title, subtitle, or internal name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Assessment Cards List */}
          <div className="space-y-3 overflow-y-auto max-h-[calc(85vh-180px)] pr-2">
            {filteredAssessments.map((assessment) => (
              <Card
                key={assessment.id}
                className="hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
                onClick={() => handleSelectAssessment(assessment)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Section - Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Title and Badges */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-base font-semibold text-foreground">
                          {assessment.internal_pollen_title ?? assessment.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-medium",
                            STATUS_COLORS[assessment.status],
                          )}
                        >
                          {STATUS_LABELS[assessment.status]}
                        </Badge>
                      </div>

                      {/* Subtitle */}
                      {assessment.subtitle && (
                        <p className="text-sm text-muted-foreground">
                          {assessment.subtitle}
                        </p>
                      )}

                      {/* Assessment Details */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{ASSESSMENT_TYPE_LABELS[assessment.type]}</span>
                        <span>•</span>
                        <span>
                          {assessment.questions_count}{" "}
                          {assessment.questions_count === 1
                            ? "Question"
                            : "Questions"}
                        </span>
                        <span>•</span>
                        <span>{assessment.estimated_duration}</span>
                      </div>
                    </div>

                    {/* Right Section - Completeness */}
                    <div className="text-right bg-muted/30 p-3 rounded-lg min-w-[100px]">
                      <div className="text-xs text-muted-foreground">
                        Completeness
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {assessment.assessment_completeness}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredAssessments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">No assessments found</p>
                <p className="text-sm mt-2">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
