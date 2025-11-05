"use client";

import { X } from "lucide-react";
import { AssessmentPreview } from "@/components/assessment/assessment-preview";

interface DrawerPreviewPanelProps {
  previewMode: "assessment" | "calendly" | null;
  onClose: () => void;
  assessmentResponse?: any;
  isLoadingAssessment?: boolean;
  assessmentError?: string;
  calendlyLink?: string | null;
}

export function DrawerPreviewPanel({
  previewMode,
  onClose,
  assessmentResponse,
  isLoadingAssessment,
  assessmentError,
  calendlyLink,
}: DrawerPreviewPanelProps) {
  if (!previewMode) return null;

  return (
    <div className="w-1/2 bg-gray-50 shadow-xl overflow-hidden border-r border-gray-300">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold">
              {previewMode === "assessment"
                ? "Assessment Preview"
                : "Calendly Booking Preview"}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close Preview"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {previewMode === "assessment" ? (
            <div className="p-6">
              <AssessmentPreview
                title={assessmentResponse?.title}
                subtitle={assessmentResponse?.subtitle}
                questions={assessmentResponse?.questions || []}
                showCategorySummary={true}
                isLoading={isLoadingAssessment}
                error={assessmentError}
              />
            </div>
          ) : calendlyLink ? (
            <div className="h-full">
              <iframe
                src={calendlyLink}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Booking Page"
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <p className="text-gray-500">No Calendly link available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
