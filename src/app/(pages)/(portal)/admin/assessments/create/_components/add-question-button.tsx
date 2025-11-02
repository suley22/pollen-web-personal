"use client";

import { useState } from "react";
import { Plus, ListChecks, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { QuestionType } from "@/types/assessment-question";
import { SecondaryButton } from "@/components/design-system";

interface AddQuestionButtonProps {
  onSelectType: (type: QuestionType) => void;
  disabled?: boolean;
}

export function AddQuestionButton({
  onSelectType,
  disabled = false,
}: AddQuestionButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex">
          <SecondaryButton
            disabled={disabled}
            className="w-full"
            icon={<Plus className="h-5 w-5 mr-2" />}
            text="Add Question"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => onSelectType("multiple_choice")}>
          <ListChecks className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">Multiple Choice</span>
            <span className="text-xs text-muted-foreground">
              Question with predefined options
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectType("free_input")}>
          <FileText className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">Free Input</span>
            <span className="text-xs text-muted-foreground">
              Open-ended text response
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectType("file_upload")}>
          <Upload className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">File Upload</span>
            <span className="text-xs text-muted-foreground">
              Upload documents or files
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
