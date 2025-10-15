"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

export function PollenLoves({ initialValue }) {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Heart className="h-5 w-5" />
          <span>Pollen Loves</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <Textarea
          name="company_loves"
          placeholder="What does Pollen love about this company? Highlight unique benefits, values, or opportunities..."
          className="min-h-[150px] resize-y"
          defaultValue={initialValue}
        />
      </CardContent>
    </Card>
  );
}
