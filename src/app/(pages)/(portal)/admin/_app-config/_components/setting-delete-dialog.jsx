"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/buttons/button";

export function SettingDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  settingKey,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Setting</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this setting? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gray-50 p-4 rounded-md border">
            <p className="text-sm text-gray-600 mb-1">Setting Key:</p>
            <p className="font-mono font-medium text-gray-900">{settingKey}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Setting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
