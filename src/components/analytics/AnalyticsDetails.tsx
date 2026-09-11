import { CalendarDays, UserRound } from "lucide-react";

import type { UserAnalytics } from "../../types/profile";

type AnalyticsDetailsProps = {
  analytics: UserAnalytics;
};

function AnalyticsDetails({
  analytics,
}: AnalyticsDetailsProps) {
  const calculatedDate = new Date(
    analytics.calculatedAt,
  ).toLocaleString();

  return (
    <section className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Engine Metadata
        </p>

        <h2 className="mt-1 text-xl font-bold tracking-tight text-heading">
          Analytics Summary & Verification
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-hover/50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-heading border border-border/60 shrink-0">
            <UserRound size={17} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted font-medium">
              Analyzed Subject
            </p>

            <p className="mt-0.5 font-semibold text-heading truncate text-sm sm:text-base">
              @{analytics.githubUser.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-hover/50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-heading border border-border/60 shrink-0">
            <CalendarDays size={17} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted font-medium">
              Last Calculated
            </p>

            <p className="mt-0.5 font-semibold text-heading truncate text-sm sm:text-base">
              {calculatedDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsDetails;