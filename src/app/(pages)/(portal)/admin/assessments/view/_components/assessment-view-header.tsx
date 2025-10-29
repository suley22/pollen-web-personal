"use client";

import { PageHeader } from "@/components/design-system/page-header";
import {
  SuccessButton,
  WarningButton,
  DangerButton,
  EditButton,
} from "@/components/design-system/status-buttons";
import { DeleteConfirmationDialog } from "@/components/design-system/delete-confirmation-dialog";
import { Edit, CheckCircle, Pause, Archive, Trash2 } from "lucide-react";
import { AssessmentStatusEnum } from "@/types/assessment-types";

interface AssessmentViewHeaderProps {
  title: string;
  status: string;
  onBack: () => void;
  onEdit: () => void;
  onSetLive: () => void;
  onPause: () => void;
  onArchive: () => void;
  onDelete: () => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function AssessmentViewHeader({
  title,
  status,
  onBack,
  onEdit,
  onSetLive,
  onPause,
  onArchive,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: AssessmentViewHeaderProps) {
  const isDraft = status === AssessmentStatusEnum.Draft;
  const isLive = status === AssessmentStatusEnum.Live;
  const isPaused = status === AssessmentStatusEnum.Paused;
  const isArchived = status === AssessmentStatusEnum.Archived;

  return (
    <PageHeader title={title} showBackButton={true} onBack={onBack}>
      {/* Status Actions - Show Set Live button when Draft or Paused */}
      {(isDraft || isPaused) && (
        <SuccessButton
          text="Set Live"
          icon={<CheckCircle />}
          onClick={onSetLive}
          disabled={isUpdating || isDeleting}
        />
      )}

      {/* Show Pause button only when Live */}
      {isLive && (
        <WarningButton
          text="Pause"
          icon={<Pause />}
          onClick={onPause}
          disabled={isUpdating || isDeleting}
        />
      )}

      {/* Edit Button */}
      <EditButton
        text="Edit"
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
        title="Delete Assessment"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={title}
        onConfirm={onDelete}
        confirmText="Delete Assessment"
      />
    </PageHeader>
  );
}
