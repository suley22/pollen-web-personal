"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface AccoladesAccreditationsProps {
  accolades?: string[];
}

export function AccoladesAccreditations({
  accolades,
}: AccoladesAccreditationsProps) {
  if (!accolades || accolades.length === 0) return null;

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Accolades & Accreditations</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <div className="flex flex-wrap gap-2">
          {accolades.map((accolade) => (
            <Badge
              key={accolade}
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              {accolade}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
