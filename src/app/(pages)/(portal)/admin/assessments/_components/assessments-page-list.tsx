"use client";

import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Clock,
  HelpCircle,
  Eye,
  Edit,
  Users,
  Upload,
  ListChecks,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { EmptyState } from "@/components/design-system/empty-state";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { ResultsCount } from "./assessments-page-results-count";
import { ListSkeleton } from "./assessments-page-list-skeleton";
import { DateHelper } from "@/lib/helpers/date-helper";

const ASSESSMENT_TYPE_LABELS = {
  multiple_choice: "Multiple Choice",
  free_input: "Free Input",
  file_upload: "File Upload",
};

const ASSESSMENT_TYPE_COLORS = {
  multiple_choice: "bg-blue-50 text-blue-700 border-blue-200",
  free_input: "bg-purple-50 text-purple-700 border-purple-200",
  file_upload: "bg-green-50 text-green-700 border-green-200",
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

export function AssessmentsList({
  assessments,
  loading,
  pagination,
  handlePageChange,
  handlePageSizeChange,
}) {
  const router = useRouter();

  const onAssessmentClick = useCallback((assessment) => {
    // TODO: Update route when view page is created
    console.log("View assessment:", assessment.id);
  }, []);

  if (loading) {
    return <ListSkeleton />;
  }

  if (assessments.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No assessments found"
        description="No assessments match your current filters. Try adjusting your search criteria or create a new assessment."
      />
    );
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <ResultsCount
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
      {assessments.map((assessment) => {
        return (
          <Card
            key={assessment.id}
            className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
            onClick={() => onAssessmentClick(assessment)}
          >
            <CardContent className="px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                {/* Left Section - Icon and Info */}
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Title and Badges */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold text-foreground">
                          {assessment.internal_pollen_title ?? assessment.title}
                        </h3>
                        <div className="flex items-center gap-2">
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
                      </div>

                      <div className="flex flex-col gap-2">
                        {/* Title */}
                        {assessment.internal_pollen_title && (
                          <p className="text-sm">
                            {assessment.internal_pollen_title}
                          </p>
                        )}

                        {/* Subtitle */}
                        {assessment.subtitle && (
                          <p className="text-sm text-muted-foreground">
                            {assessment.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Assessment Details - 2 Rows */}
                    <div className="flex flex-col gap-4 text-sm">
                      {/* First Row: Questions and Duration */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="flex justify-center gap-2">
                            {assessment.type == "multiple_choice" && (
                              <>
                                <ListChecks className="w-4 h-4 flex-shrink-0" />
                                <span>Multiple Choice </span>
                              </>
                            )}
                            {assessment.type === "file_upload" && (
                              <>
                                <Upload className="w-4 h-4 flex-shrink-0" />
                                <span> File Upload </span>
                              </>
                            )}
                            {assessment.type === "free_input" && (
                              <>
                                <FileText className="w-4 h-4 flex-shrink-0" />
                                <span> Free Input </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <HelpCircle className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {assessment.questions_count}{" "}
                            {assessment.questions_count === 1
                              ? "Question"
                              : "Questions"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{assessment.estimated_duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right Section - Stats */}
                  <div className="flex flex-col justify-end gap-3">
                    <div className="text-right space-y-1 bg-muted/30 p-3 rounded-lg min-w-[120px]">
                      <div className="text-xs text-muted-foreground">
                        Completion Rate
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        {assessment.status === "draft"
                          ? "—"
                          : `${Math.round(Math.random() * 100)}%`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {assessment.status === "draft"
                          ? "Not published"
                          : "Avg score"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Divider and Actions */}
              <div className="flex flex-row justify-between border-t border-border/50 pt-3 mt-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    Created:{" "}
                    {DateHelper.formatRelativeDate(assessment.created_at)}
                  </span>
                  <span>
                    Updated:{" "}
                    {DateHelper.formatRelativeDate(assessment.updated_at)}
                  </span>
                  <span>by: {assessment.created_by}</span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  {/* Second Row: Created/Updated info */}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(AdminRoutes.assessmentView(assessment.id));
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="text-xs">View</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(AdminRoutes.assessmentEdit(assessment.id));
                    }}
                    onMouseEnter={() => {
                      // Prefetch the edit page on hover for instant navigation
                      router.prefetch(
                        AdminRoutes.assessmentEdit(assessment.id),
                      );
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    <span className="text-xs">Edit</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <ResultsCount
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
