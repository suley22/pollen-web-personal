"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

export function AboutEmployer() {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>About the Employer</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <Textarea
          name="company_about"
          placeholder="Describe the company, its mission, values, and what makes it unique..."
          className="min-h-[150px] resize-y"
        />
      </CardContent>
    </Card>
  );
}
