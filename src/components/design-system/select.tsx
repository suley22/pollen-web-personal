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
} from "@/components/ui/select/select.jsx";

export function Select({
  label = null,
  error = null,
  helperText = "",
  required = false,
  placeholder = "Select an option",
  options = [],
  defaultValue = null,
  onValueChange = null,
  disabled = false,
  name,
  id = null,
  className = "",
}) {
  const generatedId = React.useId();
  const selectId = id || generatedId;
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);

  // Update selected value when defaultValue changes
  React.useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex flex-col">
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
        value={selectedValue}
        onValueChange={(value) => {
          setSelectedValue(value);
          onValueChange?.(value);
        }}
        disabled={disabled}
        name={name}
      >
        {/* @ts-ignore */}
        <SelectTrigger
          id={selectId}
          className={cn(
            "w-full h-9 !px-4 gap-2",
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
        {/* @ts-ignore */}
        <SelectContent className="w-full">
          {options.map((option) => {
            // Support both string arrays and object arrays
            const optionValue =
              typeof option === "string" ? option : option.value;
            const optionLabel =
              typeof option === "string" ? option : option.label;

            {
              /* @ts-ignore */
            }
            return (
              // @ts-ignore
              <SelectItem key={optionValue} value={optionValue}>
                {optionLabel}
              </SelectItem>
            );
          })}
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
