"use client";

import { Input } from "@/components/design-system";
import { User } from "lucide-react";
import { FormCard } from "@/components/design-system/form-card";

export function ContactInformation({
  contact_name,
  job_title,
  contact_email,
  contact_phone,
}) {
  return (
    <FormCard
      title="Contact Information"
      icon={<User className="h-5 w-5" />}
      className="w-full"
    >
      <div className="space-y-4">
        {/* Contact Name */}
        <Input
          label="Contact Name"
          type="text"
          name="contact_name"
          id="contact_name"
          placeholder="Contact Name"
          defaultValue={contact_name}
        />

        {/* Job Title */}
        <Input
          label="Job Title"
          type="text"
          name="job_title"
          id="job_title"
          placeholder="Job Title"
          defaultValue={job_title}
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          name="contact_email"
          id="contact_email"
          placeholder="hr@yourcompany.com"
          defaultValue={contact_email}
        />

        {/* Phone */}
        <Input
          label="Phone"
          type="text"
          name="contact_phone"
          id="contact_phone"
          placeholder="+44 20 1234 5678"
          defaultValue={contact_phone}
        />
      </div>
    </FormCard>
  );
}
