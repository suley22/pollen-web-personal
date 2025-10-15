"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Plus, X } from "lucide-react";

export function SocialMedia({ initialValue = [] }) {
  // Initialize with existing data, ensuring each has an id
  const [socialMedias, setSocialMedias] = useState(
    initialValue.map((item) => ({
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
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Share2 className="h-5 w-5" />
          <span>Social Media</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6">
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
            <div>
              <Label
                htmlFor="platform"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Platform
              </Label>
              <Input
                type="text"
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., LinkedIn, Twitter, Instagram..."
                className="w-full"
              />
            </div>

            <div className="pb-2">
              <Label
                htmlFor="url"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                URL
              </Label>
              <Input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="https://..."
                className="w-full"
              />
            </div>

            <Button
              type="button"
              onClick={handleAddSocialMedia}
              variant="default"
              className="w-full "
              disabled={!platform.trim() || !url.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Social Media
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
