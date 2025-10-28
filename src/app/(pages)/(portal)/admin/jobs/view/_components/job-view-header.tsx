"use client";

import { PageHeader } from "@/components/design-system/page-header";
import {
  PrimaryButton,
  SuccessButton,
  WarningButton,
  DangerButton,
  EditButton,
} from "@/components/design-system/status-buttons";
import { DeleteConfirmationDialog } from "@/components/design-system/delete-confirmation-dialog";
import { Edit, CheckCircle, Pause, Play, Trash2 } from "lucide-react";

export function JobViewHeader({
  jobTitle,
  companyName,
  jobStatus,
  onBack,
  onEdit,
  onGoLive,
  onPause,
  onComplete,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) {
  const isDraft = jobStatus === "draft";
  const isLive = jobStatus === "live";
  const isPaused = jobStatus === "paused";
  const isComplete = jobStatus === "complete";

  return (
    <PageHeader
      title={`${jobTitle} at ${companyName}`}
      showBackButton={true}
      onBack={onBack}
    >
      {/* Draft Status Actions: Set Live, Edit */}
      {isDraft && (
        <>
          <SuccessButton
            text="Set Live"
            icon={<Play />}
            onClick={onGoLive}
            disabled={isUpdating || isDeleting}
          />
          <EditButton
            text="Edit"
            icon={<Edit />}
            onClick={onEdit}
            disabled={isUpdating || isDeleting}
          />
        </>
      )}

      {/* Live Status Actions: Edit, Pause, Mark Complete */}
      {isLive && (
        <>
          <EditButton
            text="Edit"
            icon={<Edit />}
            onClick={onEdit}
            disabled={isUpdating || isDeleting}
          />
          <WarningButton
            text="Pause"
            icon={<Pause />}
            onClick={onPause}
            disabled={isUpdating || isDeleting}
          />
          <PrimaryButton
            text="Mark Complete"
            icon={<CheckCircle />}
            onClick={onComplete}
            disabled={isUpdating || isDeleting}
          />
        </>
      )}

      {/* Paused Status Actions: Edit, Set Live */}
      {isPaused && (
        <>
          <EditButton
            text="Edit"
            icon={<Edit />}
            onClick={onEdit}
            disabled={isUpdating || isDeleting}
          />
          <SuccessButton
            text="Set Live"
            icon={<Play />}
            onClick={onGoLive}
            disabled={isUpdating || isDeleting}
          />
        </>
      )}

      {/* Complete Status: No action buttons, only Delete */}

      {/* Delete Button with Confirmation - Available in all states */}
      <DeleteConfirmationDialog
        trigger={
          <DangerButton
            text="Delete"
            icon={<Trash2 />}
            disabled={isUpdating || isDeleting}
          />
        }
        title="Delete Job"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={jobTitle}
        onConfirm={onDelete}
        confirmText="Delete Job"
      />
    </PageHeader>
  );
}
