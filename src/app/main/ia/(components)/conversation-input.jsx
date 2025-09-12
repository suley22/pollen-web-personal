"use client";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ConversationInput({ className, sendAction }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (messageData) => {
    // messageData es un objeto con { text, files }
    sendAction(messageData.text);
    setMessage("");
  };

  return (
    <PromptInput onSubmit={handleSubmit} className={cn("relative", className)}>
      <PromptInputBody>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
        <PromptInputTextarea
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
      </PromptInputBody>
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
        </PromptInputTools>
        <PromptInputSubmit disabled={message.length === 0} status="ready" />
      </PromptInputToolbar>
    </PromptInput>
  );
}
