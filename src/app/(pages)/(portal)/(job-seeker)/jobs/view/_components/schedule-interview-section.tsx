"use client";

import { useState } from "react";
import {
  Calendar,
  X,
  ExternalLink,
  Clock,
  MapPin,
  Video,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface ScheduleInterviewSectionProps {
  interviewLink: string | null;
  calendlyEventUri?: string | null;
}

// Función para obtener detalles del evento de Calendly
async function fetchCalendlyEventDetails(eventUri: string) {
  const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN;

  if (!CALENDLY_API_TOKEN) {
    throw new Error("Calendly API token not configured");
  }

  const response = await fetch(eventUri, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch event details");
  }

  const data = await response.json();
  return data.resource;
}

// Función para obtener invitados del evento
async function fetchCalendlyEventInvitees(eventUri: string) {
  const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN;

  if (!CALENDLY_API_TOKEN) {
    throw new Error("Calendly API token not configured");
  }

  const response = await fetch(`${eventUri}/invitees`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch invitees");
  }

  const data = await response.json();
  return data.collection || [];
}

export function ScheduleInterviewSection({
  interviewLink,
  calendlyEventUri,
}: ScheduleInterviewSectionProps) {
  const [showModal, setShowModal] = useState(false);

  // Fetch event details if calendlyEventUri exists
  const { data: eventDetails, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["calendly-event", calendlyEventUri],
    queryFn: () => fetchCalendlyEventDetails(calendlyEventUri!),
    enabled: !!calendlyEventUri,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const { data: invitees, isLoading: isLoadingInvitees } = useQuery({
    queryKey: ["calendly-invitees", calendlyEventUri],
    queryFn: () => fetchCalendlyEventInvitees(calendlyEventUri!),
    enabled: !!calendlyEventUri,
    staleTime: 1000 * 60 * 5,
  });

  if (!interviewLink) {
    return null;
  }

  // Si ya hay un evento agendado, mostrar los detalles
  if (calendlyEventUri && eventDetails) {
    const startTime = new Date(eventDetails.start_time);
    const endTime = new Date(eventDetails.end_time);
    const duration = Math.round(
      (endTime.getTime() - startTime.getTime()) / (1000 * 60),
    );

    const formattedDate = startTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const joinUrl = eventDetails.location?.join_url;

    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Interview Scheduled
              </h3>
              <Badge className="bg-green-100 text-green-700 border-green-300">
                Confirmed
              </Badge>
            </div>

            <div className="space-y-3">
              {/* Date and Time */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{formattedDate}</p>
                  <p className="text-sm text-gray-600">{formattedTime}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600">{duration} minutes</p>
              </div>

              {/* Location/Meeting Link */}
              {eventDetails.location && (
                <div className="flex items-start gap-3">
                  {eventDetails.location.type === "physical" ? (
                    <>
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        {eventDetails.location.location || "Physical location"}
                      </p>
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">
                          Video conference
                        </p>
                        {joinUrl && (
                          <a
                            href={joinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                          >
                            Join Meeting
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Event Name */}
            {eventDetails.name && (
              <div className="pt-3 border-t border-green-200">
                <p className="text-sm text-gray-600">
                  <strong>Event:</strong> {eventDetails.name}
                </p>
              </div>
            )}

            {/* Additional Info */}
            <div className="pt-3 border-t border-green-200">
              <p className="text-sm text-gray-600">
                💡 You&apos;ll receive reminder emails before the interview.
                Make sure to join on time!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay evento agendado, mostrar invitación para agendar
  return (
    <>
      {/* Interview Invitation Card */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>

          <div className="flex flex-col flex-1 ">
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-gray-900">
                Interview Invitation
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                Action Required
              </Badge>
            </div>

            <div className="flex justify-between gap-3 items-center ">
              <p className="text-sm text-gray-600 ">
                Congratulations! You&apos;ve been invited to schedule an
                interview. Click below to choose a time that works best for you.
              </p>
              <Button
                onClick={() => setShowModal(true)}
                size="default"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with Calendly iframe */}
      {showModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Schedule Your Interview
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Iframe Content */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={interviewLink}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule Interview"
                  className="w-full h-full"
                />
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
                <p>
                  💡 <strong>Tip:</strong> Make sure to select a time that works
                  best for you. You&apos;ll receive a confirmation email with
                  all the details.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
