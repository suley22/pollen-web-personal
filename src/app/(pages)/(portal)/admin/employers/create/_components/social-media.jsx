"use client";

import { useState } from "react";
import { Input } from "@/components/design-system";
import { FormCard } from "@/components/design-system/form-card";
import { Button } from "@/components/ui/button";
import { Share2, Plus, X } from "lucide-react";

export function SocialMedia({ social_media_links = [] }) {
  // Initialize with existing data, ensuring each has an id
  const [socialMedias, setSocialMedias] = useState(
    social_media_links.map((item) => ({
      ...item,
      id:
        item.id ||
        Date.now().toString() + Math.random().toString(36).substr(2, 9),
    })),
  );
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const handleAddSocialMedia = () => {
    if (platform.trim() && url.trim()) {
      setSocialMedias([
        ...socialMedias,
        {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          platform: platform.trim(),
          url: url.trim(),
        },
      ]);
      setPlatform("");
      setUrl("");
    }
  };

  const handleRemoveSocialMedia = (id) => {
    setSocialMedias(socialMedias.filter((social) => social.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSocialMedia();
    }
  };

  return (
    <FormCard title="Social Media" icon={<Share2 className="h-5 w-5" />}>
      <div className="space-y-4">
        {/* Hidden input to export social medias as JSON string */}
        <input
          type="hidden"
          name="social_medias"
          value={JSON.stringify(socialMedias)}
        />

        {/* List of added social medias */}
        {socialMedias.length > 0 && (
          <div className="space-y-2">
            {socialMedias.map((social) => (
              <div
                key={social.id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-sm regular">{social.platform}</span>

                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate"
                  >
                    {social.url}
                  </a>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSocialMedia(social.id)}
                  className="ml-2 h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add new social media form */}
        <div className="space-y-3">
          <Input
            label="Platform"
            type="text"
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., LinkedIn, Twitter, Instagram..."
          />

          <Input
            label="URL"
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://..."
          />

          <Button
            type="button"
            onClick={handleAddSocialMedia}
            variant="default"
            className="w-full"
            disabled={!platform.trim() || !url.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Media
          </Button>
        </div>
      </div>
    </FormCard>
  );
}
