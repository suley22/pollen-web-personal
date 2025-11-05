"use client";

import { useState } from "react";
import { PageHeader } from "@/components/design-system/page-header";
import { PageContainer, Filters } from "@/components/design-system";
import { Button } from "@/components/ui/buttons/button";
import { CalendarPlus, Link } from "lucide-react";
import { useCalendlyEventsPage } from "./_hooks/calendly-events-hook";
import { EventsList } from "./_components/events-list";
import { ScheduleEventDialog } from "./_components/schedule-event-dialog";
import { CreateSingleUseLinkDialog } from "./_components/create-single-use-link-dialog";

export default function CalendlyEventsPage() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isCreateLinkDialogOpen, setIsCreateLinkDialogOpen] = useState(false);

  const {
    events,
    loading,
    error,
    pagination,
    statusFilter,
    handlePageChange,
    handlePageSizeChange,
    handleStatusChange,
    handleRefresh,
  } = useCalendlyEventsPage(debouncedSearchTerm);

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Calendly Events"
          subtitle="View and manage your scheduled Calendly events"
        />
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCreateLinkDialogOpen(true)}
            variant="outline"
            size="default"
            className="flex items-center gap-2"
          >
            <Link className="h-5 w-5" />
            Create Single-Use Link
          </Button>
          <Button
            onClick={() => setIsScheduleDialogOpen(true)}
            size="default"
            className="flex items-center gap-2"
          >
            <CalendarPlus className="h-5 w-5" />
            Agendar Evento
          </Button>
        </div>
      </div>

      <Filters
        onSearchChange={setDebouncedSearchTerm}
        searchPlaceholder="Search events by name or type..."
        filters={[]}
      />

      <div className="flex flex-col gap-4">
        <EventsList
          events={events}
          loading={loading}
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          statusFilter={statusFilter}
          handleStatusChange={handleStatusChange}
          handleRefresh={handleRefresh}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <p className="text-red-800 font-medium">Error loading events</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <p className="text-red-500 text-xs mt-2">
            Make sure you have configured NEXT_PUBLIC_CALENDLY_API_TOKEN and
            NEXT_PUBLIC_CALENDLY_USER_URI in your environment variables.
          </p>
        </div>
      )}

      <ScheduleEventDialog
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
      />

      <CreateSingleUseLinkDialog
        isOpen={isCreateLinkDialogOpen}
        onClose={() => setIsCreateLinkDialogOpen(false)}
      />
    </PageContainer>
  );
}