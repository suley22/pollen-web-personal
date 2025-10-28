"use client";

import {
  FormCard,
  Input,
  PrimaryButton,
  Divider,
  CategorySelector,
} from "@/components/design-system";
import { Building2, Plus } from "lucide-react";
import { SecondaryButton } from "@/components/design-system/primary-button";
import { Label } from "@/components/ui/label";
import type { AssessmentCategory } from "@/types/assessment-category";

interface QuestionOption {
  value: string;
  label: string;
  categoryId?: string;
}

interface AssessmentCreateQuestionsProps {
  title: string;
  description: string;
  optionsTitle: string;
  options: QuestionOption[];
  currentOption: string;
  currentOptionCategory: string | undefined;
  categories: AssessmentCategory[];
  editingQuestionIndex: number | null;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onOptionsTitleChange: (value: string) => void;
  onCurrentOptionChange: (value: string) => void;
  onCurrentOptionCategoryChange: (value: string | undefined) => void;
  onAddOption: () => void;
  onRemoveOption: (value: string) => void;
  onAddQuestion: () => void;
  onClearForm: () => void;
}

export function AssessmentCreateQuestions({
  title,
  description,
  optionsTitle,
  options,
  currentOption,
  currentOptionCategory,
  categories,
  editingQuestionIndex,
  onTitleChange,
  onDescriptionChange,
  onOptionsTitleChange,
  onCurrentOptionChange,
  onCurrentOptionCategoryChange,
  onAddOption,
  onRemoveOption,
  onAddQuestion,
  onClearForm,
}: AssessmentCreateQuestionsProps) {
  const isFormValid = title.trim() !== "" && options.length >= 2;

  return (
    <div className="flex flex-row gap-4">
      <FormCard
        title={
          editingQuestionIndex !== null
            ? `Editing Question ${editingQuestionIndex + 1}`
            : "Question Details"
        }
        icon={<Building2 className="h-5 w-5" />}
        className="flex-1"
      >
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-3">
            {/* Question Title - Required */}
            <Input
              label="Title"
              type="text"
              name="question_title"
              id="question_title"
              placeholder="Enter question title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              required
            />
            {/* Question Subtitle - Optional */}
            <Input
              label="Subtitle"
              type="text"
              name="question_subtitle"
              id="question_subtitle"
              placeholder="Enter question subtitle (optional)"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
            {/* Options Title - Optional */}
            <Input
              label="Options Title"
              type="text"
              name="options_title"
              id="options_title"
              placeholder="Enter options title (optional)"
              value={optionsTitle}
              onChange={(e) => onOptionsTitleChange(e.target.value)}
            />

            {/* Display added options or show requirement */}
            {options.length > 0 ? (
              <div className="flex flex-col gap-2 py-1">
                <Label className="text-sm font-semibold text-gray-700">
                  Added Options ({options.length}/minimum 2)
                  <span className="text-destructive ml-1">*</span>
                </Label>
                {options.map((option) => {
                  const category = categories.find(
                    (c) => c.id === option.categoryId,
                  );
                  return (
                    <div
                      key={option.value}
                      className="flex items-center justify-between px-3 py-2 border rounded"
                      style={
                        category
                          ? {
                              borderColor: category.color,
                              backgroundColor: `${category.color}10`,
                            }
                          : {}
                      }
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                        {category && (
                          <span
                            className="text-xs"
                            style={{ color: category.color }}
                          >
                            {category.name}
                          </span>
                        )}
                      </div>
                      <SecondaryButton
                        text="Remove"
                        onClick={() => onRemoveOption(option.value)}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-2 py-1">
                <Label className="text-sm font-semibold text-gray-700">
                  Options (minimum 2 required)
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <p className="text-sm text-gray-500">
                  No options added yet. Add at least 2 options below.
                </p>
              </div>
            )}

            <div className="w-full flex flex-row gap-4 mt-1">
              {/* Category Selector */}
              {categories.length > 0 && (
                <div className="w-48">
                  <CategorySelector
                    label="Category (Optional)"
                    value={currentOptionCategory}
                    onValueChange={onCurrentOptionCategoryChange}
                    categories={categories}
                    placeholder="Select category"
                  />
                </div>
              )}

              <div className="flex-1">
                <Input
                  label="Add Option"
                  type="text"
                  name="current_option"
                  id="current_option"
                  placeholder="Enter option text"
                  value={currentOption}
                  onChange={(e) => onCurrentOptionChange(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onAddOption();
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <SecondaryButton
                icon={<Plus />}
                text="Add Option"
                onClick={onAddOption}
              />
            </div>
          </div>

          <Divider />

          <div className="flex flex-row justify-end gap-3">
            {editingQuestionIndex !== null && (
              <SecondaryButton text="Cancel" onClick={onClearForm} />
            )}
            <PrimaryButton
              text={
                editingQuestionIndex !== null
                  ? "Update Question"
                  : "Add Question"
              }
              onClick={onAddQuestion}
              disabled={!isFormValid}
            />
          </div>
        </div>
      </FormCard>
    </div>
  );
}
