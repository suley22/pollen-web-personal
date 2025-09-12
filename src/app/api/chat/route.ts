import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const { message } = await req.json();

  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt: message,
  });

  const response = { id: uuidv4(), role: "assistant", content: text };

  return new Response(
    JSON.stringify({
      responseMessage: response,
      status: 200,
    }),
  );
}
