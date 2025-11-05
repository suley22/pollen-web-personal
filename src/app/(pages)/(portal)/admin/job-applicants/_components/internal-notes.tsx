"use client";

import { useState, useEffect } from "react";
import { Pencil, Save, X, FileText } from "lucide-react";
import { Divider } from "@/components/design-system";
import { useUpdateInternalNotes } from "../_services/job-applicants-service";

interface InternalNotesProps {
  applicationId: string;
  initialNotes: string;
  candidateName: string;
}

export function InternalNotes({
  applicationId,
  initialNotes,
  candidateName,
}: InternalNotesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(initialNotes || "");
  const [tempNotes, setTempNotes] = useState(initialNotes || "");

  const updateNotesMutation = useUpdateInternalNotes();

  // Update local state when initialNotes changes (e.g., when switching candidates)
  useEffect(() => {
    setNotes(initialNotes || "");
    setTempNotes(initialNotes || "");
    setIsEditing(false);
  }, [initialNotes, applicationId]);

  const handleEdit = () => {
    setTempNotes(notes);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempNotes(notes);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await updateNotesMutation.mutateAsync({
        applicationId,
        internalNotes: tempNotes,
      });
      setNotes(tempNotes);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving notes:", error);
      // Optionally show error toast notification
    }
  };

  const hasNotes = notes && notes.trim().length > 0;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Internal Notes
            </h3>
            <p className="text-xs text-gray-600">
              Private notes about {candidateName}
            </p>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 text-sm font-medium"
            disabled={updateNotesMutation.isPending}
          >
            <Pencil className="w-4 h-4" />
            {hasNotes ? "Edit" : "Add Notes"}
          </button>
        )}
      </div>

      <div className="my-3 border-t border-amber-200" />

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={tempNotes}
            onChange={(e) => setTempNotes(e.target.value)}
            placeholder="Add private notes about this candidate's application, interview performance, or other relevant information..."
            className="w-full min-h-[150px] p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-vertical text-sm bg-white"
            autoFocus
          />

          <div className="flex items-center justify-between">
            <p className="text-xs text-amber-700">
              <span className="font-medium">Note:</span> These notes are only
              visible to admins and will not be shared with the candidate.
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={updateNotesMutation.isPending}
                className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={updateNotesMutation.isPending}
                className="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateNotesMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Notes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {hasNotes ? (
            <div className="bg-white border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {notes}
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-2">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-sm text-gray-500">No internal notes yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Click &quot;Add Notes&quot; to start documenting information
                about this candidate
              </p>
            </div>
          )}

          {hasNotes && (
            <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
              <span>🔒</span>
              <p>These notes are private and only visible to admins</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
