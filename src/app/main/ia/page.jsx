"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { useState } from "react";

import EmptyState from "./(components)/empty-state";
import MessageList from "./(components)/message-list";
import ConversationInput from "./(components)/conversation-input";

const initialMessages = [
  {
    id: "1",
    from: "user",
    content: "Hello, how are you?",
  },
  {
    id: "2",
    from: "user2",
    content: "I am good, thank you!",
  },
];

export default function IA() {
  const [messages, setMessages] = useState(initialMessages);

  const sendAction = (message) => {
    console.log("Sending message:", message);
    setMessages([
      ...messages,
      { id: `${messages.length + 1}`, from: "user", content: message },
      {
        id: `${messages.length + 2}`,
        from: "assistant",
        content: "Hola ! ¿Cómo te puedo ayudar?",
      },
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
              <MessageList messages={messages} />
            )}
          </ConversationContent>
          <ConversationScrollButton />

          <div className="p-4">
            <ConversationInput sendAction={sendAction} />
          </div>
        </div>
      </Conversation>
    </div>
  );
}
