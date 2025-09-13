"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { JSX } from "react";
import { Image } from "@/components/ai-elements/image";

import EmptyState from "./(components)/empty-state";
import ConversationInput from "./(components)/conversation-input";
import { useChatMessages } from "./(hooks)/useChatMessages";
import { Loader } from "@/components/ai-elements/loader";
import { Alert } from "@/components/ui/alert";

export default function IA(): JSX.Element {
  const { messages, isLoading, error, handleSubmit } = useChatMessages();

  return (
    <div className="flex flex-col flex-1">
      <Conversation className="flex flex-col flex-1 w-[800px]">
        <div className="flex flex-col flex-1 bg-gray-200">
          <ConversationContent className="">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              messages.map((message) => (
                <div key={message.id}>
                  <Message from={message.role} className="">
                    <MessageContent className="" variant="">
                      {message.content}
                    </MessageContent>
                  </Message>

                  {message.image && (
                    <Image
                      base64={message.image.base64Data}
                      uint8Array={new Uint8Array([])}
                      mediaType="image/jpeg"
                      alt="Imagen generada por IA"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              ))
            )}
            {isLoading && <Loader className="p-4" />}
          </ConversationContent>

          {error && (
            <div className="px-4">
              <Alert title="Error" description={error} type="error" />
            </div>
          )}

          <ConversationScrollButton className="" />

          <div className="p-4">
            <ConversationInput
              sendAction={handleSubmit}
              disabled={false}
              className=""
              status="ready"
            />
          </div>
        </div>
      </Conversation>
    </div>
  );
}
