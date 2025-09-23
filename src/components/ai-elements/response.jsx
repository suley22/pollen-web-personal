"use client";

import { cn } from "@/lib/utils";

export const Response = ({ className, children, ...props }) => (
  <div
    className={cn(
      "prose prose-sm max-w-none dark:prose-invert",
      "prose-headings:font-medium prose-headings:text-foreground",
      "prose-p:text-foreground prose-p:leading-relaxed",
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-strong:text-foreground prose-strong:font-medium",
      "prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
      "prose-pre:bg-muted prose-pre:text-foreground",
      "prose-ul:text-foreground prose-ol:text-foreground",
      "prose-li:text-foreground",
      "prose-blockquote:text-muted-foreground prose-blockquote:border-l-border",
      "prose-hr:border-border",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
