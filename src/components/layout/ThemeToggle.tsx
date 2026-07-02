import { Moon } from "lucide-react";

function ThemeToggle() {
  return (
    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 transition hover:bg-slate-100">
      <Moon size={18} />

      <span className="font-medium">
        Dark Mode
      </span>
    </button>
  );
}

export default ThemeToggle;