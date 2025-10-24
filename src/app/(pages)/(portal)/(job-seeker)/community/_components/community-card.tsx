"use client";

import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { ReactElement } from "react";

type CommunityCardProps = {
  title: string;
  subtitle: string;
  color: string;
  icon?: ReactElement;
  buttonText: string;
  url: string;
};

type CommunityCardExtendedProps = {
  badgeText: string;
  title: string;
  subtitle: string;
};

export function CommunityCard({
  color,
  icon,
  title,
  subtitle,
  buttonText,
  url,
}: CommunityCardProps) {
  return (
    <Card className={`bg-${color}-50 border-${color}-200`}>
      <CardContent className="p-8 text-center gap-6 flex flex-col h-full justify-between">
        <div
          className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center mx-auto`}
        >
          {icon}
        </div>

        <div className="flex-1">
          <div className="text-base font-bold text-gray-900 mb-2">{title}</div>
          <p className="text-sm text-gray-700">{subtitle}</p>
        </div>

        <PrimaryButton
          text={buttonText}
          className="w-full hover:bg-yellow-400 text-white"
          onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        />
      </CardContent>
    </Card>
  );
}

export function CommunityCardExtended({
  badgeText,
  title,
  subtitle,
}: CommunityCardExtendedProps) {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex flex-row items-center gap-4 justify-between">
          <div>
            <Badge className="bg-green-100 text-green-800">{badgeText}</Badge>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-700">{subtitle}</p>
          </div>
          <PrimaryButton
            icon={<Users className="mr-2 h-4 w-4" />}
            text="Join Slack"
            className="px-6"
            onClick={() =>
              window.open(
                "https://join.slack.com/t/pollen-community/shared_invite/zt-2sfzxvumo-ol~HHOKcahOdgyFzjmAv9A",
                "_blank",
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
