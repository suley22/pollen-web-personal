"use client";

import { TextAreaCard } from "@/components/design-system";
import { Building } from "lucide-react";

export function WorkEnvironment({ initialValue }) {
  return (
    <TextAreaCard
      title="Work Environment"
      icon={<Building className="h-5 w-5" />}
      name="work_environment"
      placeholder="Describe the work environment, office culture, team dynamics, and atmosphere..."
      defaultValue={initialValue}
      minHeight="150px"
    />
  );
}
