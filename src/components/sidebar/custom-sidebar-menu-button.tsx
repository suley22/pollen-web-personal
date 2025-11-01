"use client";
import { useSidebar } from "@/components/sidebar/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CustomSidebarMenuButton({
  children,
  isActive = false,
  tooltip,
  onClick,
  className = "",
  ...props
}) {
  const { state, isMobile } = useSidebar();

  const button = (
    <button
      className={`w-full flex items-center gap-2 p-2 rounded-md text-left text-sm transition-[width,height,padding] outline-hidden group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 ${
        isActive
          ? "bg-primary text-white font-medium"
          : "hover:bg-accent hover:text-accent-foreground"
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
