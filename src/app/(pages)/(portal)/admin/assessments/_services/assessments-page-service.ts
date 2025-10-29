"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Assessment,
  AssessmentQuestion,
  AssessmentCategory,
  CreateAssessmentInput,
  AssessmentType,
  AssessmentStatus,
} from "@/types/assessment-types";

const assessmentsQueryKey = "assessments";

export interface AssessmentFilters {
  status?: string;
  type?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

// Re-export types for convenience
export type {
  Assessment,
  AssessmentQuestion,
  AssessmentCategory,
  CreateAssessmentInput,
};

// Mock data store (in real app, this would be in a database)
let mockAssessmentsStore: Assessment[] = [
  {
    id: "1",
    internal_pollen_title: "Frontend Developer Skills Assessment",
    title: "Frontend Developer Skills Assessment",
    subtitle: "Evaluate React and TypeScript proficiency",
    type: "multiple_choice",
    status: "draft",
    categories: [
      {
        id: "1",
        name: "React",
        description: "React framework knowledge",
        color: "#61DAFB",
      },
      {
        id: "2",
        name: "TypeScript",
        description: "TypeScript language skills",
        color: "#3178C6",
      },
    ],
    questions: [
      {
        id: "q1",
        title: "What is the purpose of React Hooks?",
        subtitle: "Select the best answer",
        type: "multiple_choice",
        multiple_choice: {
          options: [
            { value: "1", label: "To manage state in functional components", categoryId: "1" },
            { value: "2", label: "To replace class components", categoryId: "1" },
            { value: "3", label: "To create side effects", categoryId: "1" },
            { value: "4", label: "All of the above", categoryId: "1" },
          ],
          options_title: "Choose one option",
          categoryId: "1",
        },
      },
      {
        id: "q2",
        title: "What is TypeScript's main benefit?",
        subtitle: "Choose the most accurate answer",
        type: "multiple_choice",
        multiple_choice: {
          options: [
            { value: "1", label: "Type safety", categoryId: "2" },
            { value: "2", label: "Better IDE support", categoryId: "2" },
            { value: "3", label: "Catches errors at compile time", categoryId: "2" },
            { value: "4", label: "All of the above", categoryId: "2" },
          ],
          options_title: "Select the best option",
          categoryId: "2",
        },
      },
    ],
    questions_count: 2,
    estimated_duration: "30 minutes",
    created_at: "2024-10-20T10:00:00Z",
    updated_at: "2024-10-25T14:30:00Z",
    created_by: "Admin User",
  },
  {
    id: "2",
    internal_pollen_title: "Product Management Case Study",
    title: "Product Management Case Study",
    subtitle: "Assess strategic thinking and problem-solving",
    type: "free_input",
    status: "live",
    questions: [
      {
        id: "q1",
        title: "Describe a product launch strategy",
        subtitle: "Include timeline and key milestones",
        type: "free_input",
        free_input: {
          placeholder: "Enter your detailed strategy here...",
        },
      },
      {
        id: "q2",
        title: "How would you prioritize features?",
        subtitle: "Explain your decision-making process",
        type: "free_input",
        free_input: {
          placeholder: "Describe your prioritization framework...",
        },
      },
    ],
    questions_count: 2,
    estimated_duration: "45 minutes",
    created_at: "2024-10-15T09:00:00Z",
    updated_at: "2024-10-22T11:20:00Z",
    created_by: "Admin User",
  },
  {
    id: "3",
    internal_pollen_title: "Design Portfolio Review",
    title: "Design Portfolio Review",
    subtitle: "Upload and review design work samples",
    type: "file_upload",
    status: "live",
    questions: [
      {
        id: "q1",
        title: "Upload your best UI design",
        subtitle: "Include screenshots and design files",
        type: "file_upload",
        file_upload: {
          referenceFiles: [
            {
              id: "ref1",
              name: "Design Guidelines",
              fileName: "guidelines.pdf",
              file: null,
            },
          ],
        },
      },
    ],
    questions_count: 1,
    estimated_duration: "20 minutes",
    created_at: "2024-10-18T13:00:00Z",
    updated_at: "2024-10-26T16:45:00Z",
    created_by: "Admin User",
  },
  {
    id: "4",
    internal_pollen_title: "Backend Engineering Assessment",
    title: "Backend Engineering Assessment",
    subtitle: "Test Node.js and database knowledge",
    type: "multiple_choice",
    status: "live",
    questions: [],
    questions_count: 20,
    estimated_duration: "40 minutes",
    created_at: "2024-10-12T08:00:00Z",
    updated_at: "2024-10-24T10:15:00Z",
    created_by: "Admin User",
  },
  {
    id: "5",
    internal_pollen_title: "Sales Skills Evaluation",
    title: "Sales Skills Evaluation",
    subtitle: "Assess communication and persuasion abilities",
    type: "free_input",
    status: "paused",
    questions: [],
    questions_count: 8,
    estimated_duration: "35 minutes",
    created_at: "2024-10-10T12:00:00Z",
    updated_at: "2024-10-23T15:30:00Z",
    created_by: "Admin User",
    total_submissions: 18,
  },
  {
    id: "6",
    internal_pollen_title: "Marketing Campaign Analysis",
    title: "Marketing Campaign Analysis",
    subtitle: "Upload campaign materials and strategy documents",
    type: "file_upload",
    status: "draft",
    questions: [],
    questions_count: 4,
    estimated_duration: "25 minutes",
    created_at: "2024-10-08T14:00:00Z",
    updated_at: "2024-10-21T09:00:00Z",
    created_by: "Admin User",
  },
];

export function useAssessmentsList(filters: AssessmentFilters) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;

