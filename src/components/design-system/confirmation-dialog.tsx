"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Divider } from "./divider";
import {
  SecondaryButton,
  DangerButton as DangerButtonPrimary,
} from "./primary-button";

export function ConfirmationDialog({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  loadingText = "Loading...",
  open,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <Divider />
        <DialogFooter>
          <DialogClose asChild>
            <SecondaryButton
              text={cancelText}
              disabled={isLoading}
              type="button"
            />
          </DialogClose>
          <DangerButtonPrimary
            text={isLoading ? loadingText : confirmText}
            onClick={onConfirm}
            disabled={isLoading}
            loading={isLoading}
            type="button"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
