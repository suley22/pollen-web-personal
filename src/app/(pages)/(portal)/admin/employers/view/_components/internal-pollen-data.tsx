"use client";

import { FormCard } from "@/components/design-system";
import { InfoField } from "@/components/design-system/info-field";
import { Badge } from "@/components/ui/badge";
import { EyeOff } from "lucide-react";

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
  return (
    <>
      <FormCard
        title="Internal Pollen Data"
        icon={<EyeOff className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <InfoField
            label="How did they hear about us?"
            value={howDidTheyHearAboutUs}
          />

          <InfoField label="More info" value={howDidTheyHearMoreInfo} />

          <InfoField
            label="Frequency of hiring at entry level"
            value={entryLevelHiringFrequency}
          />

          <InfoField
            label="Previous hiring methods"
            value={
              previousHiringMethods && previousHiringMethods.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {previousHiringMethods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method}
                    </Badge>
                  ))}
                </div>
              ) : (
                "Not specified"
              )
            }
          />

          <InfoField
            label="How they've hired previously"
            value={
              previousHiringMethods && previousHiringMethods.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {previousHiringMethods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method}
                    </Badge>
                  ))}
                </div>
              ) : (
                "Not specified"
              )
            }
          />

          <InfoField
            label="How they've hired previously"
            value={
              previousHiringMethods && previousHiringMethods.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {previousHiringMethods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method}
                    </Badge>
                  ))}
                </div>
              ) : (
                "Not specified"
              )
            }
          />
          <InfoField label="Additional Notes" value={additionalNotes} />
        </div>
      </FormCard>
    </>
  );
}
