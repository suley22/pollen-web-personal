"use client";

import { FormCard } from "@/components/design-system";
import { Globe } from "lucide-react";
import { SocialMediaLink } from "@/types/social-media-links";

export function SocialMedia({
  socialMediaLinks,
}: {
  socialMediaLinks: SocialMediaLink[];
}) {
  const hasLinks = socialMediaLinks && socialMediaLinks.length > 0;

  return (
    <FormCard title="Social Media" icon={<Globe className="h-5 w-5" />}>
      {!hasLinks ? (
        <p className="text-sm text-muted-foreground">Not specified</p>
      ) : (
        <div className="space-y-3">
          {socialMediaLinks
            ?.filter((link) => link.url)
            .map((link) => (
              <div key={link.id} className="flex items-center justify-between">
                <span className="text-sm font-medium">{link.platform}</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm truncate max-w-xs"
                >
                  {link.url}
                </a>
              </div>
            ))}
        </div>
      )}
    </FormCard>
  );
}
