"use client";

import { PageHeader } from "@/components/design-system/page-header";
import { JobStatusBadge } from "@/components/design-system/job-status-badge";
import {
  SuccessButton,
  CompleteButton,
  WarningButton,
  DangerButton,
  EditButton,
} from "@/components/design-system/status-buttons";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationDialog } from "@/components/design-system/delete-confirmation-dialog";
import {
  Edit,
  CheckCircle,
  Pause,
  Play,
  Trash2,
  XCircle,
  Users,
} from "lucide-react";

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
  onViewCandidates,
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
      title={
        <div className="flex items-center gap-3">
          <span>{`${jobTitle} at ${companyName}`}</span>
        </div>
      }
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
          <Button
            variant="outline"
            size="sm"
            onClick={onViewCandidates}
            disabled={isUpdating || isDeleting}
            className="gap-2 font-sora"
          >
            <Users className="h-4 w-4" />
            View Candidates
          </Button>
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
          <Button
            variant="outline"
            size="sm"
            onClick={onViewCandidates}
            disabled={isUpdating || isDeleting}
            className="gap-2 font-sora"
          >
            <Users className="h-4 w-4" />
            View Candidates
          </Button>
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

      {/* Complete or Cancelled Status: Set Live and Delete */}
      {(isComplete || isCancelled) && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewCandidates}
            disabled={isUpdating || isDeleting}
            className="gap-2 font-sora"
          >
            <Users className="h-4 w-4" />
            View Candidates
          </Button>
          <SuccessButton
            text="Set Live"
            icon={<Play />}
            onClick={onGoLive}
            disabled={isUpdating || isDeleting}
          />
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
        </>
      )}
    </PageHeader>
  );
}
