"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";
import { InfoField } from "./info-field";

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
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Contact Information</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <div className="space-y-4">
          {contactName && (
            <InfoField label="Contact Name" value={contactName} />
          )}

          {contactJobTitle && (
            <InfoField label="Job Title" value={contactJobTitle} />
          )}

          {contactEmail && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Email
              </Label>
              <div className="flex items-center space-x-1 mt-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          )}

          {contactPhone && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Phone
              </Label>
              <div className="flex items-center space-x-1 mt-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${contactPhone}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {contactPhone}
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
