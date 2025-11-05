"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/design-system/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function SettingEditDialog({ isOpen, onClose, onConfirm, setting }) {
  const [formData, setFormData] = useState({
    key: setting?.key || "",
    value: setting?.value || "",
    description: setting?.description || "",
    is_sensitive: setting?.is_sensitive || false,
  });

  // Update form when setting changes
  useEffect(() => {
    if (setting) {
      setFormData({
        key: setting.key || "",
        value: setting.value || "",
        description: setting.description || "",
        is_sensitive: setting.is_sensitive || false,
      });
    }
  }, [setting]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onConfirm({
      id: setting.id,
      ...formData,
    });
  };

  if (!setting) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Setting</DialogTitle>
          <DialogDescription>
            Update the configuration setting. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={formData.key}
              onChange={(e) => handleChange("key", e.target.value)}
              placeholder="e.g., API_URL, MAX_UPLOAD_SIZE"
              className="font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => handleChange("value", e.target.value)}
              placeholder="Setting value"
              className="font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Optional description of what this setting controls"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_sensitive"
              checked={formData.is_sensitive}
              onCheckedChange={(checked) =>
                handleChange("is_sensitive", checked)
              }
            />
            <Label
              htmlFor="is_sensitive"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sensitive (hide value by default)
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
