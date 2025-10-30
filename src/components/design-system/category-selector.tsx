"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AssessmentCategory } from "@/types/assessment-types";

interface CategorySelectorProps {
  label?: string;
  value?: string;
  onValueChange: (value: string | undefined) => void;
  categories: AssessmentCategory[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  includeNone?: boolean;
  className?: string;
}

export function CategorySelector({
  label = "Category",
  value,
  onValueChange,
  categories,
  required = false,
  disabled = false,
  placeholder = "Select category",
  includeNone = true,
  className = "",
}: CategorySelectorProps) {
  const selectedCategory = categories.find((cat) => cat.id === value);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Select
        value={value || "none"}
        onValueChange={(val) => onValueChange(val === "none" ? undefined : val)}
        disabled={disabled}
      >
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder={placeholder}>
            {selectedCategory ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: selectedCategory.color }}
                />
                {selectedCategory.name}
              </div>
            ) : (
              includeNone && "No category"
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="">
          {includeNone && (
            <SelectItem className="" value="none">
              No category
            </SelectItem>
          )}
          {categories.map((category) => (
            <SelectItem className="" key={category.id} value={category.id}>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
