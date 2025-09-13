import { AiChatMessage } from "./AiChatMessage";

export interface ChatMessagesState {
  messages: AiChatMessage[];
  isLoading: boolean;
  error: string | null;
  handleSubmit: (message: string) => Promise<void>;
  clearMessages: () => void;
}
