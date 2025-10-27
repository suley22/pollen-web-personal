"use client";

import { PageHeader } from "@/components/design-system/page-header";
import {
  SuccessButton,
  WarningButton,
  DangerButton,
  EditButton,
} from "@/components/design-system/status-buttons";
import { DeleteConfirmationDialog } from "@/components/design-system/delete-confirmation-dialog";
import { Edit, CheckCircle, Pause, Play, X, Trash2 } from "lucide-react";

export function JobViewHeader({
  jobTitle,
  companyName,
  jobStatus,
  isEditing,
  isEditingAssessment,
  canMarkComplete,
  onBack,
  onEdit,
  onSave,
  onCancel,
  onGoLive,
  onPause,
  onComplete,
  onCancelJob,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) {
  const isDraft = jobStatus === "draft";
  const isLive = jobStatus === "live";
  const isPaused = jobStatus === "paused";
  const isComplete = jobStatus === "complete";
  const isInEditMode = isEditing || isEditingAssessment;

  return (
    <PageHeader
      title={`${jobTitle} at ${companyName}`}
      showBackButton={true}
      onBack={onBack}
    >
      {/* Editing Mode Actions */}
      {isInEditMode && (
        <>
          <DangerButton
            text="Cancel"
            icon={<X />}
            onClick={onCancel}
            disabled={isUpdating}
          />
          <SuccessButton
            text="Save Changes"
            icon={<CheckCircle />}
            onClick={onSave}
            disabled={isUpdating}
          />
        </>
      )}

      {/* Draft Status Actions: Set Live, Edit, Cancel */}
      {isDraft && !isInEditMode && (
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
          <DangerButton
            text="Cancel"
            icon={<X />}
            onClick={onCancelJob}
            disabled={isUpdating || isDeleting}
          />
        </>
      )}

      {/* Live Status Actions: Edit, Pause, Mark Complete */}
      {isLive && !isInEditMode && (
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
          <SuccessButton
            text="Mark Complete"
            icon={<CheckCircle />}
            onClick={onComplete}
            disabled={!canMarkComplete || isUpdating || isDeleting}
          />
        </>
      )}

      {/* Paused Status Actions: Edit, Set Live, Cancel, Mark Complete */}
      {isPaused && !isInEditMode && (
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
          <DangerButton
            text="Cancel"
            icon={<X />}
            onClick={onCancelJob}
            disabled={isUpdating || isDeleting}
          />
          <SuccessButton
            text="Mark Complete"
            icon={<CheckCircle />}
            onClick={onComplete}
            disabled={!canMarkComplete || isUpdating || isDeleting}
          />
        </>
      )}

      {/* Complete Status Actions: Edit */}
      {isComplete && !isInEditMode && (
        <>
          <EditButton
            text="Edit"
            icon={<Edit />}
            onClick={onEdit}
            disabled={isUpdating || isDeleting}
          />
        </>
      )}

      {/* Delete Button with Confirmation - Available in all non-editing states */}
      {!isInEditMode && (
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
      )}
    </PageHeader>
  );
}
