/**
 * src/hooks/useTaskChat.js
 *
 * Custom React hook wrapping the Vercel AI SDK v7 useChat hook.
 *
 * In AI SDK v7, useChat no longer manages input state internally.
 * This hook wrapper maintains the input state locally to preserve the same
 * signature (input, handleInputChange, handleSubmit, isLoading) expected by the UI.
 */

import { useState, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';

/**
 * Hook to manage taskflow chat state.
 *
 * @param {Array} todos - The live todo items from useTodos()
 */
export default function useTaskChat(todos) {
  const [input, setInput] = useState('');

  const chat = useChat({
    api: '/api/chat',
    // Fallback default body context
    body: { todos },
  });

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const trimmed = input.trim();
    if (!trimmed) return;

    // Reset input field first (UX responsiveness)
    setInput('');

    try {
      // Call sendMessage programmatically and pass the latest todos in the body request
      await chat.sendMessage(
        {
          role: 'user',
          content: trimmed,
        },
        {
          body: { todos },
        }
      );
    } catch (err) {
      console.error('useTaskChat: Failed to send message.', err);
    }
  }, [input, chat, todos]);

  // Map v7 status to isLoading helper expected by components
  const isLoading = chat.status === 'submitted' || chat.status === 'streaming';

  return {
    ...chat,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
