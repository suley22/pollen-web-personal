"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EyeOff } from "lucide-react";
import { InfoField } from "./info-field";

interface InternalPollenDataProps {
  howDidTheyHearAboutUs?: string;
  howDidTheyHearMoreInfo?: string;
  entryLevelHiringFrequency?: string;
  previousHiringMethods?: string[];
  additionalNotes?: string;
}

export function InternalPollenData({
  howDidTheyHearAboutUs,
  howDidTheyHearMoreInfo,
  entryLevelHiringFrequency,
  previousHiringMethods,
  additionalNotes,
}: InternalPollenDataProps) {
  const hasData =
    howDidTheyHearAboutUs ||
    howDidTheyHearMoreInfo ||
    entryLevelHiringFrequency ||
    (previousHiringMethods && previousHiringMethods.length > 0) ||
    additionalNotes;

  if (!hasData) return null;

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <EyeOff className="h-5 w-5" />
          <span>Internal Pollen Data</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <div className="space-y-4">
          {howDidTheyHearAboutUs && (
            <InfoField
              label="How did they hear about us?"
              value={howDidTheyHearAboutUs}
            />
          )}

          {howDidTheyHearMoreInfo && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                More info
              </Label>
              <p className="mt-1 text-sm text-gray-700">
                {howDidTheyHearMoreInfo}
              </p>
            </div>
          )}

          {entryLevelHiringFrequency && (
            <InfoField
              label="Frequency of hiring at entry level"
              value={entryLevelHiringFrequency}
            />
          )}

          {previousHiringMethods && previousHiringMethods.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                How they&apos;ve hired previously
              </Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {previousHiringMethods.map((method) => (
                  <Badge key={method} variant="outline" className="text-xs">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {additionalNotes && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Additional notes
              </Label>
              <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                {additionalNotes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
