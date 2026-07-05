import {
  FolderGit2,
  GitFork,
  Star,
} from "lucide-react";

import type { UserAnalytics } from "../../types/profile";
import AnalyticsCard from "./AnalyticsCard";

type AnalyticsSummaryProps = {
  analytics: UserAnalytics;
};

function AnalyticsSummary({
  analytics,
}: AnalyticsSummaryProps) {
  return (
    <section className="grid gap-6 md:grid-cols-3">
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
    </section>
  );
}

export default AnalyticsSummary;