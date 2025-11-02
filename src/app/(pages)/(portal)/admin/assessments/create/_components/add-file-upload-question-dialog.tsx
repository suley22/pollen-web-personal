"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/design-system";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { AssessmentQuestion } from "@/types/assessment-question";

interface AddFileUploadQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (question: Omit<AssessmentQuestion, "id">) => void;
  editingQuestion?: AssessmentQuestion | null;
}

const COMMON_FILE_TYPES = [
  { value: ".pdf", label: "PDF" },
  { value: ".doc,.docx", label: "Word Documents" },
  { value: ".xls,.xlsx", label: "Excel Spreadsheets" },
  { value: ".jpg,.jpeg,.png", label: "Images" },
  { value: ".zip,.rar", label: "Compressed Files" },
];

export function AddFileUploadQuestionDialog({
  open,
  onOpenChange,
  onSave,
  editingQuestion,
}: AddFileUploadQuestionDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxFileSize, setMaxFileSize] = useState<number>(10);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);

  // Reset form when dialog opens/closes or when editing question changes
  useEffect(() => {
    if (open) {
      if (editingQuestion) {
        setTitle(editingQuestion.title);
        setDescription(editingQuestion.description);
        setMaxFileSize(editingQuestion.max_file_size || 10);
        setSelectedFileTypes(editingQuestion.accepted_file_types || []);
      } else {
        setTitle("");
        setDescription("");
        setMaxFileSize(10);
        setSelectedFileTypes([]);
      }
    }
  }, [open, editingQuestion]);

  const handleToggleFileType = (value: string) => {
    if (selectedFileTypes.includes(value)) {
      setSelectedFileTypes(selectedFileTypes.filter((t) => t !== value));
    } else {
      setSelectedFileTypes([...selectedFileTypes, value]);
    }
  };

  const handleSave = () => {
    const question: Omit<AssessmentQuestion, "id"> = {
      type: "file_upload",
      title,
      description,
      max_file_size: maxFileSize,
      accepted_file_types:
        selectedFileTypes.length > 0 ? selectedFileTypes : undefined,
    };
    onSave(question);
    onOpenChange(false);
  };

  const canSave = title.trim() && description.trim() && maxFileSize > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingQuestion ? "Edit" : "Add"} File Upload Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Question Title */}
          <div className="space-y-2">
            <Label className="" htmlFor="title">
              Question Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter question title"
            />
          </div>

          {/* Question Description */}
          <div className="space-y-2">
            <Label className="" htmlFor="description">
              Question Description *
            </Label>
            <Textarea
              className=""
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter question description"
              rows={3}
            />
          </div>

          {/* Max File Size */}
          <div className="space-y-2">
            <Label className="" htmlFor="maxSize">
              Maximum File Size (MB) *
            </Label>
            <Input
              id="maxSize"
              type="number"
              value={maxFileSize}
              onChange={(e) => setMaxFileSize(Number(e.target.value))}
              placeholder="10"
              min={1}
              max={100}
            />
            <p className="text-xs text-muted-foreground">
              Maximum file size in megabytes (1-100 MB)
            </p>
          </div>

          {/* Accepted File Types */}
          <div className="space-y-2">
            <Label className="">Accepted File Types (Optional)</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Select file types to restrict uploads. Leave empty to accept all
              files.
            </p>
            <div className="space-y-2">
              {COMMON_FILE_TYPES.map((fileType) => (
                <div
                  key={fileType.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={fileType.value}
                    checked={selectedFileTypes.includes(fileType.value)}
                    onCheckedChange={() => handleToggleFileType(fileType.value)}
                  />
                  <Label className="cursor-pointer" htmlFor={fileType.value}>
                    {fileType.label}{" "}
                    <span className="text-muted-foreground">
                      ({fileType.value})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            size="default"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave} size="default">
            {editingQuestion ? "Update" : "Add"} Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
