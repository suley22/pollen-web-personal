import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  /**
   * Texto a mostrar en el badge
   */
  label: string;

  /**
   * Variante del badge
   */
  variant?: "current" | "pending" | "available" | "destructive" | "success";

  /**
   * Si el badge es clickeable
   */
  onClick?: () => void;

  /**
   * Tamaño del badge
   */
  size?: "sm" | "md" | "lg";

  /**
   * Si el badge está deshabilitado
   */
  disabled?: boolean;

  /**
   * Clases adicionales
   */
  className?: string;
}

const variantStyles = {
  current: "bg-blue-100 text-blue-800 border-blue-300 border-2",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-400 border-2",
  available:
    "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
  destructive:
    "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300",
  success:
    "bg-white text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300",
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

/**
 * Badge para mostrar estados
 */
export function StatusBadge({
  label,
  variant = "available",
  onClick,
  size = "md",
  disabled = false,
  className,
}: StatusBadgeProps) {
  const isClickable = !!onClick && !disabled;
  const isNonInteractive = variant === "current" || variant === "pending";

  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg border transition-colors";

  const interactiveStyles =
    isClickable && !isNonInteractive ? "cursor-pointer" : "";

  const disabledStyles =
    disabled || isNonInteractive ? "cursor-default opacity-90" : "";

  return (
    <button
      type="button"
      onClick={isClickable ? onClick : undefined}
      disabled={disabled || isNonInteractive}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        interactiveStyles,
        disabledStyles,
        className,
      )}
    >
      {(variant === "current" || variant === "pending") && (
        <span
          className={cn(
            "w-2 h-2 rounded-full mr-2",
            variant === "current" ? "bg-blue-500" : "bg-yellow-500",
          )}
        />
      )}
      {label}
    </button>
  );
}

interface StatusBadgeGroupProps {
  /**
   * Título del grupo
   */
  title?: string;

  /**
   * Lista de badges (alternativa a children)
   */
  badges?: Array<{
    label: string;
    variant?: "current" | "pending" | "available" | "destructive" | "success";
    onClick?: () => void;
  }>;

  /**
   * Children para un control más granular
   */
  children?: React.ReactNode;

  /**
   * Layout del grupo (solo aplicable cuando se usa badges prop)
   */
  layout?: "grid" | "flex";

  /**
   * Clases adicionales para el contenedor
   */
  className?: string;
}

/**
 * Grupo de badges de estado
 */
export function StatusBadgeGroup({
  title,
  badges,
  children,
  layout = "grid",
  className,
}: StatusBadgeGroupProps) {
  const layoutStyles =
    layout === "grid"
      ? "grid grid-cols-2 gap-2"
      : "flex flex-wrap gap-2 justify-center";

  return (
    <div>
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      {children ? (
        <div className={cn("flex gap-2", className)}>{children}</div>
      ) : badges ? (
        <div className={cn(layoutStyles, className)}>
          {badges.map((badge, index) => (
            <StatusBadge
              key={index}
              label={badge.label}
              variant={badge.variant}
              onClick={badge.onClick}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
