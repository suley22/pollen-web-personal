"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert";
import { PageHeader } from "@/components/design-system/page-header";
import {
  SuccessButton,
  WarningButton,
  DangerButton,
  EditButton,
} from "@/components/design-system/status-buttons";
import { Edit, CheckCircle, EyeOff, Trash2 } from "lucide-react";

export function EmployerProfileHeader({
  companyName,
  companyStatus,
  onBack,
  onEdit,
  onSetLive,
  onHideProfile,
  onDelete,
}) {
  return (
    <PageHeader title={companyName} showBackButton={true} onBack={onBack}>
      {/* Status Actions */}
      {companyStatus === "draft" && (
        <SuccessButton
          text="Set Live"
          icon={<CheckCircle />}
          onClick={onSetLive}
        />
      )}

      {companyStatus === "live" && (
        <WarningButton
          text="Hide Profile"
          icon={<EyeOff />}
          onClick={onHideProfile}
        />
      )}

      {companyStatus === "hidden" && (
        <SuccessButton
          text="Set Live"
          icon={<CheckCircle />}
          onClick={onSetLive}
        />
      )}

      {/* Edit Button */}
      <EditButton text="Edit Profile" icon={<Edit />} onClick={onEdit} />

      {/* Delete Button with Confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <DangerButton text="Delete" icon={<Trash2 />} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Company Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {companyName}? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={onDelete}
            >
              Delete Profile
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageHeader>
  );
}
