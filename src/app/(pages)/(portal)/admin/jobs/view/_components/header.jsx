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
  completeButtonDisabledReason,
  onBack,
  onEdit,
  onSave,
  onCancel,
  onSubmitToEmployer,
  onGoLive,
  onPause,
  onComplete,
  onCancelJob,
  onDelete,
}) {
  const isDraft = jobStatus === "draft";
  const isLive = jobStatus === "live";
  const isPaused = jobStatus === "paused";

  return (
    <PageHeader
      title={`${jobTitle} at ${companyName}`}
      showBackButton={true}
      onBack={onBack}
    >
      {/* Editing Mode Actions */}
      {(isEditing || isEditingAssessment) && (
        <>
          <DangerButton text="Cancel" icon={<X />} onClick={onCancel} />
          <SuccessButton
            text="Save Changes"
            icon={<CheckCircle />}
            onClick={onSave}
          />
        </>
      )}

      {/* Draft Status Actions */}
      {isDraft && !isEditing && !isEditingAssessment && (
        <>
          <SuccessButton
            text="Submit to Employer"
            icon={<Play />}
            onClick={onSubmitToEmployer}
          />
          <EditButton text="Edit Job" icon={<Edit />} onClick={onEdit} />
          <DangerButton text="Cancel Job" icon={<X />} onClick={onCancelJob} />
        </>
      )}

      {/* Live Status Actions */}
      {isLive && !isEditing && !isEditingAssessment && (
        <>
          <WarningButton text="Pause" icon={<Pause />} onClick={onPause} />
          <SuccessButton
            text="Mark Complete"
            icon={<CheckCircle />}
            onClick={onComplete}
            disabled={!canMarkComplete}
            title={completeButtonDisabledReason}
          />
          <EditButton text="Edit" icon={<Edit />} onClick={onEdit} />
        </>
      )}

      {/* Paused Status Actions */}
      {isPaused && !isEditing && !isEditingAssessment && (
        <>
          <SuccessButton text="Set Live" icon={<Play />} onClick={onGoLive} />
          <DangerButton text="Cancel Job" icon={<X />} onClick={onCancelJob} />
          <SuccessButton
            text="Mark Complete"
            icon={<CheckCircle />}
            onClick={onComplete}
            disabled={!canMarkComplete}
            title={completeButtonDisabledReason}
          />
          <EditButton text="Edit" icon={<Edit />} onClick={onEdit} />
        </>
      )}

      {/* Delete Button with Confirmation - Available in all non-editing states */}
      {!isEditing && !isEditingAssessment && (
        <DeleteConfirmationDialog
          trigger={<DangerButton text="Delete" icon={<Trash2 />} />}
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
