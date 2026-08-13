"use client";

import { useState } from "react";
import Link from "next/link";
import useTodos from "../../hooks/useTodos";

// ── Sidebar nav items ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: "calendar_today", label: "All Tasks", filter: "all" },
  { icon: "radio_button_unchecked", label: "Active", filter: "active" },
  { icon: "check_circle", label: "Completed", filter: "completed" },
];

// ── Single task card ─────────────────────────────────────────────────────────
function TaskCard({ todo, onToggle, onDelete }) {
  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/25 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
      style={{ transform: "translateY(0)" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 w-5 h-5 rounded-full border border-outline-variant/40 flex items-center justify-center transition-all group-hover:border-primary/50 focus:outline-none"
        style={
          todo.completed
            ? { backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" }
            : {}
        }
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <span className="material-symbols-outlined text-white" style={{ fontSize: "12px" }}>
            check
          </span>
        )}
      </button>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="font-sans text-base text-on-surface truncate transition-all"
          style={
            todo.completed
              ? { textDecoration: "line-through", color: "var(--color-on-surface-variant)" }
              : {}
          }
        >
          {todo.text}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all focus:outline-none focus:opacity-100"
        aria-label="Delete task"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
          delete
        </span>
      </button>
    </div>
  );
}

// ── Add task input ───────────────────────────────────────────────────────────
function AddTaskInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        id="task-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-lg px-4 py-3 font-sans text-base text-on-surface placeholder-on-surface-variant/50 bg-white/[0.02] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
        aria-label="New task"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex-shrink-0 bg-primary text-white font-sans font-medium text-sm px-5 py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
          add
        </span>
      </button>
    </form>
  );
}

// ── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar({ total, active, completed, onClearCompleted }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-sans text-xs text-on-surface-variant">
          {completed} of {total} tasks completed
        </span>
        <span className="font-sans text-xs font-semibold text-primary">{pct}%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-surface-container-highest overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%`, boxShadow: "0 0 8px rgba(59,130,246,0.5)" }}
        />
      </div>
      {/* Stats chips */}
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-white/10 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="font-sans text-xs text-on-surface-variant">{active} Active</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-white/10 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-on-surface-variant inline-block" />
          <span className="font-sans text-xs text-on-surface-variant">{completed} Done</span>
        </div>
        {completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="ml-auto font-sans text-xs text-on-surface-variant hover:text-error transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main workspace page ──────────────────────────────────────────────────────
export default function AppPage() {
  const [todos, setTodos] = useTodos();
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handlers
  const handleAdd = (text) => {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
    ]);
  };

  const handleToggle = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const handleDelete = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
    if (filter === "completed") setFilter("all");
  };

  // Derived
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-surface text-on-surface font-sans">
      {/* ── Sidebar (desktop) ── */}
      <nav
        className={`hidden md:flex flex-col gap-4 p-6 h-screen overflow-y-auto bg-surface-container-lowest border-r border-outline-variant/10 fixed left-0 top-0 w-64 z-40`}
      >
        {/* Logo */}
        <Link href="/" className="font-sans font-bold text-2xl text-primary mb-2 block">
          TaskFlow
        </Link>

        {/* New Task button */}
        <button
          onClick={() => {
            const input = document.getElementById("task-input");
            if (input) input.focus();
          }}
          className="bg-primary text-white font-sans font-medium text-sm rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
          New Task
        </button>

        {/* Nav */}
        <ul className="flex flex-col gap-1 flex-grow mt-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.filter}>
              <button
                onClick={() => setFilter(item.filter)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-sans font-medium text-sm transition-all duration-200 ${
                  filter === item.filter
                    ? "bg-primary/20 text-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{item.icon}</span>
                {item.label}
                {item.filter === "active" && active > 0 && (
                  <span className="ml-auto bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {active}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom links */}
        <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-outline-variant/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-sans text-sm text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>home</span>
            Home
          </Link>
          <Link
            href="/health"
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-sans text-sm text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>monitor_heart</span>
            Health Check
          </Link>
        </div>
      </nav>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="w-64 h-full bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col gap-4 p-6 z-60" onClick={(e) => e.stopPropagation()}>
            <Link href="/" className="font-sans font-bold text-2xl text-primary mb-2 block" onClick={() => setSidebarOpen(false)}>
              TaskFlow
            </Link>
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.filter}>
                  <button
                    onClick={() => { setFilter(item.filter); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-sans font-medium text-sm transition-all ${
                      filter === item.filter
                        ? "bg-primary/20 text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-variant/50"
                    }`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 flex items-center justify-between px-6 h-16 sticky top-0 z-30">
          <button
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-xs hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: "18px" }}>
                search
              </span>
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full bg-surface-container-high border border-outline-variant/20 rounded-full py-1.5 pl-10 pr-4 font-sans text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
              />
            </div>
          </div>
        </header>

        {/* Workspace canvas */}
        <div className="flex-1 p-6 pt-8 max-w-[1200px] mx-auto w-full">
          {/* Page title */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <div>
              <h1 className="font-sans font-bold text-on-surface" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
                {filter === "all" ? "All Tasks" : filter === "active" ? "Active Tasks" : "Completed Tasks"}
              </h1>
              <p className="font-sans text-sm text-on-surface-variant mt-1">Stay focused, clear your mind.</p>
            </div>
          </div>

          {/* Add input */}
          <AddTaskInput onAdd={handleAdd} />

          {/* Stats */}
          {total > 0 && (
            <StatsBar
              total={total}
              active={active}
              completed={completed}
              onClearCompleted={handleClearCompleted}
            />
          )}

          {/* Filter tabs (mobile) */}
          <div className="md:hidden flex gap-2 mb-4 overflow-x-auto pb-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.filter}
                onClick={() => setFilter(item.filter)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full font-sans text-xs font-semibold transition-all ${
                  filter === item.filter
                    ? "bg-primary text-white"
                    : "border border-white/10 bg-white/5 text-on-surface-variant hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Task list */}
          <div className="flex flex-col gap-3">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-on-surface-variant mb-4" style={{ fontSize: "48px" }}>
                  {filter === "completed" ? "check_circle" : "inbox"}
                </span>
                <p className="font-sans text-on-surface-variant">
                  {filter === "all"
                    ? "No tasks yet. Add one above!"
                    : filter === "active"
                    ? "No active tasks. Great work!"
                    : "No completed tasks yet."}
                </p>
              </div>
            ) : (
              filtered.map((todo) => (
                <TaskCard
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* ── Mobile FAB ── */}
      <button
        onClick={() => {
          setSidebarOpen(false);
          const input = document.getElementById("task-input");
          if (input) input.focus();
        }}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all z-50"
        style={{ boxShadow: "0 4px 24px rgba(59,130,246,0.45)" }}
        aria-label="Add task"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>add</span>
      </button>
    </div>
  );
}
