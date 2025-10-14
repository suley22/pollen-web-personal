"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface EntryLevelSupportProps {
  entryLevelSupport?: string;
}

export function EntryLevelSupport({
  entryLevelSupport,
}: EntryLevelSupportProps) {
  if (!entryLevelSupport) return null;

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <GraduationCap className="h-5 w-5" />
          <span>Entry-Level Support</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <p className="text-sm leading-relaxed text-gray-700">
          {entryLevelSupport}
        </p>
      </CardContent>
    </Card>
  );
}
