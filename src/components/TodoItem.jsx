import { Check, Trash2 } from 'lucide-react';

/**
 * TodoItem component — a single interactive todo row.
 *
 * Features:
 *  - Circular toggle button: click to mark complete / incomplete.
 *  - Strikethrough text when completed.
 *  - Delete button: hidden by default, revealed on hover OR keyboard focus.
 *
 * Props:
 *  @param {{ id: string, text: string, completed: boolean }} todo
 *  @param {(id: string) => void} onToggle - Flip the completed flag for this todo.
 *  @param {(id: string) => void} onDelete - Permanently remove this todo.
 */
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`flex items-center gap-3 rounded-xl px-3.5 py-3 border transition-all duration-150 group ${
      todo.completed 
        ? 'bg-slate-50/60 border-slate-200/60 opacity-75' 
        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
    }`}>

      {/*
       * ── Toggle button ──
       * aria-label includes the task text so screen readers announce
       * e.g. "Mark 'Buy milk' as complete" instead of a generic label.
       */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={
          todo.completed
            ? `Mark "${todo.text}" as incomplete`
            : `Mark "${todo.text}" as complete`
        }
        className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
            : 'border-slate-300 bg-white hover:border-indigo-500 hover:scale-105'
        }`}
      >
        {/* Checkmark — only visible when the task is completed */}
        {todo.completed && (
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        )}
      </button>

      {/*
       * ── Task text ──
       * Applies a line-through + muted colour when done, giving instant
       * visual feedback without removing the text from the DOM.
       */}
      <span
        className={`flex-1 text-sm leading-relaxed transition-all duration-150 select-none ${
          todo.completed
            ? 'line-through text-slate-400 font-normal'
            : 'text-slate-700 font-medium'
        }`}
      >
        {todo.text}
      </span>

      {/*
       * ── Delete button ──
       * Hidden by default (opacity-0) and revealed on:
       * • mouse hover — via Tailwind `group-hover`
       * • keyboard focus — via `focus-visible:opacity-100`
       * This ensures keyboard-only users can reach and activate the button.
       */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 focus-visible:text-red-500 transition-all duration-150 cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>

    </li>
  );
};

export default TodoItem;
