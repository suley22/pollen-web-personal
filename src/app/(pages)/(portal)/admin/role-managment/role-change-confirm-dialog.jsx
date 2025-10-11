"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/buttons/button";
import { AlertTriangle } from "lucide-react";

export function RoleChangeConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  currentRole,
  newRole,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onClose();
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "job_seeker":
        return "Job Seeker";
      default:
        return role || "No Role";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Confirm Role Change
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            ¿Are you sure you want to change the role of{" "}
            <strong>{userName}</strong>?
          </p>
          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Current role:</span>
              <span className="text-sm text-gray-600">
                {getRoleLabel(currentRole)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">New Rol:</span>
              <span className="text-sm font-bold text-blue-600">
                {getRoleLabel(newRole)}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            This action will immediately change the user's permissions and
            access level.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            No, Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Updating..." : "Yes, Change Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
