"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface PollenLovesProps {
  pollenLove?: string;
}

export function PollenLoves({ pollenLove }: PollenLovesProps) {
  if (!pollenLove) return null;

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Heart className="h-5 w-5" />
          <span>Pollen loves...</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <div className="text-sm leading-relaxed text-gray-700">
          {pollenLove.split("\n").map((line, idx) => (
            <p key={`pollen-love-line-${idx}`} className="mb-1">
              {line}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
