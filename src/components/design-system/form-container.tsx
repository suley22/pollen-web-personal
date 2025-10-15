"use client";

import { ReactNode, FormHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormContainerProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "className"> {
  children: ReactNode;
  className?: string;
}

export const FormContainer = forwardRef<HTMLFormElement, FormContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        {children}
      </form>
    );
  },
);

FormContainer.displayName = "FormContainer";
