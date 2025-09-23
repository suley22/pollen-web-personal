import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiChatMessage } from "./AiChatMessage";
import { ChatMessagesState } from "./ChatMessagesState";

export function useChatMessages(): ChatMessagesState {
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (message: string) => {
    const hasText = Boolean(message);

    if (!hasText || isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);

    const userMessage: AiChatMessage = {
      id: uuidv4(),
      role: "user",
      content: message,
      image: null,
    };

    const messageHistory: AiChatMessage[] = [...messages, userMessage];

    setMessages(messageHistory);

    const response: AiChatMessage | null = await sendMessageService(message);

    if (!response) {
      setError("Error sending message");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setMessages([...messageHistory, response]);
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    handleSubmit,
    isLoading,
    error,
    clearMessages,
  };
}

async function sendMessageService(
  message: string,
): Promise<AiChatMessage | null> {
  try {
    const response = await fetch("/main/ia/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    return response.ok ? await response.json() : null;
  } catch (error) {
    return null;
  }
}
