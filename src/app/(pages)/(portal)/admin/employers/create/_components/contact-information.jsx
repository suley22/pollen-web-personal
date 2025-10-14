"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export function ContactInformation() {
  return (
    <Card className="w-full py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Contact Information</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
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
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
