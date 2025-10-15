"use client";

import { ReactElement, cloneElement } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusButtonProps {
  text: string;
  icon?: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

// Success Button (Green)
export function SuccessButton({
  text,
  icon,
  onClick,
  disabled = false,
  loading = false,
  className,
  type = "button",
}: StatusButtonProps) {
  const iconWithSize = icon
    ? cloneElement(icon as ReactElement<any>, {
        className: cn("w-4 h-4", (icon.props as any)?.className),
      })
    : null;

  return (
    <Button
      type={type}
      variant="default"
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "bg-green-600 hover:bg-green-700 text-white font-sora gap-2",
        className,
      )}
    >
      {iconWithSize}
      {loading ? "Loading..." : text}
    </Button>
  );
}

// Warning Button (Orange)
export function WarningButton({
  text,
  icon,
  onClick,
  disabled = false,
  loading = false,
  className,
  type = "button",
}: StatusButtonProps) {
  const iconWithSize = icon
    ? cloneElement(icon as ReactElement<any>, {
        className: cn("w-4 h-4", (icon.props as any)?.className),
      })
    : null;

  return (
    <Button
      type={type}
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 font-sora gap-2",
        className,
      )}
    >
      {iconWithSize}
      {loading ? "Loading..." : text}
    </Button>
  );
}

// Danger Button (Red)
export function DangerButton({
  text,
  icon,
  onClick,
  disabled = false,
  loading = false,
  className,
  type = "button",
}: StatusButtonProps) {
  const iconWithSize = icon
    ? cloneElement(icon as ReactElement<any>, {
        className: cn("w-4 h-4", (icon.props as any)?.className),
      })
    : null;

  return (
    <Button
      type={type}
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "text-red-600 border-red-200 hover:bg-red-50 font-sora gap-2",
        className,
      )}
    >
      {iconWithSize}
      {loading ? "Loading..." : text}
    </Button>
  );
}

// Edit Button (Neutral outline)
export function EditButton({
  text,
  icon,
  onClick,
  disabled = false,
  loading = false,
  className,
  type = "button",
}: StatusButtonProps) {
  const iconWithSize = icon
    ? cloneElement(icon as ReactElement<any>, {
        className: cn("w-4 h-4", (icon.props as any)?.className),
      })
    : null;

  return (
    <Button
      type={type}
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn("font-sora gap-2", className)}
    >
      {iconWithSize}
      {loading ? "Loading..." : text}
    </Button>
  );
}
