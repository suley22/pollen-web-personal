"use client";

import {
  Clock,
  Eye,
  EyeOff,
  Copy,
  Check,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";

interface InterviewPendingCardProps {
  calendlyLink: string;
  candidateName: string;
  previewMode: "assessment" | "calendly" | null;
  copied: boolean;
  onTogglePreview: () => void;
  onCopyLink: () => void;
  onGenerateNewLink: () => void;
}

export function InterviewPendingCard({
  calendlyLink,
  candidateName,
  previewMode,
  copied,
  onTogglePreview,
  onCopyLink,
  onGenerateNewLink,
}: InterviewPendingCardProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Clock className="w-6 h-6 text-purple-600" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Awaiting Candidate Response
              </h3>
              <span className="bg-purple-100 text-purple-700 border border-purple-300 text-xs px-2 py-1 rounded-full font-medium">
                Pending
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Interview link has been sent to <strong>{candidateName}</strong>.
            Waiting for them to schedule a time.
          </p>

          {/* Link Management */}
          <div className="space-y-3">
            <div className="bg-white border border-purple-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-medium text-purple-700">
                  Active Scheduling Link
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={calendlyLink}
                  readOnly
                  className="flex-1 text-sm border border-gray-200 rounded px-3 py-2 font-mono bg-gray-50 text-gray-600"
                />
                <button
                  onClick={onTogglePreview}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                    previewMode === "calendly"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                  title={
                    previewMode === "calendly" ? "Hide preview" : "Show preview"
                  }
                >
                  {previewMode === "calendly" ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={onCopyLink}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1"
                  title="Copy link"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1"
                  title="Open link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-purple-600 bg-purple-50 p-2 rounded border border-purple-200">
              <span>⚠️</span>
              <p>
                This link can only be used once and will expire after the event
                is scheduled.
              </p>
            </div>

            {/* Option to generate new link */}
            <button
              onClick={onGenerateNewLink}
              className="w-full px-3 py-2 bg-white border-2 border-purple-300 text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <LinkIcon className="w-4 h-4" />
              Generate New Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
