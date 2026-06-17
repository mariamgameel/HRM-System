import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ title }) {
  const { user } = useAuth();
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
      <h1 className="text-sm font-medium text-gray-900 dark:text-slate-100">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        
        <button
          onClick={() => setDark(!dark)}
          className="text-xs px-3 py-1.5 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-700 dark:text-slate-300">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}