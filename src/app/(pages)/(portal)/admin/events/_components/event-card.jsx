"use client";

import { Calendar, Clock, MapPin, Users, Video, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EventCard({ event, onClick }) {
  // Formatear fecha y hora
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // Calcular duración
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = (endDate - startDate) / (1000 * 60); // en minutos
    return `${diff} min`;
  };

  const startDateTime = formatDateTime(event.start_time);
  const endDateTime = formatDateTime(event.end_time);
  const duration = calculateDuration(event.start_time, event.end_time);

  // Obtener el tipo de ubicación
  const getLocationType = () => {
    if (!event.location) return null;
    
    const typeMapping = {
      "google_meet": "Google Meet",
      "zoom": "Zoom",
      "microsoft_teams": "Microsoft Teams",
      "gotomeeting": "GoToMeeting",
      "webex": "Webex",
      "custom": "Custom Location",
      "physical": "Physical Location",
      "ask_invitee": "Ask Invitee",
      "inbound_call": "Inbound Call",
      "outbound_call": "Outbound Call",
    };

    return typeMapping[event.location.type] || event.location.type;
  };

  const locationType = getLocationType();

  // Determinar el color del badge según el estado
  const getStatusColor = () => {
    switch (event.status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {event.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor()} capitalize`}>
              {event.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Fecha y hora */}
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {startDateTime.date}
            </p>
            <p className="text-sm text-gray-600">
              {startDateTime.time} - {endDateTime.time}
            </p>
          </div>
        </div>

        {/* Duración */}
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gray-400" />
          <p className="text-sm text-gray-600">{duration}</p>
        </div>

        {/* Ubicación */}
        {locationType && (
          <div className="flex items-start gap-3">
            {event.location?.type?.includes("meet") || 
             event.location?.type?.includes("zoom") || 
             event.location?.type?.includes("teams") ? (
              <Video className="h-5 w-5 text-gray-400 mt-0.5" />
            ) : (
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-sm text-gray-600">{locationType}</p>
              {event.location?.join_url && (
                <a
                  href={event.location.join_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                >
                  Join Meeting
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Invitados */}
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-gray-400" />
          <p className="text-sm text-gray-600">
            {event.invitees_counter?.active || 0} participants
            {event.invitees_counter?.limit && 
              ` (max: ${event.invitees_counter.limit})`}
          </p>
        </div>
      </div>

      {/* Tipo de evento */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Event Type: {event.event_type?.split("/").pop() || "N/A"}
        </p>
        <p className="text-xs text-blue-600 font-medium">
          Click para ver detalles →
        </p>
      </div>
    </div>
  );
}
