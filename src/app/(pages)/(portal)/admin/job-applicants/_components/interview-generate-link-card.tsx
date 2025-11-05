"use client";

import { Link as LinkIcon } from "lucide-react";

interface InterviewGenerateLinkCardProps {
  onGenerateLink: () => void;
}

export function InterviewGenerateLinkCard({
  onGenerateLink,
}: InterviewGenerateLinkCardProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-green-600" />
            Interview Scheduling
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Generate a link to invite the candidate to schedule an interview
          </p>
        </div>
      </div>

      <button
        onClick={onGenerateLink}
        className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        <LinkIcon className="w-5 h-5" />
        Generate Interview Link
      </button>
    </div>
  );
}
