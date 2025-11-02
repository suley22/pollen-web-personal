"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Input,
  TextareaInput,
  Divider,
  PrimaryButton,
  SecondaryButton,
  PageHeader,
  FileViewerDialog,
} from "@/components/design-system";
import { CheckCircle, FileUp, X, Edit2, Link as LinkIcon } from "lucide-react";
import type { AssessmentQuestion } from "@/types/assessment-types";
import { useToastNotifications } from "@/hooks/useToastNotifications";

interface ReferenceFile {
  id: string;
  name: string;
  fileName: string;
  file?: File | null;
}

interface AddFileUploadQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (question: Omit<AssessmentQuestion, "id">) => void;
  editingQuestion?: AssessmentQuestion | null;
}

export function AddFileUploadQuestionDialog({
  open,
  onOpenChange,
  onSave,
  editingQuestion,
}: AddFileUploadQuestionDialogProps) {
  const { showError } = useToastNotifications();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([]);
  const [newFileName, setNewFileName] = useState("");
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState("");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ReferenceFile | null>(null);

  // Maximum file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILE_SIZE_MB = 10;

  // Reset form when dialog opens/closes or when editing question changes
  useEffect(() => {
    if (open) {
      if (editingQuestion) {
        setTitle(editingQuestion.title);
        setSubtitle(editingQuestion.subtitle || "");
        setReferenceFiles(editingQuestion.file_upload?.referenceFiles || []);
      } else {
        setTitle("");
        setSubtitle("");
        setReferenceFiles([]);
      }
      setNewFileName("");
      setEditingFileId(null);
      setEditingFileName("");
    }
  }, [open, editingQuestion]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      showError(
        "File Too Large",
        `The file size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`,
      );
      e.target.value = "";
      return;
    }

    // Use the file name without extension as default display name
    const defaultName = file.name.replace(/\.[^/.]+$/, "");
    const displayName = newFileName.trim() || defaultName;

    const newFile: ReferenceFile = {
      id: `file-${Date.now()}`,
      name: displayName,
      fileName: file.name,
      file: file,
    };

    setReferenceFiles([...referenceFiles, newFile]);
    setNewFileName("");
    e.target.value = ""; // Reset input
  };

  const handleRemoveFile = (id: string) => {
    setReferenceFiles(referenceFiles.filter((file) => file.id !== id));
  };

  const handleStartEditFileName = (file: ReferenceFile) => {
    setEditingFileId(file.id);
    setEditingFileName(file.name);
  };

  const handleSaveFileName = (id: string) => {
    if (editingFileName.trim()) {
      setReferenceFiles(
        referenceFiles.map((file) =>
          file.id === id ? { ...file, name: editingFileName.trim() } : file,
        ),
      );
    }
    setEditingFileId(null);
    setEditingFileName("");
  };

  const handleCancelEditFileName = () => {
    setEditingFileId(null);
    setEditingFileName("");
  };

  const handleViewFile = (file: ReferenceFile) => {
    setSelectedFile(file);
    setViewerOpen(true);
  };

  const handleSave = () => {
    const question: Omit<AssessmentQuestion, "id"> = {
      type: "file_upload",
      title,
      subtitle: subtitle,
      file_upload: {
        referenceFiles: referenceFiles,
      },
    };
    onSave(question);
    onOpenChange(false);
  };

  const canSave = title.trim() !== "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="!w-[50vw] !max-w-[50vw] overflow-y-auto p-6"
      >
        <SheetHeader className="py-0">
          <SheetTitle className="">
            {editingQuestion
              ? "Edit File Upload Question"
              : "Add File Upload Question"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2 items-center text-lg font-medium mt-4">
            <CheckCircle className="h-5 w-5" />
            Question Details
          </div>

          <Divider />

          {/* Question Title */}
          <Input
            label="Question Title *"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the question title"
          />

          {/* Question Subtitle */}
          <TextareaInput
            label="Question Subtitle (Optional)"
            name="subtitle"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Add additional context or instructions for the job seeker..."
            rows={3}
          />

          {/* Reference Files Section */}
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">
                Reference Files (Optional)
              </h4>
              <p className="text-xs text-muted-foreground">
                Files that job seekers can download as reference
              </p>
            </div>

            {/* Add Reference File */}
            <div className="rounded-lg border-2 border-dashed p-4 space-y-3">
              <Input
                label="Display Name for Link"
                name="file_display_name"
                id="file_display_name"
                placeholder="e.g., Challenge Instructions, Template..."
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground -mt-2">
                Optional: If empty, file name will be used
              </p>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="reference_file_input"
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-muted px-4 py-3 hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-2">
                      <FileUp className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        Select File to Upload
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Max {MAX_FILE_SIZE_MB}MB
                    </span>
                  </div>
                  <input
                    type="file"
                    id="reference_file_input"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>

            {/* Reference Files List */}
            {referenceFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Files ({referenceFiles.length})
                </p>
                {referenceFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3"
                  >
                    <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />

                    {editingFileId === file.id ? (
                      <>
                        <input
                          type="text"
                          value={editingFileName}
                          onChange={(e) => setEditingFileName(e.target.value)}
                          className="flex-1 rounded border bg-background px-2 py-1 text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveFileName(file.id)}
                          className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEditFileName}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => handleViewFile(file)}
                            className="text-left w-full group"
                          >
                            <p className="text-sm font-medium truncate text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {file.fileName}
                            </p>
                          </button>
                        </div>
                        <button
                          onClick={() => handleStartEditFileName(file)}
                          className="text-muted-foreground hover:text-foreground"
                          title="Edit display name"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="text-red-500 hover:text-red-600"
                          title="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="mt-6 gap-4">
          <Divider />
          <SecondaryButton text="Cancel" onClick={() => onOpenChange(false)} />
          <PrimaryButton
            text={editingQuestion ? "Update Question" : "Add Question"}
            onClick={handleSave}
            disabled={!canSave}
          />
        </SheetFooter>
      </SheetContent>

      {/* File Viewer Dialog */}
      <FileViewerDialog
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        file={selectedFile}
      />
    </Sheet>
  );
}
