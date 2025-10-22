"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FormCard({
  title = "",
  icon = null,
  titleButtons = null,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
  showDivider = true,
}) {
  return (
    <Card className={cn("overflow-hidden py-6", className)}>
      <CardHeader className={cn("pb-3 px-6", headerClassName)}>
        <CardTitle className="text-md font-semibold flex items-center  justify-between">
          <div className="flex flex-row items-center space-x-3">
            {icon && (
              <span className="h-5 w-5 flex items-center justify-center">
                {icon}
              </span>
            )}
            <span>{title}</span>
          </div>

          {titleButtons && (
            <div className="ml-auto flex items-center space-x-2">
              {titleButtons}
            </div>
          )}
        </CardTitle>
      </CardHeader>

      {showDivider && (
        <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      )}

      <CardContent className={cn("px-6 pt-4", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
