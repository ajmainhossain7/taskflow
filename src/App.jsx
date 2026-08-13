"use client";

import { useState } from 'react';
import useTodos    from './hooks/useTodos';
import Header      from './components/Header';
import TodoInput   from './components/TodoInput';
import TodoList    from './components/TodoList';
import StatsBar    from './components/StatsBar';
import FilterBar   from './components/FilterBar';

/**
 * App — root component and single source of truth for all todo state.
 *
 * State:
 *  todos  — persisted to localStorage via useTodos hook.
 *  filter — active filter tab ('all' | 'active' | 'completed'), session-only.
 *
 * All mutation handlers live here; children are stateless and reusable.
 */
function App() {
  // ─── State ────────────────────────────────────────────────────────────────

  /** Full todo list — reads from / writes to localStorage automatically. */
  const [todos, setTodos] = useTodos();

  /**
   * Active filter tab.
   * Not persisted — intentionally reset to 'all' on each visit so the user
   * always sees the full list when they return to the app.
   */
  const [filter, setFilter] = useState('all');

  // ─── Handlers ─────────────────────────────────────────────────────────────

  /**
   * Add a new todo.
   * @param {string} text - Trimmed task description from TodoInput.
   */
  const handleAdd = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      ...prev,
      {
        id:        crypto.randomUUID(),
        text:      trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ]);
  };

  /**
   * Flip the completed flag for a single todo.
   * @param {string} id
   */
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Permanently delete a single todo.
   * @param {string} id
   */
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * Remove all completed todos in one action.
   * After clearing, if the filter is on 'completed', switch back to 'all'
   * so the user isn't left staring at an empty list with no obvious next step.
   */
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    if (filter === 'completed') setFilter('all');
  };

  // ─── Derived values (no extra useState needed) ────────────────────────────

  const totalCount     = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount    = totalCount - completedCount;

  /**
   * Filtered view of todos based on the active filter tab.
   * Computed on every render — cheap enough that useMemo is unnecessary here.
   */
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active')    return !todo.completed;
    if (filter === 'completed') return  todo.completed;
    return true; // 'all'
  });

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex items-start justify-center px-4 pt-12 sm:pt-20 pb-16 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-lg">

        {/* App title */}
        <Header />

        {/* Main card */}
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.05)] p-5 sm:p-7 transition-all duration-200">

          {/* ── Input section ── */}
          <TodoInput onAdd={handleAdd} />

          {/*
           * Stats + filter tabs are only rendered once at least one todo exists
           * so the initial empty screen stays clean.
           */}
          {totalCount > 0 && (
            <>
              {/* Stats row + Clear Completed */}
              <StatsBar
                total={totalCount}
                completed={completedCount}
                active={activeCount}
                onClearCompleted={handleClearCompleted}
              />

              {/* Filter tabs: All / Active / Completed */}
              <FilterBar filter={filter} onFilterChange={setFilter} />
            </>
          )}

          {/* ── Todo list section (receives pre-filtered array) ── */}
          <TodoList
            todos={filteredTodos}
            filter={filter}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />

        </div>
      </div>
    </div>
  );
}

export default App;
