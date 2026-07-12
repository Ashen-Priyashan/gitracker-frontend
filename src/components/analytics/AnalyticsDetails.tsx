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
    <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Analytics Details
      </p>

      <h2 className="mt-2 text-2xl font-bold text-heading">
        Developer analytics summary
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UserRound size={22} />
          </div>

          <div>
            <p className="text-sm text-body">
              GitHub User
            </p>

            <p className="mt-1 font-semibold text-heading">
              @{analytics.githubUser.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays size={22} />
          </div>

          <div>
            <p className="text-sm text-body">
              Analytics Calculated
            </p>

            <p className="mt-1 break-all font-semibold text-heading">
              {calculatedDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsDetails;