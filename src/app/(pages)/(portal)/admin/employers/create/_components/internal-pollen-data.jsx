"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { EyeOff } from "lucide-react";

// Component for handling hiring methods selection
function HowHiredPreviouslySection({ initialSelectedMethods = [] }) {
  const hiringMethods = [
    { label: "Paid advertising", value: "paid_advertising" },
    { label: "Job boards (LinkedIn, Indeed, etc.)", value: "job_boards" },
    { label: "Campus recruiting", value: "campus_recruiting" },
    { label: "Employee referrals", value: "employee_referrals" },
    { label: "Social media recruiting", value: "social_media_recruiting" },
    { label: "Headhunters & agencies", value: "headhunters_agencies" },
    { label: "Career fairs", value: "career_fairs" },
    { label: "Networking events", value: "networking_events" },
    { label: "Other methods", value: "other_recruiting" },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
      {hiringMethods.map((method) => {
        const isInitiallySelected = initialSelectedMethods.includes(
          method.value,
        );

        return (
          <label
            key={method.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Checkbox
              name="how_hired_previously"
              value={method.value}
              defaultChecked={isInitiallySelected}
            />
            <span>{method.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export function InternalPollenData({ initialData = {} }) {
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
        <div className="space-y-6">
          {/* How did you hear about us? */}
          <div>
            <Label
              htmlFor="how_did_you_hear_about_us"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              How did you hear about us?
            </Label>
            <Select
              name="how_did_you_hear_about_us"
              id="how_did_you_hear_about_us"
              defaultValue={initialData.how_did_you_hear_about_us}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="google_search">Google Search</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="industry_event">Industry Event</SelectItem>
                <SelectItem value="partner_agency">Partner/Agency</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* More Information */}
          <div>
            <Label
              htmlFor="more_info"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              More info (if applicable)
            </Label>
            <Textarea
              name="more_info"
              id="more_info"
              placeholder="e.g Name of referrer, specific event, etc."
              className="min-h-[80px] resize-y"
              defaultValue={initialData.more_info}
            />
          </div>

          {/* Frequency of hiring at entry level */}
          <div>
            <Label
              htmlFor="hiring_frequency"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Frequency of hiring at entry level
            </Label>
            <Select
              name="hiring_frequency"
              id="hiring_frequency"
              defaultValue={initialData.hiring_frequency}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infrequent">One-off / infrequent</SelectItem>
                <SelectItem value="1-5">1-5 hires per year</SelectItem>
                <SelectItem value="5-15">5-15 hires per year</SelectItem>
                <SelectItem value="15-50">15-50 hires per year</SelectItem>
                <SelectItem value="50+">50+ hires per year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Previous hiring methods */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
              How they&apos;ve hired previously
            </Label>
            <Label className="text-xs text-gray-600 mb-3 block">
              Select all methods they have used before
            </Label>

            <HowHiredPreviouslySection
              initialSelectedMethods={initialData.how_hired_previously || []}
            />
          </div>

          {/* Additional notes */}
          <div>
            <Label
              htmlFor="additional_notes"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Additional notes
            </Label>
            <Textarea
              name="additional_notes"
              id="additional_notes"
              placeholder="Add any additional notes or comments..."
              className="min-h-[100px] resize-y"
              defaultValue={initialData.additional_notes}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
