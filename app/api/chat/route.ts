import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { getAiKnowledgeBase } from "@/app/lib/data";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const coreMessages = await convertToModelMessages(messages);
    const systemPrompt = `You are an expert AI representative for Noa V. Ligpitan,
               Use the following verified knowledge base to answer queries:
               ${getAiKnowledgeBase()}.
                answer all prompt/message/inquiry using my data, not as an AI LLM, Dont answer like this: 'As an AI, I don't have personal certificates. `;

    // Define your model priority list
    const models = [
      google("gemini-2.5-flash"), // Fallback 2
      openai("gpt-5-chat-latest"), // Fallback 1
    ];

    let lastError;

    // const MY_DATA = `
    //               # IDENTITY & VALUE PROPOSITION
    //               - Name: Noa Ligpitan
    //               - Role: Full-Stack Developer & Business Automation Architect
    //               - Experience: 7+ years of professional technical experience
    //               - Summary: Expert in transforming manual, friction-heavy business workflows into scalable, automated digital systems. Specialized in custom CMS development and AI-driven efficiency.

    //               # CORE TECHNICAL STACK
    //               - Frontend: ReactJS, NextJS (Intermediate), DaisyUI, Schadcn, ElectronJS
    //               - Backend: Node.js, Express, FastAPI, Flask, Laravel
    //               - Database/BaaS: MongoDB, Appwrite
    //               - Automation & AI: n8n (Advanced), Gemini, Chatgpt, Google Drive API Integration
    //               - Workflow Tools: GIT/GitHub, Clerk, Monday.com

    //               # KEY PROJECTS & BUSINESS IMPACT
    //               - Practice Management Engine: Developed a desktop solution using ElectronJS and MongoDB that digitized dental patient histories and payment tracking, directly reducing manual bookkeeping hours.
    //               - RAKAPE & LuckyZDelicacies: Engineered full-stack e-commerce and CMS platforms using NextJS and Appwrite, featuring real-time menu management and automated order processing.
    //               - Infrastructure & Support: Currently maintaining regional network infrastructure for DPWH Region 4A, ensuring 100% operational uptime for high-performance systems.

    //               # PROFESSIONAL PHILOSOPHY
    //               Noa focuses on "Solving Complex Chaos." He doesn't just write code; he architects solutions that eliminate business friction and increase revenue through smart automation.
    //               `;

    // Iterate through models if the previous one fails
    for (const model of models) {
      try {
        const result = await streamText({
          model: model,
          system: systemPrompt,
          messages: coreMessages,
          // Set short retry limits so it switches faster if a limit is hit
          maxRetries: 0,
        });

        return result.toUIMessageStreamResponse();
      } catch (error: any) {
        lastError = error;

        // Check if error is a rate limit (429) or overload (503)
        const isRateLimit = error?.status === 429 || error?.statusCode === 429;
        const isOverloaded = error?.status === 503 || error?.statusCode === 503;

        if (isRateLimit || isOverloaded) {
          console.warn(
            `Switching model due to: ${error.status}. Trying next provider...`,
          );
          continue; // Move to the next model in the array
        }

        // If it's a different kind of error (like a 400), throw it immediately
        throw error;
      }
    }

    throw lastError;
  } catch (error) {
    console.error("All models exhausted or critical error:", error);
    return Response.json({ error: "SYSTEM_OFFLINE" }, { status: 500 });
  }
}
