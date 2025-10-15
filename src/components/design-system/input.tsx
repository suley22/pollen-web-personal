"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      required = false,
      leftIcon,
      rightIcon,
      variant = "default",
      size = "md",
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const sizeClasses = {
      sm: "h-8 px-2.5 py-1.5 text-sm",
      md: "h-9 px-3 py-2 text-sm",
      lg: "h-11 px-4 py-2.5 text-base",
    };

    const variantClasses = {
      default: cn(
        "border-input bg-transparent",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        error &&
          "border-destructive aria-invalid:border-destructive aria-invalid:ring-destructive/20",
      ),
      filled: cn(
        "border-transparent bg-gray-50",
        "focus-visible:bg-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        error && "bg-red-50 border-destructive focus-visible:bg-red-50",
      ),
      outlined: cn(
        "border-2 border-gray-300 bg-transparent",
        "focus-visible:border-primary focus-visible:ring-0",
        error && "border-destructive",
      ),
    };

    return (
      <div className="w-full">
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-gray-700 mb-1.5 block",
              error && "text-destructive",
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            id={inputId}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            className={cn(
              "flex w-full min-w-0 rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
              "placeholder:text-muted-foreground",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
              sizeClasses[size],
              variantClasses[variant],
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, type InputProps };
