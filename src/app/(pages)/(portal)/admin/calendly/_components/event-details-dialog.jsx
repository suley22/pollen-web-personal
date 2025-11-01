"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/buttons/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ExternalLink,
  Mail,
  User,
  Loader2,
} from "lucide-react";
import {
  useCalendlyEventDetails,
  useCalendlyEventInvitees,
} from "../_services/calendly-service";

export function EventDetailsDialog({ isOpen, onClose, eventUri }) {
  const { data: eventDetails, isLoading: loadingDetails } =
    useCalendlyEventDetails(eventUri);
  const { data: invitees, isLoading: loadingInvitees } =
    useCalendlyEventInvitees(eventUri);

  // Formatear fecha y hora
  const formatDateTime = (dateString) => {
    if (!dateString) return { date: "N/A", time: "N/A" };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
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
    if (!start || !end) return "N/A";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = (endDate - startDate) / (1000 * 60); // en minutos
    if (diff < 60) {
      return `${diff} min`;
    }
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  // Obtener el tipo de ubicación
  const getLocationType = (location) => {
    if (!location) return null;

    const typeMapping = {
      google_meet: "Google Meet",
      zoom: "Zoom",
      microsoft_teams: "Microsoft Teams",
      gotomeeting: "GoToMeeting",
      webex: "Webex",
      custom: "Custom Location",
      physical: "Physical Location",
      ask_invitee: "Ask Invitee",
      inbound_call: "Inbound Call",
      outbound_call: "Outbound Call",
    };

    return typeMapping[location.type] || location.type;
  };

  // Determinar el color del badge según el estado
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!eventUri) return null;

  const event = eventDetails || {};
  const startDateTime = formatDateTime(event.start_time);
  const endDateTime = formatDateTime(event.end_time);
  const duration = calculateDuration(event.start_time, event.end_time);
  const locationType = getLocationType(event.location);

  const isLoading = loadingDetails || loadingInvitees;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalles del Evento</DialogTitle>
          <DialogDescription>
            Información completa del evento programado
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500 flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Cargando detalles...
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Título y Estado */}
            <div className="border-b pb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {event.name || "Sin nombre"}
                </h3>
                <Badge className={`${getStatusColor(event.status)} capitalize`}>
                  {event.status}
                </Badge>
              </div>
            </div>

            {/* Información Principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fecha y hora */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Fecha
                    </p>
                    <p className="text-sm text-gray-900 capitalize">
                      {startDateTime.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Horario
                    </p>
                    <p className="text-sm text-gray-900">
                      {startDateTime.time} - {endDateTime.time}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Duración: {duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              {locationType && (
                <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                  <div className="flex items-start gap-3">
                    {event.location?.type?.includes("meet") ||
                    event.location?.type?.includes("zoom") ||
                    event.location?.type?.includes("teams") ? (
                      <Video className="h-5 w-5 text-blue-600 mt-1" />
                    ) : (
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Ubicación
                      </p>
                      <p className="text-sm text-gray-900">{locationType}</p>
                      {event.location?.join_url && (
                        <a
                          href={event.location.join_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
                        >
                          Unirse a la reunión
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {event.location?.location && (
                        <p className="text-xs text-gray-500 mt-1">
                          {event.location.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Invitados */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-gray-700" />
                <h4 className="text-lg font-semibold text-gray-900">
                  Invitados ({invitees?.length || 0})
                </h4>
              </div>

              {loadingInvitees ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                </div>
              ) : !invitees || invitees.length === 0 ? (
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">
                    No hay invitados registrados
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {invitees.map((invitee, index) => (
                    <div
                      key={invitee.uri || index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-gray-900">
                            {invitee.name || "Sin nombre"}
                          </p>
                          {invitee.status && (
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {invitee.status}
                            </Badge>
                          )}
                        </div>
                        {invitee.email && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            <a
                              href={`mailto:${invitee.email}`}
                              className="hover:text-blue-600 truncate"
                            >
                              {invitee.email}
                            </a>
                          </div>
                        )}
                        {invitee.timezone && (
                          <p className="text-xs text-gray-500 mt-1">
                            Zona horaria: {invitee.timezone}
                          </p>
                        )}
                        {invitee.created_at && (
                          <p className="text-xs text-gray-400 mt-1">
                            Registrado:{" "}
                            {new Date(invitee.created_at).toLocaleDateString(
                              "es-ES"
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Información adicional */}
            <div className="border-t pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div>
                  <span className="font-medium">Tipo de evento:</span>
                  <p className="mt-1">
                    {event.event_type?.split("/").pop() || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Creado:</span>
                  <p className="mt-1">
                    {event.created_at
                      ? new Date(event.created_at).toLocaleDateString("es-ES")
                      : "N/A"}
                  </p>
                </div>
                {event.updated_at && (
                  <div className="col-span-2">
                    <span className="font-medium">Última actualización:</span>
                    <p className="mt-1">
                      {new Date(event.updated_at).toLocaleString("es-ES")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t pt-4 flex justify-end gap-2">
          {event.location?.join_url && (
            <Button
              onClick={() => window.open(event.location.join_url, "_blank")}
              variant="default"
            >
              <Video className="h-4 w-4 mr-2" />
              Unirse a la reunión
            </Button>
          )}
          <Button onClick={onClose} variant="outline">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
