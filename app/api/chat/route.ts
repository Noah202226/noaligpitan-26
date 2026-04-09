import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const model = google("gemini-2.5-flash");
const openaiModel = openai("gpt-4.1-nano");
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. Extract the prompt/messages from the request body
    const { prompt } = await req.json();

    // 2. Generate text using the model
    const { text } = await generateText({
      model: model,
      prompt: prompt || "Hello!",
    });

    // 3. Return the JSON response
    return Response.json({ text });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
