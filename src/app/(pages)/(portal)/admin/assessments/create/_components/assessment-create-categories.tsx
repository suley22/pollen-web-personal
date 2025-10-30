"use client";

import {
  FormCard,
  Input,
  Divider,
  TextareaInput,
  ColorSelector,
} from "@/components/design-system";
import { Palette, Plus, ChevronUp, Trash2 } from "lucide-react";
import { SecondaryButton } from "@/components/design-system/primary-button";
import type { AssessmentCategory } from "@/types/assessment-types";
import { CategoryCard } from "@/components/assessments/category-card";

interface AssessmentCreateCategoriesProps {
  categories: AssessmentCategory[];
  categoryName: string;
  categoryDescription: string;
  categoryColor: string;
  onCategoryNameChange: (value: string) => void;
  onCategoryDescriptionChange: (value: string) => void;
  onCategoryColorChange: (value: string) => void;
  onAddCategory: () => void;
  onRemoveCategory: (categoryId: string) => void;
  onMoveCategoryUp: (index: number) => void;
  getCategoryOptionsCount: (categoryId: string) => number;
}

export function AssessmentCreateCategories({
  categories,
  categoryName,
  categoryDescription,
  categoryColor,
  onCategoryNameChange,
  onCategoryDescriptionChange,
  onCategoryColorChange,
  onAddCategory,
  onRemoveCategory,
  onMoveCategoryUp,
  getCategoryOptionsCount,
}: AssessmentCreateCategoriesProps) {
  return (
    <FormCard title="Categories" icon={<Palette className="h-5 w-5" />}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="w-48">
              <ColorSelector
                label="Color"
                value={categoryColor}
                onValueChange={onCategoryColorChange}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Category Name"
                type="text"
                name="category_name"
                id="category_name"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => onCategoryNameChange(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1">
            <TextareaInput
              label="Category Description"
              name="category_description"
              id="category_description"
              placeholder="Enter category description"
              value={categoryDescription}
              onChange={(e) => onCategoryDescriptionChange(e.target.value)}
              rows={3}
            />
          </div>

          <Divider />

          <div className="flex justify-end">
            <SecondaryButton
              icon={<Plus />}
              text="Add Category"
              onClick={onAddCategory}
            />
          </div>
        </div>

        {/* Display categories */}
        {categories.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            {categories.map((category, index) => {
              const categoryOptionsCount = getCategoryOptionsCount(category.id);
              const hasOptionsInUse = categoryOptionsCount > 0;

              return (
                <div key={category.id} className="relative">
                  <CategoryCard
                    category={category}
                    optionsCount={categoryOptionsCount}
                  />
                  {/* Action Buttons */}
                  <div className="absolute top-2 right-6 flex flex-row gap-1">
                    {/* Move Up Button */}
                    <button
                      onClick={() => onMoveCategoryUp(index)}
                      disabled={index === 0}
                      className={`p-2 rounded border shadow-sm transition-colors ${
                        index === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                      title="Move up"
                    >
                      <ChevronUp className="h-3 w-3 " />
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveCategory(category.id)}
                      disabled={hasOptionsInUse}
                      className={`p-2 rounded border shadow-sm transition-colors ${
                        hasOptionsInUse
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white hover:bg-red-50 text-red-600"
                      }`}
                      title={
                        hasOptionsInUse
                          ? "Cannot delete category with options in use"
                          : "Remove category"
                      }
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </FormCard>
  );
}
