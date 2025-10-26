export interface AssessmentQuestionOption {
  value: string;
  label: string;
  categoryId?: string;
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  description: string;
  options_title: string;
  options: AssessmentQuestionOption[];
}
