"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { CheckboxGroup as BaseCheckboxGroup } from "./checkbox-group";

/**
 * Componente wrapper de CheckboxGroup que incluye label, error y helperText
 * Similar al patrón de Input y Select del design system
 */
export function InputCheckboxGroup({
  label,
  error,
  helperText,
  required = false,
  items = [],
  name,
  initialSelectedItems = [],
  onChange,
  allowCustomItems = false,
  customItemsPlaceholder = "Add custom item and press Enter",
  columns = 3,
  className,
  id,
}) {
  const generatedId = React.useId();
  const fieldId = id || generatedId;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label
          htmlFor={fieldId}
          className={cn(
            "text-sm font-medium text-gray-700 pb-2 mb-1.5 block",
            error && "text-destructive",
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div
        id={fieldId}
        role="group"
        aria-labelledby={label ? `${fieldId}-label` : undefined}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error
            ? `${fieldId}-error`
            : helperText
              ? `${fieldId}-helper`
              : undefined
        }
      >
        <BaseCheckboxGroup
          items={items}
          name={name}
          initialSelectedItems={initialSelectedItems}
          onChange={onChange}
          allowCustomItems={allowCustomItems}
          customItemsPlaceholder={customItemsPlaceholder}
          columns={columns}
        />
      </div>

      {error && (
        <p
          id={`${fieldId}-error`}
          className="mt-1.5 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${fieldId}-helper`} className="mt-1.5 text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
}
