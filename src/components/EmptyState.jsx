import { ClipboardList, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * EmptyState component — shown when the visible todo list is empty.
 *
 * Displays a different message depending on the active filter so the
 * user understands *why* the list is empty.
 *
 * Props:
 *  @param {'all'|'active'|'completed'} filter - The active filter tab.
 */

/** Context-aware copy for each filter state. */
const MESSAGES = {
  all: {
    Icon:    ClipboardList,
    heading: 'No tasks yet',
    sub:     'Add your first task above to get started.',
  },
  active: {
    Icon:    Sparkles,
    heading: 'All caught up!',
    sub:     'No active tasks pending — enjoy your break.',
  },
  completed: {
    Icon:    CheckCircle2,
    heading: 'No completed tasks yet',
    sub:     'Complete a task and it will show up here.',
  },
};

const EmptyState = ({ filter = 'all' }) => {
  const { Icon, heading, sub } = MESSAGES[filter] ?? MESSAGES.all;

  return (
    // role="status" already implies aria-live="polite" — no need to duplicate.
    <div
      role="status"
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100/80 text-slate-400 flex items-center justify-center mb-3.5 border border-slate-200/60 shadow-xs">
        <Icon className="w-6 h-6 stroke-[1.75]" />
      </div>
      <p className="text-sm font-semibold text-slate-800 tracking-tight">{heading}</p>
      <p className="text-xs text-slate-500 mt-1 max-w-[220px] leading-relaxed">{sub}</p>
    </div>
  );
};

export default EmptyState;
