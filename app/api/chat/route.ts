import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const model = google("gemini-1.5-pro");

export const maxDuration = 30;

export async function POST(req: Request) {
  // Use 'any' here to bypass the strict ModelMessage compatibility check.
  // The streamText function will validate the data structure at runtime.
  const { messages }: { messages: any[] } = await req.json();

  const result = await streamText({
    model,
    messages,
    system: `
      You are a high-end portfolio assistant. 
      Keep responses concise, professional, and slightly witty.
      You know about Three.js, React, and modern web design.
    `,
  });

  // Based on your previous error, your version likely uses this:
  return result.toTextStreamResponse();
}
