"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import EmptyState from "./(components)/empty-state";
import ConversationInput from "./(components)/conversation-input";

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

    const messageHistory = [
      ...messages,
      { id: uuidv4(), role: "user", content: message },
    ];

    setMessages(messageHistory);

    const data = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const { responseMessage, status } = await data.json();

    if (status === 200) {
      setMessages([...messageHistory, responseMessage]);
    } else {
      console.error("Error sending message", status);
    }
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
                <Message from={message.role} key={message.content}>
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
