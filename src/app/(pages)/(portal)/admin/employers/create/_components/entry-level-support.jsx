"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap } from "lucide-react";

export function EntryLevelSupport() {
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
        <Textarea
          name="company_entry_level"
          placeholder="Describe the support and resources provided for entry-level employees, such as training programs, mentorship, onboarding..."
          className="min-h-[150px] resize-y"
        />
      </CardContent>
    </Card>
  );
}
