"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface AboutCompanyProps {
  about?: string;
}

export function AboutCompany({ about }: AboutCompanyProps) {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>About the Company</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        {about ? (
          <p className="text-sm leading-relaxed text-gray-700">{about}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Not specified</p>
        )}
      </CardContent>
    </Card>
  );
}
