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
import { CategorySelector } from "@/components/design-system/category-selector";
import { Plus, X } from "lucide-react";
import type {
  AssessmentQuestion,
  AssessmentQuestionOption,
} from "@/types/assessment-question";
import type { AssessmentCategory } from "@/types/assessment-types";

interface AddMultipleChoiceQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (question: Omit<AssessmentQuestion, "id">) => void;
  categories: AssessmentCategory[];
  editingQuestion?: AssessmentQuestion | null;
}

export function AddMultipleChoiceQuestionDialog({
  open,
  onOpenChange,
  onSave,
  categories,
  editingQuestion,
}: AddMultipleChoiceQuestionDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optionsTitle, setOptionsTitle] = useState("");
  const [options, setOptions] = useState<AssessmentQuestionOption[]>([]);
  const [currentOption, setCurrentOption] = useState("");
  const [currentOptionCategory, setCurrentOptionCategory] = useState<
    string | undefined
  >();

  // Reset form when dialog opens/closes or when editing question changes
  useEffect(() => {
    if (open) {
      if (editingQuestion) {
        setTitle(editingQuestion.title);
        setDescription(editingQuestion.description);
        setOptionsTitle(editingQuestion.options_title || "");
        setOptions(editingQuestion.options || []);
      } else {
        setTitle("");
        setDescription("");
        setOptionsTitle("");
        setOptions([]);
      }
      setCurrentOption("");
      setCurrentOptionCategory(undefined);
    }
  }, [open, editingQuestion]);

  const handleAddOption = () => {
    if (currentOption.trim()) {
      setOptions([
        ...options,
        {
          value: currentOption.trim(),
          label: currentOption.trim(),
          categoryId: currentOptionCategory,
        },
      ]);
      setCurrentOption("");
      setCurrentOptionCategory(undefined);
    }
  };

  const handleRemoveOption = (value: string) => {
    setOptions(options.filter((opt) => opt.value !== value));
  };

  const handleSave = () => {
    const question: Omit<AssessmentQuestion, "id"> = {
      type: "multiple_choice",
      title,
      description,
      options_title: optionsTitle,
      options,
    };
    onSave(question);
    onOpenChange(false);
  };

  const canSave = title.trim() && description.trim() && options.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingQuestion ? "Edit" : "Add"} Multiple Choice Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Question Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Question Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter question title"
            />
          </div>

          {/* Question Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Question Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter question description"
              rows={3}
            />
          </div>

          {/* Options Title */}
          <div className="space-y-2">
            <Label htmlFor="optionsTitle">Options Title</Label>
            <Input
              id="optionsTitle"
              value={optionsTitle}
              onChange={(e) => setOptionsTitle(e.target.value)}
              placeholder="e.g., 'Choose your answer'"
            />
          </div>

          {/* Add Option Section */}
          <div className="space-y-2">
            <Label>Add Options *</Label>
            <div className="flex gap-2">
              <Input
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
                placeholder="Enter option text"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddOption();
                  }
                }}
              />
              {categories.length > 0 && (
                <CategorySelector
                  categories={categories}
                  value={currentOptionCategory}
                  onValueChange={setCurrentOptionCategory}
                  label=""
                  placeholder="Category (optional)"
                />
              )}
              <Button
                onClick={handleAddOption}
                disabled={!currentOption.trim()}
                size="default"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Options List */}
          {options.length > 0 && (
            <div className="space-y-2">
              <Label className="">Options ({options.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                {options.map((option) => {
                  const category = categories.find(
                    (c) => c.id === option.categoryId,
                  );
                  return (
                    <div
                      key={option.value}
                      className="flex items-center justify-between gap-2 p-2 bg-muted rounded"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-sm">{option.label}</span>
                        {category && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({category.name})
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveOption(option.value)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
