"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/buttons/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import {
  useCalendlyEventTypes,
  createSingleUseSchedulingLink,
} from "../_services/calendly-service";
//import { useToastNotifications } from "@/hooks/useToastNotifications";

export function CreateSingleUseLinkDialog({ isOpen, onClose }) {
  const [selectedEventType, setSelectedEventType] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { data: eventTypes, isLoading: isLoadingEventTypes } =
    useCalendlyEventTypes();
  //const { showToast } = useToastNotifications();

  const handleGenerateLink = async () => {
    if (!selectedEventType) {
      //showToast("Please select an event type", "error");
      return;
    }

    setIsGenerating(true);
    try {
      const link = await createSingleUseSchedulingLink(selectedEventType);
      setGeneratedLink(link.booking_url);
      setShowPreview(true); // Abrir preview automáticamente
    } catch (error) {
      console.error("Error generating link:", error);
    } finally {
      setIsGenerating(false);
    }
  };



  const handleClose = () => {
    setSelectedEventType("");
    setGeneratedLink("");
    setShowPreview(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={showPreview ? "sm:max-w-[95vw] h-[95vh]" : "sm:max-w-[600px]"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Create Single-Use Scheduling Link
          </DialogTitle>
          <DialogDescription>
            Generate a unique link that can only be used once to schedule an
            event. Perfect for sending personalized invitations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-type">Select Event Type</Label>
            <Select
              value={selectedEventType}
              onValueChange={setSelectedEventType}
              disabled={isLoadingEventTypes || !!generatedLink}
            >
              <SelectTrigger id="event-type">
                <SelectValue placeholder="Choose an event type..." />
              </SelectTrigger>
              <SelectContent>
                {isLoadingEventTypes ? (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    Loading event types...
                  </div>
                ) : eventTypes && eventTypes.length > 0 ? (
                  eventTypes.map((eventType) => (
                    <SelectItem key={eventType.uri} value={eventType.uri}>
                      <div className="flex flex-col">
                        <span className="font-medium">{eventType.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {eventType.duration} min
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    No event types found
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {generatedLink && showPreview && (
            <div className="space-y-2 h-full">
              <Label>Calendly Scheduling Widget (Single-Use Link)</Label>
              <div className="relative w-full bg-white rounded-lg border border-border overflow-hidden" style={{ height: "calc(95vh - 200px)" }}>
                <iframe
                  src={generatedLink}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Calendly Scheduling Widget"
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                ⚠️ This link will expire after being used once or if the event is scheduled.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          {generatedLink && showPreview ? (
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          ) : !generatedLink ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleGenerateLink}
                disabled={!selectedEventType || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Generate Link
                  </>
                )}
              </Button>
            </>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
