"use client";

import { ReactElement, cloneElement } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  text: string;
  icon?: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function PrimaryButton({
  text,
  icon,
  onClick,
  disabled = false,
  loading = false,
  className,
  type = "button",
}: PrimaryButtonProps) {
  // Clone the icon and add default size
  const iconWithSize = icon
    ? cloneElement(icon as ReactElement<any>, {
        className: cn("w-4 h-4", (icon.props as any)?.className),
      })
    : null;

  return (
    <Button
      type={type}
      variant="default"
      size="default"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn("max-w-xs font-sora gap-2", className)}
    >
      {iconWithSize}
      {loading ? "Loading..." : text}
    </Button>
  );
}

export function SecondaryButton({
  text,
  icon,
  onClick,
  disabled = false,
  loading = false,
  className,
  type = "button",
}: PrimaryButtonProps) {
  // Clone the icon and add default size
  const iconWithSize = icon
    ? cloneElement(icon as ReactElement<any>, {
        className: cn("w-4 h-4", (icon.props as any)?.className),
      })
    : null;

  return (
    <Button
      type={type}
      variant="outline"
      size="default"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn("max-w-xs font-sora gap-2", className)}
    >
      {iconWithSize}
      {loading ? "Loading..." : text}
    </Button>
  );
}
