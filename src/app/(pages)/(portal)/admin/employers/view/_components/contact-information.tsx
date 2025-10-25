"use client";

import { FormCard } from "@/components/design-system";
import { User, Mail, Phone } from "lucide-react";
import { InfoField } from "../../../../../../../../components/design-system/info-field";

interface ContactInformationProps {
  contactName?: string;
  contactJobTitle?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export function ContactInformation({
  contactName,
  contactJobTitle,
  contactEmail,
  contactPhone,
}: ContactInformationProps) {
  return (
    <FormCard title="Contact Information" icon={<User className="h-5 w-5" />}>
      <div className="space-y-4">
        <InfoField label="Contact Name" value={contactName} />
        <InfoField label="Job Title" value={contactJobTitle} />
        <InfoField
          label="Email"
          value={contactEmail}
          icon={<Mail className="h-4 w-4 text-muted-foreground" />}
        />
        <InfoField
          label="Phone"
          value={contactPhone}
          icon={<Phone className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </FormCard>
  );
}
