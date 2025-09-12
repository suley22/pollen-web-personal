import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function sendMessage(message) {
  const { response } = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt: message,
    apiKey: process.env.OPENAI_API_KEY,
  });

  return response;
}
