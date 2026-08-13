# ✅ Modern Todo Application

A clean, accessible, responsive, and fully functional Todo application built using **React 19**, **Vite**, **JavaScript**, and **Tailwind CSS v4**.

---

## 🌟 Key Features

- **➕ Add Tasks:** Type a task and click **Add** or press **Enter**. Empty or whitespace-only inputs are automatically blocked.
- **✔️ Toggle Completion:** Click the check circle to toggle task status between active and completed.
- **🗑️ Delete Tasks:** Remove individual tasks with a single click (accessible via mouse hover or keyboard navigation).
- **🔍 Task Filtering:** Easily filter your view by **All**, **Active**, or **Completed** tasks.
- **🧹 Clear Completed:** Remove all completed tasks at once with a single click.
- **💾 Automatic LocalStorage Persistence:** Tasks and completion states automatically sync to your browser's local storage and persist across page reloads.
- **📊 Real-time Task Statistics:** Track remaining active tasks and completion progress.
- **♿ Accessibility (a11y):** Built with WAI-ARIA roles (`tablist`, `tab`, `status`), dynamic screen reader announcements (`aria-live`), and full keyboard navigation support (`focus-visible`).
- **📱 Responsive & Premium Design:** Styled with a modern glassmorphism aesthetic, subtle shadows, smooth transitions, and custom Google Fonts (`Inter`).

---

## 🛠️ Technology Stack

| Technology | Purpose |
| --- | --- |
| **React 19** | UI Library (Functional Components & Custom Hooks) |
| **Vite 8** | Next Generation Frontend Tooling & Dev Server |
| **Tailwind CSS v4** | Modern Utility-First CSS Framework |
| **JavaScript (ES6+)** | Core Application Logic |
| **HTML5 & Web Storage** | Semantic Layout & Browser LocalStorage |

---

## 📁 Project Structure

```
todo-app/
├── public/
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx    # Context-aware messages when no tasks exist
│   │   ├── FilterBar.jsx     # Tab switcher (All / Active / Completed)
│   │   ├── Header.jsx        # Application header & title
│   │   ├── StatsBar.jsx      # Task counters & "Clear Completed" button
│   │   ├── TodoInput.jsx     # Input form with validation & submission guards
│   │   ├── TodoItem.jsx      # Individual task row with toggle and delete actions
│   │   └── TodoList.jsx      # Maps filtered tasks or displays empty state
│   ├── hooks/
│   │   └── useTodos.js       # Custom hook managing state & localStorage sync
│   ├── App.jsx               # Root layout & centralized state management
│   ├── main.jsx              # Application entry point
│   └── index.css            # Tailwind directives & Inter Google Font
├── .gitattributes            # Line ending normalization across OS environments
├── index.html                # Main HTML document
├── package.json              # Project dependencies & scripts
├── README.md                 # Project documentation
└── vite.config.js            # Vite configuration with Tailwind plugin
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine:

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) installed on your system.

### Installation & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ajmainhossain7/todo-app.git
   cd todo-app
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
   Navigate to `http://localhost:5173/` in your browser.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Vite development server.
- `npm run build` — Builds the application for production.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs Oxlint for static code analysis.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
