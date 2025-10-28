import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:ring-ring/50 hover:ring-[3px]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 hover:ring-destructive/20 dark:hover:ring-destructive/40 hover:ring-[3px] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-gray-50 dark:hover:bg-gray-800 hover:ring-ring/50 hover:ring-[3px] dark:bg-input/30 dark:border-input",
        secondary:
          "bg-gray-50 text-gray-900 shadow-xs hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 hover:ring-ring/50 hover:ring-[3px]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:ring-ring/50 hover:ring-[3px] dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        findJobs:
          "bg-white text-pink-600 hover:bg-gray-100 shadow-xs hover:ring-ring/50 hover:ring-[3px]",
        findJobsSolid:
          "bg-pink-600 text-white hover:bg-pink-700 shadow-xs hover:ring-ring/50 hover:ring-[3px]",
        findJobsOutline:
          "border border-pink-600 text-pink-600 hover:bg-pink-50 shadow-xs hover:ring-ring/50 hover:ring-[3px]",
        loginStatus:
          "bg-pink-600 text-white hover:bg-pink-700 shadow-xs hover:ring-ring/50 hover:ring-[3px]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className = "",
  variant = null,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
