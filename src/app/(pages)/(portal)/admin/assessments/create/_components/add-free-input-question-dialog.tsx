"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";
import {
  Input,
  TextareaInput,
  Divider,
  PrimaryButton,
  SecondaryButton,
  PageHeader,
} from "@/components/design-system";
import { CheckCircle } from "lucide-react";
import type { AssessmentQuestion } from "@/types/assessment-types";

interface AddFreeInputQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (question: Omit<AssessmentQuestion, "id">) => void;
  editingQuestion?: AssessmentQuestion | null;
}

export function AddFreeInputQuestionDialog({
  open,
  onOpenChange,
  onSave,
  editingQuestion,
}: AddFreeInputQuestionDialogProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // Reset form when dialog opens/closes or when editing question changes
  useEffect(() => {
    if (open) {
      if (editingQuestion) {
        setTitle(editingQuestion.title);
        setSubtitle(editingQuestion.subtitle || "");
        setPlaceholder(editingQuestion.free_input?.placeholder || "");
      } else {
        setTitle("");
        setSubtitle("");
        setPlaceholder("");
      }
    }
  }, [open, editingQuestion]);

  const handleSave = () => {
    const question: Omit<AssessmentQuestion, "id"> = {
      type: "free_input",
      title,
      subtitle: subtitle,
      free_input: {
        placeholder: placeholder,
      },
    };
    onSave(question);
    onOpenChange(false);
  };

  const canSave = title.trim() !== "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="!w-[50vw] !max-w-[50vw] overflow-y-auto p-6"
      >
        <PageHeader
          title={
            editingQuestion
              ? "Edit Free Input Question"
              : "Add Free Input Question"
          }
        />

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center text-lg font-medium mt-2">
            <CheckCircle className="h-5 w-5" />
            Question Details
          </div>

          <Divider />

          {/* Question Title */}
          <Input
            label="Question Title *"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the question title"
          />

          {/* Question Subtitle */}
          <Input
            label="Question Subtitle"
            name="subtitle"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter a subtitle or additional context (optional)"
          />

          {/* Answer Placeholder */}
          <TextareaInput
            label="Answer Placeholder"
            name="placeholder"
            id="placeholder"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="Enter placeholder text for the answer field"
            rows={3}
          />
          <p className="text-xs text-muted-foreground -mt-2">
            This text will appear in the answer textarea to guide users
          </p>
        </div>

        <SheetFooter className="mt-6 gap-4">
          <Divider />
          <SecondaryButton text="Cancel" onClick={() => onOpenChange(false)} />
          <PrimaryButton
            text={editingQuestion ? "Update Question" : "Add Question"}
            onClick={handleSave}
            disabled={!canSave}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
