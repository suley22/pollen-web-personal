"use client";

import { X, Link as LinkIcon, Check } from "lucide-react";

interface CalendlyEventTypeDialogProps {
  isOpen: boolean;
  candidateName: string;
  eventTypes?: any[];
  isLoadingEventTypes: boolean;
  selectedEventType: string;
  isGeneratingLink: boolean;
  onClose: () => void;
  onSelectEventType: (uri: string) => void;
  onGenerateLink: () => void;
}

export function CalendlyEventTypeDialog({
  isOpen,
  candidateName,
  eventTypes,
  isLoadingEventTypes,
  selectedEventType,
  isGeneratingLink,
  onClose,
  onSelectEventType,
  onGenerateLink,
}: CalendlyEventTypeDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[70] bg-white rounded-lg shadow-xl p-6 w-[500px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Select Event Type
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Choose the type of interview event to generate a scheduling link for{" "}
          {candidateName}.
        </p>

        <div className="space-y-3 mb-6">
          {isLoadingEventTypes ? (
            <div className="text-center py-4 text-sm text-gray-500">
              Loading event types...
            </div>
          ) : eventTypes && eventTypes.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {eventTypes.map((eventType: any) => (
                <button
                  key={eventType.uri}
                  onClick={() => onSelectEventType(eventType.uri)}
                  className={`w-full text-left p-3 border rounded-lg transition-colors ${
                    selectedEventType === eventType.uri
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {eventType.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {eventType.duration} minutes
                      </div>
                    </div>
                    {selectedEventType === eventType.uri && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-gray-500">
              No event types available
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onGenerateLink}
            disabled={!selectedEventType || isGeneratingLink}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGeneratingLink ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <LinkIcon className="w-4 h-4" />
                Generate Link
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
