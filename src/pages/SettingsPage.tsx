import { Info, Laptop, Moon, Server } from "lucide-react";

import useTheme from "../hooks/useTheme";

function SettingsPage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Settings
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
          Application Settings
        </h1>

        <p className="mt-3 text-body">
          Manage your GitTracker preferences and view application information.
        </p>
      </div>

      <section className="rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <Moon className="text-primary" size={22} />

          <h2 className="text-xl font-semibold text-heading">
            Appearance
          </h2>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-body">Current Theme</span>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>

        <p className="mt-4 text-sm text-body">
          Use the theme button in the sidebar to switch between Light and Dark
          mode.
        </p>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <Server className="text-primary" size={22} />

          <h2 className="text-xl font-semibold text-heading">
            Application
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-body">Application</span>

            <span className="font-medium text-heading">
              GitTracker
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-body">Version</span>

            <span className="font-medium text-heading">
              v1.0.0
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-body">Backend Status</span>

            <span className="font-medium text-success">
              Connected
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <Laptop className="text-primary" size={22} />

          <h2 className="text-xl font-semibold text-heading">
            Technology Stack
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Spring Boot",
            "PostgreSQL",
            "Redis",
            "GitHub REST API",
          ].map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              {technology}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <Info className="text-primary" size={22} />

          <h2 className="text-xl font-semibold text-heading">
            About GitTracker
          </h2>
        </div>

        <p className="mt-5 leading-7 text-body">
          GitTracker is a GitHub analytics application that helps developers
          explore GitHub profiles, repositories, and developer insights through
          a clean and modern dashboard.
        </p>
      </section>
    </div>
  );
}

export default SettingsPage;