"use client";

import { PageHeader } from "@/components/design-system/page-header";
import {
  SuccessButton,
  CompleteButton,
  WarningButton,
  DangerButton,
  EditButton,
} from "@/components/design-system/status-buttons";
import { DeleteConfirmationDialog } from "@/components/design-system/delete-confirmation-dialog";
import { Edit, CheckCircle, Pause, Play, Trash2, XCircle } from "lucide-react";

export function JobViewHeader({
  jobTitle,
  companyName,
  jobStatus,
  onBack,
  onEdit,
  onGoLive,
  onPause,
  onComplete,
  onCancel,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) {
  const isDraft = jobStatus === "draft";
  const isLive = jobStatus === "live";
  const isPaused = jobStatus === "paused";
  const isComplete = jobStatus === "complete";
  const isCancelled = jobStatus === "cancelled";

  return (
    <PageHeader
      title={`${jobTitle} at ${companyName}`}
      showBackButton={true}
      onBack={onBack}
    >
      {/* Draft Status Actions: Set Live, Edit, Cancel */}
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
          <DeleteConfirmationDialog
            trigger={
              <DangerButton
                text="Cancel"
                icon={<XCircle />}
                disabled={isUpdating || isDeleting}
              />
            }
            title="Cancel Job"
            description="Are you sure you want to cancel {itemName}? You can still access it later."
            itemName={jobTitle}
            onConfirm={onCancel}
            confirmText="Cancel Job"
          />
        </>
      )}

      {/* Live Status Actions: Edit, Pause, Mark Complete, Cancel */}
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
          <CompleteButton
            text="Mark Complete"
            icon={<CheckCircle />}
            onClick={onComplete}
            disabled={isUpdating || isDeleting}
          />
          <DeleteConfirmationDialog
            trigger={
              <DangerButton
                text="Cancel"
                icon={<XCircle />}
                disabled={isUpdating || isDeleting}
              />
            }
            title="Cancel Job"
            description="Are you sure you want to cancel {itemName}? You can still access it later."
            itemName={jobTitle}
            onConfirm={onCancel}
            confirmText="Cancel Job"
          />
        </>
      )}

      {/* Paused Status Actions: Edit, Set Live, Cancel */}
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
          <DeleteConfirmationDialog
            trigger={
              <DangerButton
                text="Cancel"
                icon={<XCircle />}
                disabled={isUpdating || isDeleting}
              />
            }
            title="Cancel Job"
            description="Are you sure you want to cancel {itemName}? You can still access it later."
            itemName={jobTitle}
            onConfirm={onCancel}
            confirmText="Cancel Job"
          />
        </>
      )}

      {/* Complete or Cancelled Status: Only Delete (soft delete with deleted_at) */}
      {(isComplete || isCancelled) && (
        <DeleteConfirmationDialog
          trigger={
            <DangerButton
              text="Delete"
              icon={<Trash2 />}
              disabled={isUpdating || isDeleting}
            />
          }
          title="Delete Job"
          description="Are you sure you want to permanently delete {itemName}? This action cannot be undone."
          itemName={jobTitle}
          onConfirm={onDelete}
          confirmText="Delete Job"
        />
      )}
    </PageHeader>
  );
}