      // Apply filters
      let filteredAssessments = [...mockAssessmentsStore];

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
            (a.subtitle?.toLowerCase().includes(searchLower) ?? false),
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

export function useAssessmentById(id: string) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "detail", id],
    queryFn: async () => {
      if (!id) return null;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const assessment = mockAssessmentsStore.find((a) => a.id === id);

      if (!assessment) {
        throw new Error("Assessment not found");
      }

      return assessment;
    },
    enabled: !!id, // Only run query if id is provided
  });
}

export function useAssessmentsStatistics(filters?: AssessmentFilters) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "statistics", filters],
    queryFn: async () => {
      const assessments = mockAssessmentsStore;

      // Calculate statistics
      const stats = {
        total: assessments.length,
        draft: assessments.filter((a) => a.status === "draft").length,
        live: assessments.filter((a) => a.status === "live").length,
        paused: assessments.filter((a) => a.status === "paused").length,
        archived: assessments.filter((a) => a.status === "archived").length,
        multiple_choice: assessments.filter((a) => a.type === "multiple_choice")
          .length,
        free_input: assessments.filter((a) => a.type === "free_input").length,
        file_upload: assessments.filter((a) => a.type === "file_upload").length,
      };

      return stats;
    },
  });
}

// Mutation to create a new assessment
export function useCreateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAssessmentInput) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create new assessment
      const newAssessment: Assessment = {
        id: Date.now().toString(),
        internal_pollen_title: input.internal_pollen_title,
        title: input.title,
        subtitle: input.subtitle,
        type: input.type,
        status: "draft",
        questions_count: input.questions.length,
        estimated_duration: input.estimated_duration,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: "Admin User", // TODO: Get from auth context
        total_submissions: 0,
        categories: input.categories,
        questions: input.questions,
        instructions_title: input.instructions_title,
        instructions_description: input.instructions_description,
      };

      // Add to mock store
      mockAssessmentsStore = [newAssessment, ...mockAssessmentsStore];

      return newAssessment;
    },
    onSuccess: () => {
      // Invalidate and refetch assessments queries
      queryClient.invalidateQueries({ queryKey: [assessmentsQueryKey] });
    },
  });
}

// Mutation to update an assessment
export function useUpdateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: Partial<CreateAssessmentInput>;
    }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Find and update assessment
      const index = mockAssessmentsStore.findIndex((a) => a.id === id);
      if (index === -1) {
        throw new Error("Assessment not found");
      }

      const updatedAssessment: Assessment = {
        ...mockAssessmentsStore[index],
        ...input,
        questions_count:
          input.questions?.length ??
          mockAssessmentsStore[index].questions_count,
        updated_at: new Date().toISOString(),
      };

      mockAssessmentsStore[index] = updatedAssessment;

      return updatedAssessment;
    },
    onSuccess: () => {
      // Invalidate and refetch assessments queries
      queryClient.invalidateQueries({ queryKey: [assessmentsQueryKey] });
    },
  });
}

// Mutation to delete an assessment
export function useDeleteAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove from mock store
      mockAssessmentsStore = mockAssessmentsStore.filter((a) => a.id !== id);

      return { id };
    },
    onSuccess: () => {
      // Invalidate and refetch assessments queries
      queryClient.invalidateQueries({ queryKey: [assessmentsQueryKey] });
    },
  });
}
