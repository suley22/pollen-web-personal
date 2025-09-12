"use client";

import { ConversationEmptyState } from "@/components/ai-elements/conversation";
import { MessageSquare } from "lucide-react";

export default function EmptyState() {
  return (
    <ConversationEmptyState
      icon={<MessageSquare className="size-12" />}
      title="No messages yet"
      description="Start a conversation to see messages here"
    />
  );
}
