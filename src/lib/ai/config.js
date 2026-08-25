/**
 * src/lib/ai/config.js
 *
 * Centralized server-side AI configuration for TaskFlow.
 *
 * This module is server-only. The `server-only` import causes a build-time
 * error if this file is accidentally imported into a client component,
 * preventing the ANTHROPIC_API_KEY from leaking into the browser bundle.
 *
 * To use: import { claudeModel, buildSystemPrompt, MAX_CONTEXT_MESSAGES } from '@/lib/ai/config'
 */

import 'server-only';
import { anthropic } from '@ai-sdk/anthropic';

// ── Model Configuration ──────────────────────────────────────────────────────

/**
 * The Anthropic Claude model to use for all chat completions.
 *
 * claude-3-5-haiku-20241022 is chosen for:
 *   - Fast response times (low latency during streaming)
 *   - Low cost for conversational use
 *   - Strong task analysis and prioritization capabilities
 *
 * To switch models, change this constant only — it propagates everywhere.
 */
export const CLAUDE_MODEL = 'claude-3-5-haiku-20241022';

/**
 * The configured Anthropic model instance, ready for use with streamText().
 * The ANTHROPIC_API_KEY is read from process.env at runtime by the SDK.
 * It is never passed to or visible from client-side code.
 */
export const claudeModel = anthropic(CLAUDE_MODEL);

// ── Context Limits ───────────────────────────────────────────────────────────

/**
 * Maximum number of conversation messages sent to the Claude API per request.
 *
 * The full client-side message history is preserved in the browser, but only
 * the latest N messages are forwarded to the API to control token costs and
 * prevent unnecessarily large requests.
 *
 * Increase this value for longer conversation memory at the cost of higher
 * token usage per request.
 */
export const MAX_CONTEXT_MESSAGES = 20;

// ── System Prompt ────────────────────────────────────────────────────────────

/**
 * Builds the system prompt for TaskFlow AI, injecting the user's current
 * todo list as read-only context for Claude to reference.
 *
 * IMPORTANT CONSTRAINTS — enforced via the system prompt:
 *   - Claude has READ-ONLY access to the todo list.
 *   - Claude MUST NOT claim to have added, edited, deleted, or completed tasks.
 *   - Claude MUST NOT describe performing actions it cannot actually perform.
 *   - Claude may analyze tasks, suggest priorities, suggest breakdowns,
 *     and help the user organize their work — but all actual changes
 *     must be made by the user in the TaskFlow UI.
 *
 * @param {Array<{ id: string, text: string, completed: boolean, createdAt: number }>} todos
 *   The current todo list from the TaskFlow workspace.
 * @returns {string} The system prompt string to pass to streamText().
 */
export function buildSystemPrompt(todos) {
  // Format the todo list into a readable block for the prompt
  const todoBlock = formatTodosForPrompt(todos);

  return `You are the TaskFlow AI Assistant — a helpful productivity coach integrated into the TaskFlow task management application.

## Your Role
You help users understand, analyze, and organize their tasks. You are a thoughtful advisor, not an executor.

## Current Task List (Read-Only)
${todoBlock}

## What You Can Do
- Analyze the user's current tasks and workload
- Suggest prioritization strategies (e.g., by urgency, impact, or effort)
- Suggest how to break down large or vague tasks into smaller, actionable steps
- Help identify dependencies between tasks
- Offer productivity tips and focus strategies
- Answer questions about the tasks shown above

## Hard Constraints — You MUST Follow These
- You have READ-ONLY access to the task list. You CANNOT add, edit, delete, or complete tasks.
- NEVER say "I've added...", "I've removed...", "I've marked... as complete", or any phrase that implies you performed an action on the task list.
- If the user asks you to create or modify a task, explain clearly that you can only suggest — the user must make changes themselves in the TaskFlow interface.
- Do not fabricate tasks that are not in the list above.
- If the task list is empty, acknowledge this and offer to help the user think through what to add.

## Tone
Concise, clear, and encouraging. Avoid unnecessary preamble. Get to the point.`;
}

/**
 * Formats the todo array into a numbered, human-readable list for the prompt.
 * Distinguishes between active and completed tasks.
 *
 * @param {Array} todos
 * @returns {string}
 */
function formatTodosForPrompt(todos) {
  if (!Array.isArray(todos) || todos.length === 0) {
    return 'No tasks currently in the workspace.';
  }

  const active = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  const lines = [];

  if (active.length > 0) {
    lines.push(`Active Tasks (${active.length}):`);
    active.forEach((t, i) => {
      lines.push(`  ${i + 1}. ${t.text}`);
    });
  }

  if (completed.length > 0) {
    if (lines.length > 0) lines.push('');
    lines.push(`Completed Tasks (${completed.length}):`);
    completed.forEach((t, i) => {
      lines.push(`  ${i + 1}. ✓ ${t.text}`);
    });
  }

  return lines.join('\n');
}
