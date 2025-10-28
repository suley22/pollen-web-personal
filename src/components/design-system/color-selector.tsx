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

// Colores predefinidos con buen contraste
const PRESET_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Orange", value: "#F97316" },
  { name: "Red", value: "#EF4444" },
  { name: "Pink", value: "#EC4899" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Slate", value: "#64748B" },
];

interface ColorSelectorProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function ColorSelector({
  label = "Color",
  value,
  onValueChange,
  required = false,
  disabled = false,
  placeholder = "Select color",
  className = "",
}: ColorSelectorProps) {
  const selectedColor = PRESET_COLORS.find((color) => color.value === value);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder={placeholder}>
            {selectedColor && (
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: selectedColor.value }}
                />
                {selectedColor.name}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="">
          {PRESET_COLORS.map((color) => (
            <SelectItem className="" key={color.value} value={color.value}>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
