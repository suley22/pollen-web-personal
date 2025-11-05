"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Video,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";

interface InterviewScheduledCardProps {
  eventDetails: any;
  calendlyLink?: string | null;
}

export function InterviewScheduledCard({
  eventDetails,
  calendlyLink,
}: InterviewScheduledCardProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Interview Scheduled
              </h3>
              <span className="bg-green-100 text-green-700 border border-green-300 text-xs px-2 py-1 rounded-full font-medium">
                Confirmed
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {/* Date and Time */}
            {eventDetails.start_time && (
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(eventDetails.start_time).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(eventDetails.start_time).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      },
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Duration */}
            {eventDetails.start_time && eventDetails.end_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">
                  {Math.round(
                    (new Date(eventDetails.end_time).getTime() -
                      new Date(eventDetails.start_time).getTime()) /
                      (1000 * 60),
                  )}{" "}
                  minutes
                </p>
              </div>
            )}

            {/* Location */}
            {eventDetails.location && (
              <div className="flex items-start gap-2">
                {eventDetails.location.type === "physical" ? (
                  <>
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                    <p className="text-xs text-gray-600">
                      {eventDetails.location.location || "Physical location"}
                    </p>
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">
                        Video conference
                      </p>
                      {eventDetails.location.join_url && (
                        <a
                          href={eventDetails.location.join_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
                        >
                          Join Meeting
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Event Name */}
            {eventDetails.name && (
              <div className="pt-2 border-t border-green-200">
                <p className="text-xs text-gray-600">
                  <strong>Event:</strong> {eventDetails.name}
                </p>
              </div>
            )}
          </div>

          {/* Scheduling Link - Collapsed */}
          {calendlyLink && (
            <div className="pt-3 border-t border-green-200">
              <details className="group">
                <summary className="cursor-pointer text-xs font-medium text-green-700 hover:text-green-800 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  View Scheduling Link
                </summary>
                <div className="mt-2 bg-white border border-green-200 rounded-lg p-2">
                  <input
                    type="text"
                    value={calendlyLink}
                    readOnly
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1 font-mono bg-gray-50 text-gray-600"
                  />
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
