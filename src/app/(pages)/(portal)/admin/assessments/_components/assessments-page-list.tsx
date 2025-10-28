"use client";

import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, HelpCircle, Eye, Edit, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { EmptyState } from "@/components/design-system/empty-state";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="px-5 py-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
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
      {/* Results Count - Top */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {pagination.from} to {pagination.to} of{" "}
          {pagination.totalItems} assessments
        </span>
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Assessment Cards */}
      {assessments.map((assessment) => {
        return (
          <Card
            key={assessment.id}
            className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
            onClick={() => onAssessmentClick(assessment)}
          >
            <CardContent className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                {/* Left Section - Icon and Info */}
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Title and Badges */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold text-foreground">
                          {assessment.title}
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
                          <Badge
                            variant="outline"
                            className={cn(
                              "font-medium",
                              ASSESSMENT_TYPE_COLORS[assessment.type],
                            )}
                          >
                            {ASSESSMENT_TYPE_LABELS[assessment.type]}
                          </Badge>
                        </div>
                      </div>

                      {/* Subtitle */}
                      {assessment.subtitle && (
                        <p className="text-sm text-muted-foreground">
                          {assessment.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Assessment Details - 2 Rows */}
                    <div className="space-y-2 text-sm">
                      {/* First Row: Questions and Duration */}
                      <div className="flex items-center gap-4">
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
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {assessment.total_submissions} submissions
                          </span>
                        </div>
                      </div>

                      {/* Second Row: Created/Updated info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created {formatDate(assessment.created_at)}</span>
                        <span>•</span>
                        <span>Updated {formatDate(assessment.updated_at)}</span>
                        <span>•</span>
                        <span>by {assessment.created_by}</span>
                      </div>
                    </div>

                    {/* Divider and Actions */}
                    <div className="border-t border-border/50 pt-3 mt-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // TODO: Implement view action
                            console.log("View assessment:", assessment.id);
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
                            // TODO: Implement edit action
                            console.log("Edit assessment:", assessment.id);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          <span className="text-xs">Edit</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Stats */}
                <div className="flex flex-col justify-start gap-3">
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
            </CardContent>
          </Card>
        );
      })}

      {/* Pagination - Bottom */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className=""
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className=""
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
