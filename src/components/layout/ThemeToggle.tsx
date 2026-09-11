import { Moon, Sun } from "lucide-react";

import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-hover/60 px-3 py-2 text-xs font-medium text-heading transition hover:bg-surface-hover hover:border-border active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {isDarkTheme ? (
        <Sun size={15} className="text-amber-500 shrink-0" />
      ) : (
        <Moon size={15} className="text-body shrink-0" />
      )}

      <span>
        {isDarkTheme ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}

export default ThemeToggle;