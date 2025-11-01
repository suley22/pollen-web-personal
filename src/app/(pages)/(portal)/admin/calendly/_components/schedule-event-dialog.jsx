"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/buttons/button";
import { Calendar, Clock, ExternalLink, Copy, Check } from "lucide-react";
import { useCalendlyEventTypes } from "../_services/calendly-service";

export function ScheduleEventDialog({ isOpen, onClose }) {
  const { data: eventTypes, isLoading } = useCalendlyEventTypes();
  const [copiedUrl, setCopiedUrl] = useState(null);

  const handleCopyLink = async (url, eventTypeId) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(eventTypeId);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleOpenScheduling = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agendar Nuevo Evento</DialogTitle>
          <DialogDescription>
            Selecciona el tipo de evento que deseas agendar
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Cargando tipos de eventos...</div>
            </div>
          ) : !eventTypes || eventTypes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay tipos de eventos disponibles</p>
            </div>
          ) : (
            <div className="space-y-3">
              {eventTypes.map((eventType) => (
                <div
                  key={eventType.uri}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {eventType.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(eventType.duration)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span className="capitalize">{eventType.kind}</span>
                        </div>
                      </div>
                    </div>
                    {eventType.color && (
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: eventType.color }}
                      />
                    )}
                  </div>

                  {eventType.description_plain && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {eventType.description_plain}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleOpenScheduling(eventType.scheduling_url)}
                      className="flex-1"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Abrir Calendario
                    </Button>
                    <Button
                      onClick={() =>
                        handleCopyLink(eventType.scheduling_url, eventType.uri)
                      }
                      variant="outline"
                      size="sm"
                    >
                      {copiedUrl === eventType.uri ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Link
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-2">
                    <a
                      href={eventType.scheduling_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 break-all"
                    >
                      {eventType.scheduling_url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
