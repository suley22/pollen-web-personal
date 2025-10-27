"use client";

import {
  FormCard,
  Input,
  TextareaInput,
  PrimaryButton,
} from "@/components/design-system";
import { Plus, X } from "lucide-react";

interface FreeInputQuestion {
  title: string;
  subtitle: string;
  placeholder: string;
}

interface AssessmentCreateFreeInputQuestionsProps {
  title: string;
  subtitle: string;
  placeholder: string;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onPlaceholderChange: (value: string) => void;
  onAddQuestion: () => void;
}

export function AssessmentCreateFreeInputQuestions({
  title,
  subtitle,
  placeholder,
  onTitleChange,
  onSubtitleChange,
  onPlaceholderChange,
  onAddQuestion,
}: AssessmentCreateFreeInputQuestionsProps) {
  const isFormValid = title.trim() !== "";

  return (
    <FormCard title="Add Free Input Question">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <Input
          label="Question Title"
          type="text"
          name="question_title"
          id="question_title"
          placeholder="Enter the question title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />

        {/* Subtitle */}
        <Input
          label="Question Subtitle"
          type="text"
          name="question_subtitle"
          id="question_subtitle"
          placeholder="Enter a subtitle or additional context (optional)"
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
        />

        {/* Placeholder */}
        <TextareaInput
          label="Answer Placeholder"
          name="answer_placeholder"
          id="answer_placeholder"
          placeholder="Enter placeholder text for the answer field"
          value={placeholder}
          onChange={(e) => onPlaceholderChange(e.target.value)}
          rows={3}
          helperText="This text will appear in the answer textarea to guide users"
        />

        {/* Add Question Button */}
        <div className="flex justify-end">
          <PrimaryButton
            text="Add Question"
            icon={<Plus />}
            onClick={onAddQuestion}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </FormCard>
  );
}
