"use client";

import * as React from "react";
import { FormCard } from "./form-card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TextAreaSize = "xs" | "md" | "xl" | string;

const sizeMap: Record<string, string> = {
  xs: "80px",
  md: "120px",
  xl: "200px",
};

interface TextAreaCardProps {
  title: string;
  icon?: React.ReactNode;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: any) => void;
  className?: string;
  textareaClassName?: string;
  rows?: number;
  size?: TextAreaSize;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export function TextAreaCard({
  title,
  icon,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  className,
  textareaClassName,
  rows,
  size = "md",
  disabled = false,
  required = false,
  helperText,
  error,
}: TextAreaCardProps) {
  const minHeight = sizeMap[size] || size;

  return (
    <FormCard title={title} icon={icon} className={className}>
      <div className="space-y-2">
        <Textarea
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
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
        />

        {error && (
          <p
            id={`${name}-error`}
            className="text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${name}-helper`} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    </FormCard>
  );
}
