"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUB_STATUS_OPTIONS = [
  "Under Review",
  "Invited to Pollen Interview",
  "Pollen Interview Complete",
  "Interview Requested",
  "Interview Booked",
  "Interview Complete",
  "Awaiting Employer",
  "Offer Issued",
  "Hired",
  "Not Progressing",
];

export function TaskDrawer({ isOpen, jobSeeker, onClose }) {
  const [subStatus, setSubStatus] = useState(jobSeeker?.sub_status || "");

  // Actualizar substatus cuando cambie el jobSeeker
  useEffect(() => {
    if (jobSeeker?.sub_status) {
      setSubStatus(jobSeeker.sub_status);
    }
  }, [jobSeeker]);

  const handleSubStatusChange = (newSubStatus: string) => {
    setSubStatus(newSubStatus);
    // TODO: Aquí se debe implementar la lógica para actualizar el substatus en la BD
    console.log("Substatus changed to:", newSubStatus);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-screen-lg bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="text-xl font-bold">
              {jobSeeker.name} - Assessment
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {jobSeeker && (
              <div className="flex flex-col gap-6">
                {/* Status */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Status
                  </label>
                  <div className="mt-2">
                    <span
                      className={`${jobSeeker.statusColor} text-white text-xs px-2 py-1 rounded-full`}
                    >
                      {jobSeeker.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Placeholder for future fields */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 italic">
                    More details will be added here in the future...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
