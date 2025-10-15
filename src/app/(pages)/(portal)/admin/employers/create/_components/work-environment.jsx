"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Building } from "lucide-react";

export function WorkEnvironment({ initialValue }) {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Work Environment</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <Textarea
          name="work_environment"
          placeholder="Describe the work environment, office culture, team dynamics, and atmosphere..."
          className="min-h-[150px] resize-y"
          defaultValue={initialValue}
        />
      </CardContent>
    </Card>
  );
}
