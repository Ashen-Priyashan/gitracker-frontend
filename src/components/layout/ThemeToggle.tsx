import { Moon, Sun } from "lucide-react";

import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 transition hover:bg-slate-100"
    >
      {isDarkTheme ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}

      <span className="font-medium">
        {isDarkTheme ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}

export default ThemeToggle;