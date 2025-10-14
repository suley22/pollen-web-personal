"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface WorkEnvironmentProps {
  workEnvironment?: string;
}

export function WorkEnvironment({ workEnvironment }: WorkEnvironmentProps) {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Work Environment</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        {workEnvironment ? (
          <p className="text-sm leading-relaxed text-gray-700">
            {workEnvironment}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Not specified</p>
        )}
      </CardContent>
    </Card>
  );
}
