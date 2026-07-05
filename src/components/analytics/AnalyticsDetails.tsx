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
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
        Analytics Details
      </p>

      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        Developer analytics summary
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <UserRound size={22} />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              GitHub User
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              @{analytics.githubUser.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CalendarDays size={22} />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Analytics Calculated
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {calculatedDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsDetails;