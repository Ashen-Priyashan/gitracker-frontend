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
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Telemetry
          </p>
          <h2 className="mt-0.5 text-xl font-bold tracking-tight text-heading">
            Developer Overview
          </h2>
        </div>

        {username && (
          <Link
            to={`/profile/${encodeURIComponent(username)}/analytics`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
          >
            <span>View Full Analytics</span>
            <ArrowRight size={13} />
          </Link>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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