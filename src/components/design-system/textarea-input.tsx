"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
  minHeight?: string;
  textareaClassName?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export const TextareaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextareaInputProps
>(
  (
    {
      label,
      error,
      helperText,
      required,
      className,
      textareaClassName,
      id,
      name,
      minHeight,
      rows = 3,
      maxLength,
      showCharacterCount = false,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const currentLength = value ? String(value).length : 0;

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <Label
            htmlFor={textareaId}
            className={cn(
              "text-sm font-medium text-gray-700 mb-1.5 block",
              error && "text-destructive",
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <Textarea
          ref={ref}
          id={textareaId}
          name={name}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={cn(
            "resize-y",
            error && "border-destructive focus-visible:ring-destructive",
            textareaClassName,
          )}
          style={{ minHeight }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${name}-error` : helperText ? `${name}-helper` : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={`${name}-error`}
            className="mt-1.5 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Character Count and Helper Text */}
        <div className="flex items-center justify-between mt-1.5">
          {helperText && !error && (
            <p id={`${name}-helper`} className="text-sm text-gray-600">
              {helperText}
            </p>
          )}

          {showCharacterCount && maxLength && (
            <p
              className={cn(
                "text-sm ml-auto",
                currentLength > maxLength * 0.9
                  ? "text-orange-600 dark:text-orange-500 font-medium"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  },
);

TextareaInput.displayName = "TextareaInput";
