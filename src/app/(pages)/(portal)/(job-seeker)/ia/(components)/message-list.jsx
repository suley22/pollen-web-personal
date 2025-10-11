"use client";

import { Message, MessageContent } from "@/app/components/ai-elements/message";

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message) => (
        <Message from={message.from} key={message.id}>
          <MessageContent>
            {typeof message.content === "string"
              ? message.content
              : message.content?.text || JSON.stringify(message.content)}
          </MessageContent>
        </Message>
      ))}
    </div>
  );
}
