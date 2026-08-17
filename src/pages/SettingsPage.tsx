import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Info, Moon, Settings, XCircle } from "lucide-react";

import GitHubConnectionCard from "../components/profile/GitHubConnectionCard";
import useTheme from "../hooks/useTheme";

function SettingsPage() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const connected = searchParams.get("connected");
    const errorParam = searchParams.get("error");

    if (connected === "true") {
      setNotification({
        type: "success",
        message: "Successfully connected your GitHub account!",
      });
      searchParams.delete("connected");
      setSearchParams(searchParams, { replace: true });
    } else if (errorParam) {
      setNotification({
        type: "error",
        message: `GitHub authorization failed (${errorParam}). Please try again.`,
      });
      searchParams.delete("error");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Application
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Settings
        </h1>

        <p className="mt-3 max-w-2xl text-body">
          Customize your GitTracker experience, manage GitHub account permissions, and view application
          information.
        </p>
      </div>

      {notification && (
        <div
          className={`flex items-center justify-between rounded-2xl border p-4 text-sm font-medium ${
            notification.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
              : "border-red-500/20 bg-red-500/10 text-red-500"
          }`}
        >
          <div className="flex items-center gap-3">
            {notification.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            <span>{notification.message}</span>
          </div>

          <button
            onClick={() => setNotification(null)}
            className="text-xs uppercase tracking-wider underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      <GitHubConnectionCard />

      <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Moon className="text-primary" size={26} />

            <h2 className="text-2xl font-bold text-heading">
              Appearance
            </h2>
          </div>

          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>

        <p className="mt-6 text-body">
          Use the theme button in the sidebar or mobile menu to switch
          between light and dark mode.
        </p>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Info className="text-primary" size={26} />

          <h2 className="text-2xl font-bold text-heading">
            Application
          </h2>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border p-5">
            <p className="text-sm text-body">
              Version
            </p>

            <p className="mt-1 font-semibold text-heading">
              1.0.0
            </p>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <p className="text-sm text-body">
              Framework
            </p>

            <p className="mt-1 font-semibold text-heading">
              React + Vite
            </p>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <p className="text-sm text-body">
              Styling
            </p>

            <p className="mt-1 font-semibold text-heading">
              Tailwind CSS
            </p>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <p className="text-sm text-body">
              Backend
            </p>

            <p className="mt-1 font-semibold text-heading">
              Spring Boot
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Settings className="text-primary" size={26} />

          <h2 className="text-2xl font-bold text-heading">
            About GitTracker
          </h2>
        </div>

        <p className="mt-6 leading-7 text-body">
          GitTracker is a GitHub analytics platform that helps developers
          explore profile statistics, repository insights and developer
          activity through a clean and modern interface.
        </p>
      </section>
    </div>
  );
}

export default SettingsPage;