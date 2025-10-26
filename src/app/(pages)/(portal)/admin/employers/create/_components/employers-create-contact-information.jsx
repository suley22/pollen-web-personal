"use client";

import { Input } from "@/components/design-system";
import { User } from "lucide-react";
import { FormCard } from "@/components/design-system/form-card";

export function ContactInformation({ employer = null }) {
  return (
    <FormCard
      title="Contact Information"
      icon={<User className="h-5 w-5" />}
      className="w-full"
    >
      <div className="flex flex-col gap-5">
        {/* Contact Name */}
        <Input
          label="Contact Name"
          type="text"
          name="contact_name"
          id="contact_name"
          placeholder="Contact Name"
          defaultValue={employer?.contact_name || ""}
        />

        {/* Job Title */}
        <Input
          label="Job Title"
          type="text"
          name="job_title"
          id="job_title"
          placeholder="Job Title"
          defaultValue={employer?.job_title || ""}
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          name="contact_email"
          id="contact_email"
          placeholder="hr@yourcompany.com"
          defaultValue={employer?.contact_email || ""}
        />

        {/* Phone */}
        <Input
          label="Phone"
          type="text"
          name="contact_phone"
          id="contact_phone"
          placeholder="+44 20 1234 5678"
          defaultValue={employer?.contact_phone || ""}
        />
      </div>
    </FormCard>
  );
}
