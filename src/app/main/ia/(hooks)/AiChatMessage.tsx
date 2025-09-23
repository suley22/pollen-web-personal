import { GeneratedFile } from "ai";

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  image: GeneratedFile | null;
}
