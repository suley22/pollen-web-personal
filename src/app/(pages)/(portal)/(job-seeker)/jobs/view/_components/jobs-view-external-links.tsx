"use client";

import { FormCard } from "@/components/design-system";
import { Globe } from "lucide-react";

export default function ExternalLinks({ externalLinks }) {
  // Parse external links if they come as a string
  const parseExternalLinks = () => {
    if (!externalLinks) return [];

    console.log("Raw externalLinks:", externalLinks);
    console.log("Type:", typeof externalLinks);
    console.log("Is Array:", Array.isArray(externalLinks));

    // If it's already an array of objects, return it
    if (
      Array.isArray(externalLinks) &&
      externalLinks.length > 0 &&
      typeof externalLinks[0] === "object" &&
      externalLinks[0] !== null
    ) {
      return externalLinks;
    }

    // If it's an array of strings (double-encoded), try to parse and join
    if (
      Array.isArray(externalLinks) &&
      externalLinks.length > 0 &&
      typeof externalLinks[0] === "string"
    ) {
      try {
        // Join the array elements
        let jsonString = externalLinks.join("");
        console.log("Joined string:", jsonString);

        // Clean up the string - remove extra quotes and escape characters
        // Handle case like: "[{\"id\":\"xxx\"" "\"platform\":\"xxx\"" "\"url\":\"xxx\"}]"
        jsonString = jsonString.replace(/"\s*"/g, ""); // Remove quote-space-quote patterns

        console.log("Cleaned string:", jsonString);

        const parsed = JSON.parse(jsonString);
        console.log("Parsed result:", parsed);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Error parsing external links array:", error);
        console.error("Failed string:", externalLinks.join(""));
        return [];
      }
    }

    // If it's a string, try to parse it
    if (typeof externalLinks === "string") {
      try {
        const parsed = JSON.parse(externalLinks);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Error parsing external links string:", error);
        return [];
      }
    }

    return [];
  };

  const links = parseExternalLinks();
  const hasLinks = links && links.length > 0;

  return (
    <FormCard title="Social Media" icon={<Globe className="h-5 w-5" />}>
      {!hasLinks ? (
        <p className="text-sm text-muted-foreground">Not specified</p>
      ) : (
        <div className="space-y-3">
          {links
            .filter((link) => link.url)
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
