"use client";

import {
  ListChecks,
  FileText,
  Upload,
  Edit,
  Trash2,
  MoveUp,
  MoveDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AssessmentQuestion } from "@/types/assessment-question";
import type { AssessmentCategory } from "@/types/assessment-types";

interface QuestionsListProps {
  questions: AssessmentQuestion[];
  categories: AssessmentCategory[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const TYPE_CONFIG = {
  multiple_choice: {
    icon: ListChecks,
    label: "Multiple Choice",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  free_input: {
    icon: FileText,
    label: "Free Input",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  file_upload: {
    icon: Upload,
    label: "File Upload",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

export function QuestionsList({
  questions,
  categories,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: QuestionsListProps) {
  if (questions.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-3 mb-4">
            <ListChecks className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-1">No questions yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Start building your assessment by adding questions. You can mix
            different types of questions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {questions.map((question, index) => {
        const typeConfig = TYPE_CONFIG[question.type];
        const TypeIcon = typeConfig.icon;

        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Question Number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>

                {/* Question Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={typeConfig.color}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {typeConfig.label}
                    </Badge>
                  </div>

                  <h4 className="font-semibold text-base mb-1">
                    {question.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {question.description}
                  </p>

                  {/* Type-specific details */}
                  {question.type === "multiple_choice" && question.options && (
                    <div className="text-xs text-muted-foreground">
                      {question.options.length} option
                      {question.options.length !== 1 ? "s" : ""}
                      {question.options.some((opt) => opt.categoryId) && (
                        <span className="ml-2">• With categories</span>
                      )}
                    </div>
                  )}

                  {question.type === "free_input" &&
                    question.max_characters && (
                      <div className="text-xs text-muted-foreground">
                        Max {question.max_characters} characters
                      </div>
                    )}

                  {question.type === "file_upload" && (
                    <div className="text-xs text-muted-foreground">
                      Max {question.max_file_size || 10} MB
                      {question.accepted_file_types &&
                        question.accepted_file_types.length > 0 && (
                          <span className="ml-2">
                            • {question.accepted_file_types.join(", ")}
                          </span>
                        )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(index)}
                      title="Edit question"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(index)}
                      title="Delete question"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMoveUp(index)}
                      disabled={index === 0}
                      title="Move up"
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMoveDown(index)}
                      disabled={index === questions.length - 1}
                      title="Move down"
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
