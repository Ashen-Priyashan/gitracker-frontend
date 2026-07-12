import {
  Code2,
  FolderGit2,
  GitFork,
  Star,
} from "lucide-react";

import type { UserAnalytics } from "../../types/profile";
import AnalyticsCard from "../profile/AnalyticsCard";

type AnalyticsOverviewProps = {
  analytics: UserAnalytics;
};

function AnalyticsOverview({
  analytics,
}: AnalyticsOverviewProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <AnalyticsCard
        icon={Code2}
        label="Most Used Language"
        value={analytics.mostUsedLanguage ?? "Not available"}
      />
    </section>
  );
}

export default AnalyticsOverview;