export interface AssessmentQuestionOption {
  value: string;
  label: string;
  categoryId?: string;
}

export type QuestionType = "multiple_choice" | "free_input" | "file_upload";

export interface AssessmentQuestion {
  id: string;
  type: QuestionType; // Tipo de pregunta
  title: string;
  description: string;
  options_title?: string; // Opcional, solo para multiple_choice
  options?: AssessmentQuestionOption[]; // Opcional, solo para multiple_choice
  max_file_size?: number; // Opcional, solo para file_upload (en MB)
  accepted_file_types?: string[]; // Opcional, solo para file_upload
  max_characters?: number; // Opcional, solo para free_input
}
