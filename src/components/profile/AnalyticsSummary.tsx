import {
  ArrowRight,
  FolderGit2,
  GitFork,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import type { UserAnalytics } from "../../types/profile";
import AnalyticsCard from "./AnalyticsCard";

type AnalyticsSummaryProps = {
  analytics: UserAnalytics;
};

function AnalyticsSummary({
  analytics,
}: AnalyticsSummaryProps) {
  const { username } = useParams<{ username: string }>();

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Analytics
          </p>

          <h2 className="mt-2 text-2xl font-bold text-heading">
            Developer overview
          </h2>
        </div>

        {username && (
          <Link
            to={`/profile/${encodeURIComponent(username)}/analytics`}
            className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
          >
            View analytics
            <ArrowRight size={17} />
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AnalyticsCard
          icon={FolderGit2}
          label="Repositories"
          value={analytics.totalRepositories.toLocaleString()}
        />

        <AnalyticsCard
          icon={Star}
          label="Total Stars"
          value={analytics.totalStars.toLocaleString()}
        />

        <AnalyticsCard
          icon={GitFork}
          label="Total Forks"
          value={analytics.totalForks.toLocaleString()}
        />
      </div>
    </section>
  );
}

export default AnalyticsSummary;