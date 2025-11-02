import type { AssessmentQuestion } from "./assessment-question";
import type { AssessmentCategory } from "./assessment-types";

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  categories: AssessmentCategory[];
  created_at?: string;
  updated_at?: string;
}

export interface AssessmentResponse {
  assessment_id: string;
  answers: Record<string, string>; // question_id -> option_value
  completed_at?: string;
}
