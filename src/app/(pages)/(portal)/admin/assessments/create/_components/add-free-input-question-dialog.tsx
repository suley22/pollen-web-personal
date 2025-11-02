"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/design-system";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AssessmentQuestion } from "@/types/assessment-question";

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
  const [description, setDescription] = useState("");
  const [maxCharacters, setMaxCharacters] = useState<number>(1000);

  // Reset form when dialog opens/closes or when editing question changes
  useEffect(() => {
    if (open) {
      if (editingQuestion) {
        setTitle(editingQuestion.title);
        setDescription(editingQuestion.description);
        setMaxCharacters(editingQuestion.max_characters || 1000);
      } else {
        setTitle("");
        setDescription("");
        setMaxCharacters(1000);
      }
    }
  }, [open, editingQuestion]);

  const handleSave = () => {
    const question: Omit<AssessmentQuestion, "id"> = {
      type: "free_input",
      title,
      description,
      max_characters: maxCharacters,
    };
    onSave(question);
    onOpenChange(false);
  };

  const canSave = title.trim() && description.trim() && maxCharacters > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingQuestion ? "Edit" : "Add"} Free Input Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Question Title */}
          <div className="space-y-2">
            <Label className="" htmlFor="title">
              Question Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter question title"
            />
          </div>

          {/* Question Description */}
          <div className="space-y-2">
            <Label className="" htmlFor="description">
              Question Description *
            </Label>
            <Textarea
              className=""
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter question description"
              rows={3}
            />
          </div>

          {/* Max Characters */}
          <div className="space-y-2">
            <Label className="" htmlFor="maxChars">
              Maximum Characters
            </Label>
            <Input
              id="maxChars"
              type="number"
              value={maxCharacters}
              onChange={(e) => setMaxCharacters(Number(e.target.value))}
              placeholder="1000"
              min={1}
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of characters allowed in the response
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            size="default"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave} size="default">
            {editingQuestion ? "Update" : "Add"} Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
