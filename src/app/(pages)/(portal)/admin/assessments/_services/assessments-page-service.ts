"use client";

import { useQuery } from "@tanstack/react-query";

const assessmentsQueryKey = "assessments";

export interface AssessmentFilters {
  status?: string;
  type?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export function useAssessmentsList(filters: AssessmentFilters) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;

      // Mock data
      const mockAssessments = [
        {
          id: "1",
          title: "Frontend Developer Skills Assessment",
          subtitle: "Evaluate React and TypeScript proficiency",
          type: "multiple_choice",
          status: "draft",
          questions_count: 15,
          estimated_duration: "30 minutes",
          created_at: "2024-10-20T10:00:00Z",
          updated_at: "2024-10-25T14:30:00Z",
          created_by: "Admin User",
          total_submissions: 0,
        },
        {
          id: "2",
          title: "Product Management Case Study",
          subtitle: "Assess strategic thinking and problem-solving",
          type: "free_input",
          status: "live",
          questions_count: 5,
          estimated_duration: "45 minutes",
          created_at: "2024-10-15T09:00:00Z",
          updated_at: "2024-10-22T11:20:00Z",
          created_by: "Admin User",
          total_submissions: 23,
        },
        {
          id: "3",
          title: "Design Portfolio Review",
          subtitle: "Upload and review design work samples",
          type: "file_upload",
          status: "live",
          questions_count: 3,
          estimated_duration: "20 minutes",
          created_at: "2024-10-18T13:00:00Z",
          updated_at: "2024-10-26T16:45:00Z",
          created_by: "Admin User",
          total_submissions: 12,
        },
        {
          id: "4",
          title: "Backend Engineering Assessment",
          subtitle: "Test Node.js and database knowledge",
          type: "multiple_choice",
          status: "live",
          questions_count: 20,
          estimated_duration: "40 minutes",
          created_at: "2024-10-12T08:00:00Z",
          updated_at: "2024-10-24T10:15:00Z",
          created_by: "Admin User",
          total_submissions: 45,
        },
        {
          id: "5",
          title: "Sales Skills Evaluation",
          subtitle: "Assess communication and persuasion abilities",
          type: "free_input",
          status: "paused",
          questions_count: 8,
          estimated_duration: "35 minutes",
          created_at: "2024-10-10T12:00:00Z",
          updated_at: "2024-10-23T15:30:00Z",
          created_by: "Admin User",
          total_submissions: 18,
        },
        {
          id: "6",
          title: "Marketing Campaign Analysis",
          subtitle: "Upload campaign materials and strategy documents",
          type: "file_upload",
          status: "draft",
          questions_count: 4,
          estimated_duration: "25 minutes",
          created_at: "2024-10-08T14:00:00Z",
          updated_at: "2024-10-21T09:00:00Z",
          created_by: "Admin User",
          total_submissions: 0,
        },
      ];

      // Apply filters
      let filteredAssessments = [...mockAssessments, ...mockAssessments];

      if (filters.status && filters.status !== "all") {
        filteredAssessments = filteredAssessments.filter(
          (a) => a.status === filters.status,
        );
      }

      if (filters.type && filters.type !== "all") {
        filteredAssessments = filteredAssessments.filter(
          (a) => a.type === filters.type,
        );
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filteredAssessments = filteredAssessments.filter(
          (a) =>
            a.title.toLowerCase().includes(searchLower) ||
            a.subtitle.toLowerCase().includes(searchLower),
        );
      }

      // Pagination
      const total = filteredAssessments.length;
      const from = (page - 1) * pageSize;
      const to = from + pageSize;
      const paginatedAssessments = filteredAssessments.slice(from, to);
      const totalPages = Math.ceil(total / pageSize);

      return {
        assessments: paginatedAssessments,
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: from + 1,
          to: Math.min(to, total),
        },
      };
    },
  });
}

export function useAssessmentsStatistics(filters?: AssessmentFilters) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "statistics", filters],
    queryFn: async () => {
      // Mock statistics
      return {
        total: 6,
        draft: 2,
        live: 3,
        paused: 1,
        archived: 0,
        multiple_choice: 2,
        free_input: 2,
        file_upload: 2,
      };
    },
  });
}
