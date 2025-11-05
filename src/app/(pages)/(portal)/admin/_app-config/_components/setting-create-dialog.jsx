"use client";

import { useState } from "react";
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

export function SettingCreateDialog({ isOpen, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    key: "",
    value: "",
    description: "",
    is_sensitive: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onConfirm(formData);
    // Reset form
    setFormData({
      key: "",
      value: "",
      description: "",
      is_sensitive: false,
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form on close
    setFormData({
      key: "",
      value: "",
      description: "",
      is_sensitive: false,
    });
  };

  const isValid = formData.key.trim() !== "" && formData.value.trim() !== "";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Setting</DialogTitle>
          <DialogDescription>
            Add a new configuration setting to the application.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="key">
              Key <span className="text-red-500">*</span>
            </Label>
            <Input
              id="key"
              value={formData.key}
              onChange={(e) => handleChange("key", e.target.value)}
              placeholder="e.g., API_URL, MAX_UPLOAD_SIZE"
              className="font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="value">
              Value <span className="text-red-500">*</span>
            </Label>
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
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Create Setting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
