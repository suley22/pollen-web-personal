"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/buttons/button";
import { AlertTriangle } from "lucide-react";

export function UserDeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userEmail,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirm User Deletion
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete the user{" "}
            <strong>{userName}</strong>?
          </p>
          <div className="bg-red-50 p-3 rounded-lg space-y-2 border border-red-200">
            <div className="flex justify-between">
              <span className="text-sm font-medium">User:</span>
              <span className="text-sm text-gray-800 font-medium">
                {userName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm text-gray-600">
                {userEmail}
              </span>
            </div>
          </div>
          <p className="text-xs text-red-600 mt-3 font-medium">
            ⚠️ This action cannot be undone. The user will be permanently deleted from the system.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm} 
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}