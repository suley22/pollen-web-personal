"use client";

import { useQuery } from "@tanstack/react-query";

export interface CalendlyEvent {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  event_type: string;
  location?: {
    type: string;
    location?: string;
    join_url?: string;
  };
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
  created_at: string;
  updated_at: string;
  event_memberships?: Array<{
    user: string;
    user_email?: string;
  }>;
  event_guests?: Array<{
    email: string;
    created_at: string;
  }>;
}

export interface EventsFilters {
  searchTerm?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface EventsPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  from: number;
  to: number;
}

const eventsQueryKey = "calendly-events";

// Función para obtener eventos de Calendly
async function fetchCalendlyEvents(filters: EventsFilters) {
  const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN;
  const CALENDLY_USER_URI = process.env.NEXT_PUBLIC_CALENDLY_USER_URI;

  if (!CALENDLY_API_TOKEN || !CALENDLY_USER_URI) {
    throw new Error("Calendly API token or User URI not configured");
  }

  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const count = pageSize;

  // Validar que el USER_URI tenga el formato correcto
  if (!CALENDLY_USER_URI.startsWith("https://api.calendly.com/users/")) {
    throw new Error(
      "Invalid Calendly User URI format. Should be: https://api.calendly.com/users/YOUR_UUID",
    );
  }

  // Construir URL con parámetros manualmente para evitar doble codificación del user URI
  const queryParams = [
    `user=${encodeURIComponent(CALENDLY_USER_URI)}`,
    `count=${count}`,
    //`status=${filters.status || "active"}`,
    `sort=start_time:desc`,
    //`invitee_email=quaringonzalo@gmail.com`,
  ];

  // Si hay búsqueda, agregar el término (nota: Calendly API tiene limitaciones de búsqueda)
  if (filters.searchTerm) {
    // Calendly no soporta búsqueda directa, tendremos que filtrar del lado del cliente
  }

  const url = `https://api.calendly.com/scheduled_events?${queryParams.join("&")}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch Calendly events");
  }

  const data = await response.json();
  let events = data.collection || [];

  // Filtrar por término de búsqueda del lado del cliente si existe
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    events = events.filter(
      (event: CalendlyEvent) =>
        event.name.toLowerCase().includes(searchLower) ||
        event.event_type.toLowerCase().includes(searchLower),
    );
  }

  // Paginación manual
  const totalItems = events.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedEvents = events.slice(startIndex, endIndex);

  return {
    events: paginatedEvents,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      from: startIndex + 1,
      to: Math.min(endIndex, totalItems),
    },
    pagination_info: data.pagination,
  };
}

// React Query Hook para obtener lista de eventos
export function useCalendlyEvents(filters: EventsFilters) {
  return useQuery({
    queryKey: [eventsQueryKey, "list", filters],
    queryFn: () => fetchCalendlyEvents(filters),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });
}

// Hook para obtener detalles de un evento específico
export function useCalendlyEventDetails(eventUri: string) {
  return useQuery({
    queryKey: [eventsQueryKey, "details", eventUri],
    queryFn: async () => {
      const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN;

      if (!CALENDLY_API_TOKEN) {
        throw new Error("Calendly API token not configured");
      }

      console.log(eventUri);

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
    },
    enabled: !!eventUri,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook para obtener invitados de un evento
export function useCalendlyEventInvitees(eventUri: string) {
  return useQuery({
    queryKey: [eventsQueryKey, "invitees", eventUri],
    queryFn: async () => {
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
    },
    enabled: !!eventUri,
    staleTime: 1000 * 60 * 5,
  });
}

// Interface para Event Types
export interface CalendlyEventType {
  uri: string;
  name: string;
  active: boolean;
  slug: string;
  scheduling_url: string;
  duration: number;
  kind: string;
  pooling_type: string;
  type: string;
  color: string;
  created_at: string;
  updated_at: string;
  internal_note?: string;
  description_plain?: string;
  description_html?: string;
}

// Hook para obtener los Event Types (plantillas de eventos)
export function useCalendlyEventTypes() {
  return useQuery({
    queryKey: [eventsQueryKey, "event-types"],
    queryFn: async () => {
      const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN;
      const CALENDLY_USER_URI = process.env.NEXT_PUBLIC_CALENDLY_USER_URI;

      if (!CALENDLY_API_TOKEN || !CALENDLY_USER_URI) {
        throw new Error("Calendly API token or User URI not configured");
      }

      const queryParams = [
        `user=${encodeURIComponent(CALENDLY_USER_URI)}`,
        `count=100`,
        `active=true`,
      ];

      const url = `https://api.calendly.com/event_types?${queryParams.join("&")}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch event types");
      }

      const data = await response.json();
      return data.collection || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: 2,
  });
}

// Interface para Single-Use Scheduling Link
export interface SingleUseSchedulingLinkPayload {
  max_event_count: 1; // Siempre 1 para links de un solo uso
  owner: string; // URI del usuario (CALENDLY_USER_URI)
  owner_type: "EventType" | "User";
}

export interface SingleUseSchedulingLink {
  booking_url: string;
  created_at: string;
  owner: string;
  owner_type: string;
}

// Función para crear un link de un solo uso
export async function createSingleUseSchedulingLink(
  eventTypeUri: string,
  additionalParams?: Record<string, string>,
): Promise<SingleUseSchedulingLink> {
  const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN;
  const CALENDLY_USER_URI = process.env.NEXT_PUBLIC_CALENDLY_USER_URI;

  if (!CALENDLY_API_TOKEN || !CALENDLY_USER_URI) {
    throw new Error("Calendly API token or User URI not configured");
  }

  const payload: SingleUseSchedulingLinkPayload = {
    max_event_count: 1,
    owner: eventTypeUri,
    owner_type: "EventType",
  };

  const response = await fetch("https://api.calendly.com/scheduling_links", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Failed to create single-use scheduling link",
    );
  }

  const data = await response.json();

  // Agregar parámetros adicionales al link si se proporcionan
  const bookingUrl = new URL(data.resource.booking_url);

  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      bookingUrl.searchParams.append(key, value);
    });
  }

  return {
    ...data.resource,
    booking_url: bookingUrl.toString(),
  };
}
