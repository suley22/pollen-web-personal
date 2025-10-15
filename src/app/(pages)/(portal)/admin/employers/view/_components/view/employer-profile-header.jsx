"use client";

import { PageHeader } from "@/components/design-system/page-header";
import {
  SuccessButton,
  WarningButton,
  DangerButton,
  EditButton,
} from "@/components/design-system/status-buttons";
import { DeleteConfirmationDialog } from "@/components/design-system/delete-confirmation-dialog";
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
  const isHidden = companyStatus === "hidden" || companyStatus === "draft";

  return (
    <PageHeader title={companyName} showBackButton={true} onBack={onBack}>
      {/* Status Actions */}

      {isHidden && (
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

      {/* Edit Button */}
      <EditButton text="Edit Profile" icon={<Edit />} onClick={onEdit} />

      {/* Delete Button with Confirmation */}
      <DeleteConfirmationDialog
        trigger={<DangerButton text="Delete" icon={<Trash2 />} />}
        title="Delete Company Profile"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={companyName}
        onConfirm={onDelete}
        confirmText="Delete Profile"
      />
    </PageHeader>
  );
}
