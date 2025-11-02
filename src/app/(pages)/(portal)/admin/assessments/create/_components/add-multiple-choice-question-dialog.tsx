"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Input,
  TextareaInput,
  CategorySelector,
  Divider,
  PrimaryButton,
  SecondaryButton,
  PageHeader,
} from "@/components/design-system";
import { AssessmentCreateCategories } from "./assessment-create-categories";
import { Palette, Plus, X } from "lucide-react";
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
  // Category management
  onAddCategory?: (category: Omit<AssessmentCategory, "id">) => void;
  onRemoveCategory?: (categoryId: string) => void;
  onUpdateCategories?: (categories: AssessmentCategory[]) => void;
}

export function AddMultipleChoiceQuestionDialog({
  open,
  onOpenChange,
  onSave,
  categories,
  editingQuestion,
  onAddCategory,
  onRemoveCategory,
  onUpdateCategories,
}: AddMultipleChoiceQuestionDialogProps) {
  // Question state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optionsTitle, setOptionsTitle] = useState("");
  const [options, setOptions] = useState<AssessmentQuestionOption[]>([]);
  const [currentOption, setCurrentOption] = useState("");
  const [currentOptionCategory, setCurrentOptionCategory] = useState<
    string | undefined
  >();

  // Category state
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryColor, setCategoryColor] = useState("#3B82F6");

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

  // Category handlers
  const handleAddCategory = () => {
    if (categoryName.trim() && onAddCategory) {
      const newCategory: Omit<AssessmentCategory, "id"> = {
        name: categoryName.trim(),
        description: categoryDescription.trim(),
        color: categoryColor,
      };
      onAddCategory(newCategory);
      setCategoryName("");
      setCategoryDescription("");
      setCategoryColor("#3B82F6");
    }
  };

  const handleRemoveCategoryLocal = (categoryId: string) => {
    if (onRemoveCategory) {
      onRemoveCategory(categoryId);
    }
  };

  const handleMoveCategoryUp = (index: number) => {
    if (index > 0 && onUpdateCategories) {
      const newCategories = [...categories];
      [newCategories[index - 1], newCategories[index]] = [
        newCategories[index],
        newCategories[index - 1],
      ];
      onUpdateCategories(newCategories);
    }
  };

  const getCategoryOptionsCount = (categoryId: string) => {
    return options.filter((opt) => opt.categoryId === categoryId).length;
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="!w-[50vw] !max-w-[50vw] overflow-y-auto p-6"
      >
        <PageHeader
          title={
            editingQuestion
              ? "Edit Multiple Choice Question"
              : "Add Multiple Choice Question"
          }
        />

        <div className="flex flex-col gap-4 py-4">
          {/* Categories Section */}
          {onAddCategory && (
            <>
              <AssessmentCreateCategories
                categories={categories}
                categoryName={categoryName}
                categoryDescription={categoryDescription}
                categoryColor={categoryColor}
                onCategoryNameChange={setCategoryName}
                onCategoryDescriptionChange={setCategoryDescription}
                onCategoryColorChange={setCategoryColor}
                onAddCategory={handleAddCategory}
                onRemoveCategory={handleRemoveCategoryLocal}
                onMoveCategoryUp={handleMoveCategoryUp}
                getCategoryOptionsCount={getCategoryOptionsCount}
              />
              <Divider />
            </>
          )}

          <div className="flex gap-2 items-center text-lg font-medium">
            <Palette className="h-5 w-5" />
            Categories
          </div>

          <Divider />

          {/* Question Title */}
          <Input
            label="Question Title *"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
          />

          {/* Question Description */}
          <TextareaInput
            label="Question Description *"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter question description"
            rows={3}
          />

          {/* Options Title */}
          <Input
            label="Options Title (Optional)"
            name="optionsTitle"
            id="optionsTitle"
            value={optionsTitle}
            onChange={(e) => setOptionsTitle(e.target.value)}
            placeholder="e.g., 'Choose your answer'"
          />

          {/* Add Option Section */}
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Add Options *</p>

            <div className="flex flex-1 gap-4 items-end">
              {categories.length > 0 && (
                <div className="w-48">
                  <CategorySelector
                    categories={categories}
                    value={currentOptionCategory}
                    onValueChange={setCurrentOptionCategory}
                    placeholder="Category (optional)"
                  />
                </div>
              )}
              <Input
                label=" Option Text"
                name="currentOption"
                id="currentOption"
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
              <PrimaryButton
                icon={<Plus className="h-4 w-4" />}
                onClick={handleAddOption}
                disabled={!currentOption.trim()}
                text="Add"
                className="mb-0"
              />
            </div>
          </div>

          {/* Options List */}
          {options.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Options ({options.length})</p>
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
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {category && (
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          />
                        )}
                        <span className="text-sm">{option.label}</span>
                        {category && (
                          <span
                            className="ml-2 text-xs text-muted-foreground"
                            style={{ color: category.color }}
                          >
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

        <SheetFooter className="mt-6">
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
