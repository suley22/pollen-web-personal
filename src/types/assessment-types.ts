export type AssessmentType = "multiple_choice" | "free_input" | "file_upload";

export type AssessmentStatus = "draft" | "live" | "paused";

export enum AssessmentTypeEnum {
  MultipleChoice = "multiple_choice",
  FreeInput = "free_input",
  FileUpload = "file_upload",
}

export enum AssessmentStatusEnum {
  Draft = "draft",
  Live = "live",
  Paused = "paused",
}

export interface AssessmentQuestion {
  id?: string;
  title: string;
  subtitle?: string;
  type: AssessmentType;
  options?: Array<{
    value: string;
    label: string;
    categoryId?: string;
  }>;
  categoryId?: string;
  placeholder?: string;
  referenceFiles?: Array<{
    id: string;
    name: string;
    fileName: string;
  }>;
}

export interface AssessmentCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export interface Assessment {
  id: string;
  internal_pollen_title?: string;
  title: string;
  subtitle?: string;
  estimated_duration?: string;
  instructions_title?: string;
  instructions_description?: string;
  type: AssessmentType;
  status: AssessmentStatus;
  categories?: AssessmentCategory[];
  questions: AssessmentQuestion[];
  total_questions?: number;
  total_submissions?: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface CreateAssessmentInput {
  internal_pollen_title?: string;
  title: string;
  subtitle?: string;
  estimated_duration?: string;
  instructions_title?: string;
  instructions_description?: string;
  type: AssessmentType;
  categories?: AssessmentCategory[];
  questions: AssessmentQuestion[];
}

export interface AssessmentStatistics {
  total: number;
  draft: number;
  live: number;
  paused: number;
}

export class AssessmentHelper {
  /**
   * Returns a user-friendly display name for assessment types
   */
  static getTypeDisplay(type: AssessmentType): string {
    const typeDisplayMap: Record<AssessmentType, string> = {
      multiple_choice: "Multiple Choice",
      free_input: "Free Input",
      file_upload: "File Upload",
    };
    return typeDisplayMap[type] || type;
  }

  /**
   * Returns a user-friendly display name for assessment status
   */
  static getStatusDisplay(status: AssessmentStatus): string {
    const statusDisplayMap: Record<AssessmentStatus, string> = {
      draft: "Draft",
      live: "Live",
      paused: "Paused",
    };
    return statusDisplayMap[status] || status;
  }

  /**
   * Returns the display title (internal_pollen_title or title)
   */
  static getDisplayTitle(assessment: Assessment): string {
    return assessment.internal_pollen_title || assessment.title;
  }

  /**
   * Returns formatted created date
   */
  static getFormattedCreatedAt(created_at: string): string {
    if (!created_at) return "N/A";
    try {
      return new Date(created_at).toLocaleDateString();
    } catch {
      return created_at;
    }
  }

  /**
   * Returns formatted updated date
   */
  static getFormattedUpdatedAt(updated_at: string): string {
    if (!updated_at) return "N/A";
    try {
      return new Date(updated_at).toLocaleDateString();
    } catch {
      return updated_at;
    }
  }

  /**
   * Validates if an assessment has minimum required data
   */
  static isValid(assessment: Partial<CreateAssessmentInput>): boolean {
    if (!assessment.title?.trim()) return false;
    if (!assessment.type) return false;
    if (!assessment.questions || assessment.questions.length === 0) return false;

    // Validate each question has at least a title
    return assessment.questions.every((q) => q.title?.trim());
  }

  /**
   * Returns the color class for status badges
   */
  static getStatusColorClass(status: AssessmentStatus): string {
    const colorMap: Record<AssessmentStatus, string> = {
      draft: "bg-gray-100 text-gray-800",
      live: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  }

  /**
   * Returns the color class for type badges
   */
  static getTypeColorClass(type: AssessmentType): string {
    const colorMap: Record<AssessmentType, string> = {
      multiple_choice: "bg-blue-100 text-blue-800",
      free_input: "bg-purple-100 text-purple-800",
      file_upload: "bg-orange-100 text-orange-800",
    };
    return colorMap[type] || "bg-gray-100 text-gray-800";
  }

  /**
   * Calculates assessment completeness based on filled fields
   */
  static calculateCompleteness(assessment: Partial<Assessment>): number {
    const fields = [
      "title",
      "subtitle",
      "estimated_duration",
      "instructions_title",
      "instructions_description",
      "type",
      "questions",
    ];

    const filledFields = fields.filter((field) => {
      const value = assessment[field as keyof Assessment];
      if (Array.isArray(value)) return value.length > 0;
      return value && value !== null && value !== "";
    });

    return Math.round((filledFields.length / fields.length) * 100);
  }

  /**
   * Creates a default assessment object
   */
  static createDefault(): Partial<CreateAssessmentInput> {
    return {
      title: "",
      subtitle: "",
      estimated_duration: "",
      instructions_title: "",
      instructions_description: "",
      type: AssessmentTypeEnum.MultipleChoice,
      categories: [],
      questions: [],
    };
  }

  /**
   * Filters questions by category
   */
  static getQuestionsByCategory(
    questions: AssessmentQuestion[],
    categoryId?: string
  ): AssessmentQuestion[] {
    if (!categoryId) {
      return questions.filter((q) => !q.categoryId);
    }
    return questions.filter((q) => q.categoryId === categoryId);
  }

  /**
   * Returns questions count text
   */
  static getQuestionsCountText(count: number): string {
    return count === 1 ? "1 question" : `${count} questions`;
  }

  /**
   * Returns submissions count text
   */
  static getSubmissionsCountText(count: number): string {
    return count === 1 ? "1 submission" : `${count} submissions`;
  }
}
