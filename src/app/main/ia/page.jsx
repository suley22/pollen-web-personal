"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";

import { useEffect, useState } from "react";

import EmptyState from "./(components)/empty-state";
import ConversationInput from "./(components)/conversation-input";
import { sendMessage } from "./action";

export default function IA() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  const handleSubmit = async (message) => {
    const hasText = Boolean(message);

    if (!hasText) {
      return;
    }

    setMessages([
      ...messages,
      { id: Date.now(), role: "user", content: message },
    ]);
    const response = await sendMessage(message);
    setMessages([
      ...messages,
      { id: Date.now(), role: "assistant", content: response },
    ]);
  };

  return (
    <div className="flex flex-col flex-1">
      <Conversation className="flex flex-col flex-1 w-[800px]">
        <div className="flex flex-col flex-1 bg-gray-200">
          <ConversationContent>
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>{message.content}</MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />

          <div className="p-4">
            <ConversationInput
              sendAction={handleSubmit}
              disabled={false}
              status="ready"
            />
          </div>
        </div>
      </Conversation>
    </div>
  );
}
