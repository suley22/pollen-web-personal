"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { FormCard } from "@/components/design-system/form-card";

export function ContactInformation({ initialData = {} }) {
  return (
    <FormCard
      title="Contact Information"
      icon={<User className="h-5 w-5" />}
      className="w-full"
    >
      <div className="space-y-4">
        {/* Contact Name */}
        <div>
          <Label
            htmlFor="contact_name"
            className="text-sm font-medium text-gray-700 mb-1.5 block"
          >
            Contact Name
          </Label>
          <Input
            type="text"
            name="contact_name"
            id="contact_name"
            placeholder="Contact Name"
            className="w-full"
            defaultValue={initialData.contact_name}
          />
        </div>

        {/* Job Title */}
        <div>
          <Label
            htmlFor="job_title"
            className="text-sm font-medium text-gray-700 mb-1.5 block"
          >
            Job Title
          </Label>
          <Input
            type="text"
            name="job_title"
            id="job_title"
            placeholder="Job Title"
            className="w-full"
            defaultValue={initialData.job_title}
          />
        </div>

        {/* Email */}
        <div>
          <Label
            htmlFor="contact_email"
            className="text-sm font-medium text-gray-700 mb-1.5 block"
          >
            Email
          </Label>
          <Input
            type="email"
            name="contact_email"
            id="contact_email"
            placeholder="hr@yourcompany.com"
            className="w-full"
            defaultValue={initialData.contact_email}
          />
        </div>

        {/* Phone */}
        <div>
          <Label
            htmlFor="contact_phone"
            className="text-sm font-medium text-gray-700 mb-1.5 block"
          >
            Phone
          </Label>
          <Input
            type="text"
            name="contact_phone"
            id="contact_phone"
            placeholder="+44 20 1234 5678"
            className="w-full"
            defaultValue={initialData.contact_phone}
          />
        </div>
      </div>
    </FormCard>
  );
}
