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
  approvalStatus,
  onBack,
  onEdit,
  onSetLive,
  onHideProfile,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) {
  const isApproved = approvalStatus === "approved";

  return (
    <PageHeader title={companyName} showBackButton={true} onBack={onBack}>
      {/* Status Actions */}

      {!isApproved && (
        <SuccessButton
          text="Set Live"
          icon={<CheckCircle />}
          onClick={onSetLive}
          disabled={isUpdating || isDeleting}
        />
      )}

      {isApproved && (
        <WarningButton
          text="Hide Profile"
          icon={<EyeOff />}
          onClick={onHideProfile}
          disabled={isUpdating || isDeleting}
        />
      )}

      {/* Edit Button */}
      <EditButton
        text="Edit Profile"
        icon={<Edit />}
        onClick={onEdit}
        disabled={isUpdating || isDeleting}
      />

      {/* Delete Button with Confirmation */}
      <DeleteConfirmationDialog
        trigger={
          <DangerButton
            text="Delete"
            icon={<Trash2 />}
            disabled={isUpdating || isDeleting}
          />
        }
        title="Delete Company Profile"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={companyName}
        onConfirm={onDelete}
        confirmText="Delete Profile"
      />
    </PageHeader>
  );
}
