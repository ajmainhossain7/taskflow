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
- **🌐 Public Landing & About Pages (`/`, `/about`, `/contact`)**:
  - Sleek marketing pages featuring responsive dark themes, bento grid layouts, location visualizations, and interactive FAQ widgets.
- **🏥 System Diagnostics (`/health`)**:
  - Dynamic Server Component rendering live time metrics (`worldtimeapi.org`) and GitHub server connectivity indicators.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 15 (App Router)** | Framework with Server & Client Component separation |
| **React 19** | Component hierarchy & state hooks |
| **Tailwind CSS v4** | Modern utility-first styles with `@theme` configurations |
| **PostCSS** | CSS compiler processing Tailwind v4 stylesheets |
| **JavaScript** | Application logic & local storage synchronization |

---

## 📁 Project Structure

```
taskflow/
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
│   │   └── Footer.jsx        # Shared marketing footer
│   └── hooks/
│       └── useTodos.js       # SSR-safe localStorage React state hook
├── postcss.config.mjs        # Tailwind v4 compilation configuration
├── next.config.js            # Next.js compiler settings
├── package.json              # Project dependencies & script triggers
└── README.md                 # Project documentation
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

## 📜 Available Scripts

- `npm run dev` — Starts the Next.js development server.
- `npm run build` — Builds the application for production.
- `npm run start` — Runs the compiled Next.js production server.
- `npm run lint` — Runs static code analysis.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
