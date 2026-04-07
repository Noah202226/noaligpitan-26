import { streamText } from "ai";
import { google } from "@ai-sdk/google";

const model = google("gemini-1.5-pro");

export const answerMyQuestion = async (messages: any[]) => {
  const { textStream } = await streamText({
    model,
    messages,
  });

  return textStream;
};

await answerMyQuestion([
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "What is the capital of France?" },
]);
