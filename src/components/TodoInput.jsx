"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';

/**
 * TodoInput component — a controlled form for adding new todos.
 *
 * Responsibilities:
 *  - Manage the local draft text via useState.
 *  - Prevent submission of blank / whitespace-only tasks.
 *  - Disable the Add button while the input is empty (visual + semantic guard).
 *  - Call onAdd(trimmedText) on valid submit, then clear the field.
 *  - Accept submission via both the "Add" button and the Enter key (native form).
 *
 * Props:
 *  @param {(text: string) => void} onAdd - Callback invoked with the trimmed text.
 */
const TodoInput = ({ onAdd }) => {
  // Local state: the current value of the text input.
  const [text, setText] = useState('');

  // True when the trimmed value is non-empty — drives button disabled state.
  const canSubmit = text.trim().length > 0;

  /**
   * Handle form submission.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;   // guard: block empty submissions

    onAdd(trimmed);         // notify parent with clean text
    setText('');            // reset field for next entry
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"      /* suppress browser autofill on the whole form */
      aria-label="Add a new todo"
      className="flex gap-2.5 mb-6"
    >
      {/* Visually hidden label paired with the input via htmlFor */}
      <label htmlFor="todo-input" className="sr-only">
        New task description
      </label>

      <div className="relative flex-1">
        <input
          id="todo-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          maxLength={200}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-150 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      {/*
       * Disabled when canSubmit is false:
       *  - `disabled` attribute prevents click/Enter submission
       *  - Muted indigo colour signals unavailability visually
       *  - `cursor-not-allowed` reinforces it on hover
       */}
      <button
        type="submit"
        disabled={!canSubmit}
        aria-label="Add todo"
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-xs transition-all duration-150 ${
          canSubmit
            ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] cursor-pointer shadow-indigo-500/20 shadow-md'
            : 'bg-indigo-300 opacity-60 cursor-not-allowed'
        }`}
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span className="hidden sm:inline">Add Task</span>
        <span className="sm:hidden">Add</span>
      </button>
    </form>
  );
};

export default TodoInput;
