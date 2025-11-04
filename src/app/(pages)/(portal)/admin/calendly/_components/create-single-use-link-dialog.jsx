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
import { Copy, Check, Link as LinkIcon, Loader2 } from "lucide-react";
import {
  useCalendlyEventTypes,
  createSingleUseSchedulingLink,
} from "../_services/calendly-service";
//import { useToastNotifications } from "@/hooks/useToastNotifications";

export function CreateSingleUseLinkDialog({ isOpen, onClose }) {
  const [selectedEventType, setSelectedEventType] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
    } catch (error) {
      console.error("Error generating link:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setIsCopied(true);
      //showToast("Link copied to clipboard!", "success");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // showToast("Failed to copy link", "error");
    }
  };

  const handleClose = () => {
    setSelectedEventType("");
    setGeneratedLink("");
    setIsCopied(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
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

          {generatedLink && (
            <div className="space-y-2">
              <Label>Generated Link (Single-Use)</Label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md border border-border text-sm break-all">
                  {generatedLink}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                ⚠️ This link will expire after being used once or if the event
                is scheduled.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          {generatedLink ? (
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          ) : (
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
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
