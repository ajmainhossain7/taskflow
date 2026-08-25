/**
 * src/components/ChatPanel.jsx
 *
 * A modern, premium glassmorphism slide-over chat interface for TaskFlow AI.
 * Uses Stitch-inspired dark-mode layout tokens and integrates with Vercel AI SDK hooks.
 */

import { useEffect, useRef, useState } from 'react';

// Suggested start prompts to keep empty state engaging and easy to use
const SUGGESTED_PROMPTS = [
  'What should I prioritize today?',
  'Break down my most complex active task.',
  'Give me a strategy to clear my active checklist.',
];

export default function ChatPanel({
  open,
  onClose,
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
}) {
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Focus input when the panel is opened
  useEffect(() => {
    if (open) {
      // Small timeout to allow slide-in animation to finish
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Scroll logic for robust auto-scroll during token stream
  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      setIsAtBottom(true);
    }
  };

  // Monitor scroll movements to release auto-scroll lock if the user scrolls up
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Threshold of 80px to determine if user is close to the bottom
    const threshold = 80;
    const distanceFromBottom = container.scrollHeight - container.clientHeight - container.scrollTop;

    // If close enough to bottom, lock to bottom. Otherwise, release scroll lock.
    if (distanceFromBottom <= threshold) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  // Trigger scroll to bottom on message list updates if scroll lock is active
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isLoading, isAtBottom]);

  // Handle suggested prompt selection
  const handlePromptClick = (promptText) => {
    // Populate hook input manually by raising a mock change event or using wrapper
    const event = { target: { value: promptText } };
    handleInputChange(event);
    
    // Auto-focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle textarea enter to submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((input || '').trim() && !isLoading) {
        handleSubmit(e);
      }
    }
  };

  // Determine if AI is thinking (request sent, but first token not streamed yet)
  const isThinking = isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user';

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 flex h-screen w-full sm:w-[400px] flex-col border-l border-white/10 bg-surface-container-lowest/95 backdrop-blur-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="TaskFlow AI Assistant"
    >
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-white/10 px-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary select-none" style={{ fontSize: '20px' }}>
            auto_awesome
          </span>
          <h2 className="font-sans font-bold text-on-surface text-base">AI Assistant</h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant hover:bg-white/10 hover:text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          aria-label="Close AI chat"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            close
          </span>
        </button>
      </header>

      {/* Messages Scroll View */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 space-y-4 styled-scrollbar"
      >
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex h-full flex-col justify-center text-center space-y-6 py-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/5 text-tertiary">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-on-surface text-base">How can I help you today?</h3>
              <p className="font-sans text-xs text-on-surface-variant mt-1.5 max-w-[280px] mx-auto leading-relaxed">
                I can prioritize checklist items, break down large projects, or help format actions.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2 text-left">
              <p className="font-sans text-xs text-on-surface-variant/70 font-semibold px-2 uppercase tracking-wider">Suggested Actions</p>
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left font-sans text-xs text-on-surface-variant bg-white/[0.03] hover:bg-white/[0.08] hover:text-on-surface border border-white/5 rounded-lg p-3 transition-all cursor-pointer leading-relaxed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Conversation List */
          <div className="space-y-4 pb-4">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div key={message.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm font-sans leading-relaxed break-words whitespace-pre-wrap ${
                      isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
                    }`}
                  >
                    {message.content}
                    
                    {/* Render blinking cursor on AI message during active streaming */}
                    {!isUser && isLoading && message === messages[messages.length - 1] && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-tertiary animate-pulse select-none" style={{ verticalAlign: 'middle' }} />
                    )}
                  </div>
                  {/* Timestamp/Role hint */}
                  <span className="text-[10px] text-on-surface-variant/40 font-mono mt-1 px-1.5">
                    {isUser ? 'You' : 'Assistant'}
                  </span>
                </div>
              );
            })}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex flex-col items-start">
                <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary typing-dot" style={{ animationDelay: '0s' }} />
                  <span className="w-2 h-2 rounded-full bg-tertiary typing-dot" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-tertiary typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-[10px] text-on-surface-variant/40 font-mono mt-1 px-1.5">Thinking</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Jump to latest affordance */}
      {!isAtBottom && isLoading && (
        <div className="flex justify-center -mt-10 mb-2 z-10">
          <button
            onClick={scrollToBottom}
            className="flex items-center gap-1.5 bg-primary/95 text-white font-sans text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-primary/20 hover:opacity-90 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
              arrow_downward
            </span>
            Jump to latest
          </button>
        </div>
      )}

      {/* Footer input form */}
      <footer className="border-t border-white/10 p-4 bg-surface-container-lowest/60">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input || ''}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask AI Assistant..."
              rows={1}
              className="w-full resize-none rounded-lg px-4 py-3 pr-4 font-sans text-sm text-on-surface placeholder-on-surface-variant/40 bg-white/[0.02] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all styled-scrollbar max-h-24 min-h-[44px] flex items-center align-middle"
              aria-label="Chat message"
            />
          </div>

          {isLoading ? (
            /* Stop Button */
            <button
              type="button"
              onClick={stop}
              className="flex-shrink-0 h-11 w-11 flex items-center justify-center bg-error/20 hover:bg-error/30 text-error border border-error/20 rounded-lg active:scale-95 transition-all cursor-pointer"
              aria-label="Stop generation"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                stop_circle
              </span>
            </button>
          ) : (
            /* Send Button */
            <button
              type="submit"
              disabled={!(input || '').trim()}
              className="flex-shrink-0 h-11 w-11 flex items-center justify-center bg-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Send message"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                arrow_upward
              </span>
            </button>
          )}
        </form>
      </footer>
    </div>
  );
}
