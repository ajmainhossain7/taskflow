import { CheckSquare } from 'lucide-react';

/**
 * Header component — displays the application title.
 */
const Header = () => {
  return (
    <header className="mb-8 text-center flex flex-col items-center">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-600/10 text-indigo-600 mb-3 shadow-xs ring-1 ring-indigo-500/10">
        <CheckSquare className="w-6 h-6 stroke-[2.2]" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        Task Manager
      </h1>
      <p className="mt-1 text-sm font-medium text-slate-500">
        Stay organized. Streamline your day.
      </p>
    </header>
  );
};

export default Header;

