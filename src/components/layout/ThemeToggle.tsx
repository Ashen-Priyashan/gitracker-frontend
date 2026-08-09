import { Moon, Sun } from "lucide-react";

import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-3 text-heading transition hover:opacity-80"
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