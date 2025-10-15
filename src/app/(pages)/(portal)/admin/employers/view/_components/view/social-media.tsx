"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { SocialMediaLink } from "@/types/social-media-links";

export function SocialMedia({
  socialMediaLinks,
}: {
  socialMediaLinks: SocialMediaLink[];
}) {
  const hasLinks = socialMediaLinks && socialMediaLinks.length > 0;

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Social Media</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        {!hasLinks ? (
          <p className="text-sm text-muted-foreground">Not specified</p>
        ) : (
          <div className="space-y-3">
            {socialMediaLinks
              ?.filter((link) => link.url)
              .map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium">{link.platform}</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm truncate max-w-xs"
                  >
                    {link.url.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
