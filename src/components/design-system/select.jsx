"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

export function Select({
  label,
  error,
  helperText,
  required = false,
  placeholder = "Select an option",
  options = [],
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  id,
  className,
}) {
  const generatedId = React.useId();
  const selectId = id || generatedId;

  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium text-gray-700 mb-1.5 block",
            error && "text-destructive",
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <SelectRoot
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger
          id={selectId}
          className={cn(
            "w-full",
            error && "border-destructive ring-destructive/20",
            className,
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
                ? `${selectId}-helper`
                : undefined
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-1.5 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${selectId}-helper`} className="mt-1.5 text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
}
