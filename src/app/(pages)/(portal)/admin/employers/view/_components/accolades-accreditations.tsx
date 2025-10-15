"use client";

import { FormCard } from "@/components/design-system";
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
    <FormCard
      title="Accolades & Accreditations"
      icon={<Award className="h-5 w-5" />}
    >
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
    </FormCard>
  );
}
