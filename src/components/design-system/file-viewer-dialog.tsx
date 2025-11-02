"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, X } from "lucide-react";
import { SecondaryButton } from "./primary-button";

interface FileViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: {
    name: string;
    fileName: string;
    url?: string;
    file?: File | null;
  } | null;
}

export function FileViewerDialog({
  open,
  onOpenChange,
  file,
}: FileViewerDialogProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    if (file) {
      // If it's a local file, create an object URL
      if (file.file) {
        const url = URL.createObjectURL(file.file);
        setFileUrl(url);
        setFileType(file.file.type);

        // Cleanup function to revoke the URL
        return () => {
          URL.revokeObjectURL(url);
        };
      }
      // If it's a remote file with URL
      else if (file.url) {
        setFileUrl(file.url);
        // Try to determine file type from extension
        const extension = file.fileName.split(".").pop()?.toLowerCase();
        const typeMap: Record<string, string> = {
          pdf: "application/pdf",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          gif: "image/gif",
          svg: "image/svg+xml",
          txt: "text/plain",
          doc: "application/msword",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          xls: "application/vnd.ms-excel",
          xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        };
        setFileType(typeMap[extension || ""] || "");
      }
    } else {
      setFileUrl(null);
      setFileType("");
    }
  }, [file]);

  const handleDownload = () => {
    if (!fileUrl || !file) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderFilePreview = () => {
    if (!fileUrl) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No file to display</p>
        </div>
      );
    }

    // PDF files
    if (fileType === "application/pdf") {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full rounded-lg"
          title={file?.fileName}
        />
      );
    }

    // Image files
    if (fileType.startsWith("image/")) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fileUrl}
            alt={file?.fileName}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      );
    }

    // Text files
    if (fileType.startsWith("text/")) {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full rounded-lg bg-white dark:bg-gray-900"
          title={file?.fileName}
        />
      );
    }

    // For other file types, show a download option
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <FileText className="h-16 w-16 text-muted-foreground" />
        <p className="text-lg font-medium">{file?.fileName}</p>
        <p className="text-sm text-muted-foreground">
          Preview not available for this file type
        </p>
        <Button onClick={handleDownload} size="default" className="mt-4">
          <Download className="h-4 w-4 mr-2" />
          Download File
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] flex flex-col p-0 [&>button]:hidden">
        <div className="flex flex-col h-full px-5 py-3">
          <DialogHeader className="border-b pb-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <DialogTitle className="truncate">{file?.name}</DialogTitle>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {file?.fileName}
                </p>
              </div>
              <SecondaryButton
                text="Close"
                icon={<X className="h-4 w-4" />}
                onClick={() => onOpenChange(false)}
              />
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">{renderFilePreview()}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
