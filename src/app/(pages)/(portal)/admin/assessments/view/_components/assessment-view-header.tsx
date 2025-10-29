"use client";

import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { DeleteConfirmationDialog } from "@/components/design-system/delete-confirmation-dialog";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AssessmentViewHeaderProps {
  title: string;
  type: string;
  status: string;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const STATUS_STYLES = {
  draft: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  live: "bg-green-100 text-green-800 hover:bg-green-200",
  paused: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  archived: "bg-red-100 text-red-800 hover:bg-red-200",
};

const TYPE_LABELS = {
  multiple_choice: "Multiple Choice",
  free_input: "Free Input",
  file_upload: "File Upload",
};

export function AssessmentViewHeader({
  title,
  type,
  status,
  onBack,
  onEdit,
  onDelete,
  isDeleting,
}: AssessmentViewHeaderProps) {
  return (
    <div className="space-y-4">
      <PageHeader
        showBackButton={true}
        title={title}
        subtitle="View assessment details and configuration"
        onBack={onBack}
      >
        <div className="flex gap-2">
          <PrimaryButton
            icon={<Edit className="h-4 w-4" />}
            text="Edit"
            onClick={onEdit}
          />
          <DeleteConfirmationDialog
            trigger={
              <PrimaryButton
                icon={<Trash2 className="h-4 w-4" />}
                text="Delete"
                loading={isDeleting}
              />
            }
            title="Delete Assessment"
            description="Are you sure you want to delete this assessment? This action cannot be undone."
            itemName={title}
            onConfirm={onDelete}
          />
        </div>
      </PageHeader>
      <div className="flex items-center gap-2">
        <Badge className={STATUS_STYLES[status as keyof typeof STATUS_STYLES]}>
          {status?.toUpperCase()}
        </Badge>
        <Badge variant="outline">
          {TYPE_LABELS[type as keyof typeof TYPE_LABELS]}
        </Badge>
      </div>
    </div>
  );
}
