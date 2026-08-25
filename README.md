# 🌌 TaskFlow — Digital Productivity Suite

TaskFlow is a premium, high-performance digital productivity suite built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. It features a modern dark-mode glassmorphism interface aligned with the Google Stitch design system.

---

## 🌟 Key Features

- **⚡ Productivity Workspace (`/app`)**:
  - **Quick Add**: Instantly add new tasks with keyboard shortcuts and validation rules.
  - **Status Management**: Track progress with a thin glowing Electric Blue progress bar and circular status checkboxes.
  - **Task Actions**: Hover to delete tasks or clear all completed items in one click.
  - **Local Persistence**: Tasks are synchronized client-side using an SSR-safe `localStorage` state hook.
  - **Workspace Filters**: Dynamically switch task views between **All**, **Active**, and **Completed**.
  - **Case-Insensitive Search**: Live query filtering across category views with custom empty states.

- **🤖 AI Task Assistant (Floating Panel)**:
  - **Context-Aware Chat**: Interacts with the active task list using Vercel AI SDK v7, Anthropic's SDK, and the Claude model.
  - **React-Safe Streaming Parser**: Custom inline markdown block splitter supporting headers, bold/italic, bullet lists, and code blocks safely without `dangerouslySetInnerHTML`.
  - **Resilient Error States**: Custom warning banners mapping end-user friendly notifications (credit balance exhaustion, rate limits, overloaded endpoints, network outages).

- **♿ Accessibility & Inclusive UX (WCAG 2.1 AA)**:
  - **Focus Management**: Focus traps, auto-focus on textareas upon mount, and focus restoration to trigger buttons on closure.
  - **Keyboard Support**: Complete keyboard tab navigation and `Escape` key close listeners.
  - **Polite Live Regions**: Custom `aria-live="polite"` announcements notifying screen readers of thinking/completion states without verbose token spam.
  - **Motion Control**: Media query configurations dimming animations for users who prefer reduced motion.

- **🌐 Public Landing & About Pages (`/`, `/about`, `/contact`)**:
  - Sleek marketing pages featuring responsive dark themes, bento grid layouts, location visualizations, and interactive FAQ widgets.
  - **Validated Contact Form**: Simulated success cards, validator regex indicators, and submission loading overlays.

- **🏥 System Diagnostics (`/health`)**:
  - Dynamic Server Component rendering live time metrics (`worldtimeapi.org`) and GitHub server connectivity indicators.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 15 (App Router)** | Framework with Server & Client Component separation |
| **React 19** | Component hierarchy & state hooks |
| **Tailwind CSS v4** | Modern utility-first styles with `@theme` configurations |
| **Vercel AI SDK v7** | Unified AI integration hooks |
| **@ai-sdk/anthropic** | Claude integration client |
| **Jest & JSDOM** | Testing runner and environment simulation |
| **React Testing Library** | UI interaction testing assertions |

---

## 📁 Project Structure

```
taskflow/
├── jest.config.js            # Jest test suite configuration
├── jest.setup.js             # Testing Library environment matchers
├── public/
├── src/
│   ├── app/
│   │   ├── (marketing)/      # Shared TopNav/Footer layout group
│   │   │   ├── about/        # /about route page
│   │   │   ├── contact/      # /contact route page
│   │   │   ├── layout.jsx    # Marketing route layout
│   │   │   └── page.jsx      # Home route landing page
│   │   ├── app/              # /app route page (Todo workspace)
│   │   ├── health/           # /health route page (Server diagnostics)
│   │   ├── global.css        # Stylesheet containing Tailwind & theme design tokens
│   │   └── layout.jsx        # Root HTML layout loading CSS & Geist fonts
│   ├── components/
│   │   ├── Navbar.jsx        # Responsive top navbar with active route highlights
│   │   ├── Footer.jsx        # Shared marketing footer
│   │   └── ChatPanel.jsx     # Accessibility-compliant AI chat assistant drawer
│   ├── hooks/
│   │   ├── useTodos.js       # SSR-safe localStorage React state hook
│   │   └── useTaskChat.js    # AI Assistant Vercel hook wrapper
│   └── lib/
│       └── ai/
│           └── config.js     # Anthropic model configuration and system prompt
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine:

### Prerequisites

Ensure you have **Node.js** (v18.17.0 or higher recommended) installed.

### Installation & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ajmainhossain7/taskflow.git
   cd taskflow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:3000/` (or the port specified in terminal logs).

---

## 🧪 Testing Setup

TaskFlow features a complete Jest and React Testing Library suite targeting custom state hooks, integration pages, markdown parser blocks, and validation modules.

* Run the complete test suite:
  ```bash
  npm run test
  ```
* Run with active coverage reports:
  ```bash
  npm run test:coverage
  ```

---

## 📜 Available Scripts

- `npm run dev` — Starts the Next.js development server.
- `npm run build` — Builds the application for production.
- `npm run start` — Runs the compiled Next.js production server.
- `npm run lint` — Runs static code analysis using `oxlint`.
- `npm run test` — Runs the Jest unit/integration test suite.
- `npm run test:coverage` — Runs tests and generates a code coverage report.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
