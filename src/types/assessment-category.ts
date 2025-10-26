export interface AssessmentCategory {
  id: string;
  name: string;
  description: string;
  color: string; // hex color
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  color: string;
  count: number;
  percentage: number;
}
