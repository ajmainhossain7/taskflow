import { Trash2 } from 'lucide-react';

/**
 * StatsBar component — summary row with task counts + a "Clear Completed" action.
 *
 * Rendered only when at least one todo exists (guard is in App.jsx).
 *
 * Props:
 *  @param {number}    total            - Total number of todos.
 *  @param {number}    completed        - Number of completed todos.
 *  @param {number}    active           - Number of remaining (incomplete) todos.
 *  @param {() => void} onClearCompleted - Removes all completed todos.
 */
const StatsBar = ({ total, completed, active, onClearCompleted }) => {
  return (
    <div
      className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1 py-1 border-b border-slate-100 pb-3.5"
      aria-label="Todo statistics"
    >
      {/* Left: remaining active task count badge */}
      <div className="flex items-center gap-1.5 font-medium">
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-[11px] border border-indigo-100">
          {active}
        </span>
        <span>{active === 1 ? 'task remaining' : 'tasks remaining'}</span>
      </div>

      {/* Right: completed / total + optional clear button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-medium text-slate-500">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold text-[11px] border border-emerald-100">
            {completed}/{total}
          </span>
          <span className="hidden sm:inline">completed</span>
        </div>

        {/*
         * "Clear Completed" — only shown when there is at least one completed
         * task. Renders nothing when there's nothing to clear.
         */}
        {completed > 0 && (
          <button
            onClick={onClearCompleted}
            aria-label={`Clear ${completed} completed ${completed === 1 ? 'task' : 'tasks'}`}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors duration-150 font-medium hover:bg-red-50 px-2 py-1 rounded-lg text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear completed</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StatsBar;
