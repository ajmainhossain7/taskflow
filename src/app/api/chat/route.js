/**
 * src/app/api/chat/route.js
 *
 * Next.js App Router Route Handler for streaming Claude AI completions.
 * Receives the conversation history and current todo context, formats the system
 * prompt, and streams response chunks back to the client.
 */

import { streamText } from 'ai';
import { claudeModel, buildSystemPrompt, MAX_CONTEXT_MESSAGES } from '../../../lib/ai/config';

// Use Node.js runtime for API route
export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { messages, todos } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages must be an array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Trim conversation history to control context window and token usage.
    // Full messages history remains in the browser.
    const contextMessages = messages.slice(-MAX_CONTEXT_MESSAGES);

    // Call streamText from Vercel AI SDK to get a chunked stream
    const result = streamText({
      model: claudeModel,
      system: buildSystemPrompt(todos),
      messages: contextMessages,
    });

    // Return the response as a standard UI message stream (SDK v7)
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('TaskFlow AI Chat Route Error:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred during completion stream. Make sure ANTHROPIC_API_KEY is configured.',
        details: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
