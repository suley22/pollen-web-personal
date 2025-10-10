import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { v4 as uuidv4 } from "uuid";
import { AiChatMessage } from "../../(hooks)/AiChatMessage";
import { experimental_generateImage as generateImage } from "ai";

const SYSTEM_MESSAGE_PROMPT = `Genera un prompt para ilustrar una imagen sin derechos de autor. 

El prompt debe ser corto y directo.

Input: [INPUT]
`;

export async function POST(req: Request) {
  const { message } = await req.json();

  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    system: SYSTEM_MESSAGE_PROMPT.replace("[INPUT]", message),
    prompt: message,
  });

  const { image } = await generateImage({
    model: openai.image("dall-e-3"),
    prompt: text,
  });

  const response: AiChatMessage = {
    id: uuidv4(),
    role: "assistant",
    content: text,
    image: image,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
