"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { EventCard } from "./event-card";
import { EventDetailsDialog } from "./event-details-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

const STATUS_OPTIONS = [
  { id: "1", name: "Active", value: "active" },
  { id: "2", name: "Canceled", value: "canceled" },
];

export function EventsList({
  events,
  loading,
  pagination,
  handlePageChange,
  handlePageSizeChange,
  statusFilter,
  handleStatusChange,
  handleRefresh,
}) {
  const [selectedEventUri, setSelectedEventUri] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleEventClick = (eventUri) => {
    setSelectedEventUri(eventUri);
    setIsDetailsDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsDialogOpen(false);
    setSelectedEventUri(null);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500 flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Loading events...
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
        <div className="max-w-md text-center">
          <p className="text-gray-700 text-lg font-medium mb-2">
            No hay eventos programados
          </p>
          <p className="text-gray-500 text-sm mb-1">
            Los eventos aparecerán aquí cuando alguien agende una reunión contigo.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            Usa el botón &quot;Agendar Evento&quot; arriba para crear una nueva reunión o comparte tu enlace de Calendly para que otros agenden.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header con controles */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <Select
              value={statusFilter}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.id} value={status.value}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Per page:
            </span>
            <Select
              value={pagination?.pageSize?.toString() || "10"}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Información de paginación */}
      {pagination && (
        <div className="text-sm text-gray-600">
          Showing {pagination.from} to {pagination.to} of {pagination.totalItems} events
        </div>
      )}

      {/* Grid de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event.uri} 
            event={event} 
            onClick={() => handleEventClick(event.uri)}
          />
        ))}
      </div>

      {/* Diálogo de detalles */}
      <EventDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={handleCloseDetails}
        eventUri={selectedEventUri}
      />

      {/* Controles de paginación */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Mostrar primera página, última página, y páginas cercanas a la actual
                const current = pagination.currentPage;
                return (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= current - 1 && page <= current + 1)
                );
              })
              .map((page, index, array) => {
                // Agregar ellipsis si hay un salto
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                  <div key={page} className="flex items-center">
                    {showEllipsis && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      onClick={() => handlePageChange(page)}
                      variant={
                        page === pagination.currentPage ? "default" : "outline"
                      }
                      size="sm"
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  </div>
                );
              })}
          </div>

          <Button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
