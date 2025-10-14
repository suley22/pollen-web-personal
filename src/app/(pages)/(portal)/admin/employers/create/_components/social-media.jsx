"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";

export function SocialMedia() {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Share2 className="h-5 w-5" />
          <span>Social Media</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <div className="space-y-4">
          {/* LinkedIn */}
          <div>
            <Label
              htmlFor="linkedin_url"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              LinkedIn
            </Label>
            <Input
              type="url"
              name="linkedin_url"
              id="linkedin_url"
              placeholder="https://linkedin.com/company/..."
              className="w-full"
            />
          </div>

          {/* Twitter */}
          <div>
            <Label
              htmlFor="twitter_url"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Twitter
            </Label>
            <Input
              type="url"
              name="twitter_url"
              id="twitter_url"
              placeholder="https://twitter.com/..."
              className="w-full"
            />
          </div>

          {/* Glassdoor */}
          <div>
            <Label
              htmlFor="glassdoor_url"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Glassdoor
            </Label>
            <Input
              type="url"
              name="glassdoor_url"
              id="glassdoor_url"
              placeholder="https://glassdoor.com/..."
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
