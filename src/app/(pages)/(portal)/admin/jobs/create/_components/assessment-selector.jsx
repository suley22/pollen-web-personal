"use client";

import { useState } from "react";
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

  // Mock assessments - TODO: Replace with useAssessmentsList service
  const mockAssessments = [
    {
      id: "1",
      internal_pollen_title: "Sales Skills Assessment",
      title: "Sales Representative Evaluation",
      subtitle: "Comprehensive sales aptitude test",
      type: "multiple_choice",
      status: "live",
      questions_count: 10,
      estimated_duration: "15 min",
      created_at: "2024-10-20",
      updated_at: "2024-10-28",
      created_by: { full_name: "John Doe" },
      assessment_completeness: 95,
    },
    {
      id: "2",
      internal_pollen_title: "Technical Problem Solving",
      title: "Software Engineering Challenge",
      subtitle: "Algorithmic thinking and code quality",
      type: "free_input",
      status: "live",
      questions_count: 5,
      estimated_duration: "30 min",
      created_at: "2024-10-15",
      updated_at: "2024-10-25",
      created_by: { full_name: "Jane Smith" },
      assessment_completeness: 100,
    },
    {
      id: "3",
      internal_pollen_title: "Design Portfolio Review",
      title: "UX/UI Design Portfolio",
      subtitle: "Submit your best design work",
      type: "file_upload",
      status: "live",
      questions_count: 3,
      estimated_duration: "10 min",
      created_at: "2024-10-18",
      updated_at: "2024-10-27",
      created_by: { full_name: "Mike Johnson" },
      assessment_completeness: 85,
    },
    {
      id: "4",
      internal_pollen_title: "Customer Service Skills",
      title: "Customer Support Excellence",
      subtitle: "Communication and problem resolution",
      type: "multiple_choice",
      status: "live",
      questions_count: 12,
      estimated_duration: "20 min",
      created_at: "2024-10-22",
      updated_at: "2024-10-29",
      created_by: { full_name: "Sarah Wilson" },
      assessment_completeness: 90,
    },
  ];

  const filteredAssessments = mockAssessments.filter(
    (assessment) =>
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.internal_pollen_title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      assessment.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
