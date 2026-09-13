import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Info, Moon, Settings, XCircle } from "lucide-react";

import GitHubConnectionCard from "../components/profile/GitHubConnectionCard";
import useTheme from "../hooks/useTheme";

function SettingsPage() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(() => {
    const connected = searchParams.get("connected");
    const errorParam = searchParams.get("error");
    if (connected === "true") {
      return {
        type: "success",
        message: "Successfully connected your GitHub account!",
      };
    }
    if (errorParam) {
      const message =
        errorParam === "account_already_linked"
          ? "This GitHub account is already linked to another GitTracker account."
          : `GitHub authorization failed (${errorParam}). Please try again.`;
      return {
        type: "error",
        message,
      };
    }
    return null;
  });

  useEffect(() => {
    if (searchParams.has("connected") || searchParams.has("error")) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("connected");
      nextParams.delete("error");
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="space-y-6 py-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Preferences & Account
        </p>

        <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-heading">
          Settings
        </h1>

        <p className="mt-1 text-xs sm:text-sm text-body max-w-2xl">
          Customize your GitTracker experience, manage GitHub account permissions, and view application specifications.
        </p>
      </div>

      {notification && (
        <div
          className={`flex items-center justify-between rounded-xl border p-3.5 text-xs sm:text-sm font-medium ${
            notification.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-500 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>

          <button
            onClick={() => setNotification(null)}
            className="text-xs uppercase tracking-wider underline hover:opacity-75"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* GitHub Account Connection Card */}
      <GitHubConnectionCard />

      {/* Appearance Section */}
      <section className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-hover text-muted">
              <Moon size={16} />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-heading">
                Appearance
              </h2>
              <p className="text-2xs text-muted">
                Display theme mode configuration
              </p>
            </div>
          </div>

          <span className="rounded-full border border-border/80 bg-surface-hover px-3 py-1 text-xs font-medium text-heading">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-body">
          Use the theme toggle in the sidebar or header navigation to seamlessly transition between macOS Light and Dark palettes.
        </p>
      </section>

      {/* System Specifications Section */}
      <section className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-hover text-muted">
            <Info size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-heading">
              Application Specifications
            </h2>
            <p className="text-2xs text-muted">
              Runtime environment and engine build version
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border/70 bg-surface p-3.5 shadow-2xs">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
              Version
            </p>
            <p className="mt-1 font-mono text-xs font-semibold text-heading">
              1.0.0
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface p-3.5 shadow-2xs">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
              Framework
            </p>
            <p className="mt-1 text-xs font-semibold text-heading">
              React + Vite
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface p-3.5 shadow-2xs">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
              Styling
            </p>
            <p className="mt-1 text-xs font-semibold text-heading">
              Tailwind CSS
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface p-3.5 shadow-2xs">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
              Backend
            </p>
            <p className="mt-1 text-xs font-semibold text-heading">
              Spring Boot
            </p>
          </div>
        </div>
      </section>

      {/* About GitTracker Section */}
      <section className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-hover text-muted">
            <Settings size={16} />
          </div>
          <h2 className="text-sm font-semibold tracking-tight text-heading">
            About GitTracker
          </h2>
        </div>

        <p className="text-xs leading-relaxed text-body">
          GitTracker is a developer intelligence platform engineered with Apple's visual philosophy:
          clarity, hierarchy, and restraint. It delivers deep repository analytics, commit activity trends,
          and contributor insights without visual clutter.
        </p>
      </section>
    </div>
  );
}

export default SettingsPage;