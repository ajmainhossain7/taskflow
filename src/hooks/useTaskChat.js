/**
 * src/hooks/useTaskChat.js
 *
 * Custom React hook wrapping the Vercel AI SDK v7 useChat hook.
 * Pre-configures the chat API route and automatically passes the current
 * todo list snapshot in the request body for task-aware suggestions.
 */

import { useChat } from '@ai-sdk/react';

/**
 * Hook to manage taskflow chat state.
 *
 * @param {Array} todos - The live todo items from useTodos()
 */
export default function useTaskChat(todos) {
  return useChat({
    api: '/api/chat',
    // Inject current todos context inside the request body on every message submission
    body: { todos },
  });
}
