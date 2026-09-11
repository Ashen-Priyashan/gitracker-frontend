import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AnalyticsDetails from "../components/analytics/AnalyticsDetails";
import AnalyticsOverview from "../components/analytics/AnalyticsOverview";
import ProfileError from "../components/profile/ProfileError";
import AnalyticsLoading from "../components/loading/AnalyticsLoading";
import { getUserAnalytics } from "../services/analyticsService";
import type { ApiError, UserAnalytics } from "../types/profile";

function AnalyticsPage() {
  const { username } = useParams<{ username: string }>();

  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!username) {
        setError("GitHub username is required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const analyticsData = await getUserAnalytics(username);

        setAnalytics(analyticsData);
      } catch (requestError) {
        if (axios.isAxiosError<ApiError>(requestError)) {
          setError(
            requestError.response?.data.message ??
              "Unable to load profile analytics.",
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [username]);

  if (loading) {
    return <AnalyticsLoading />;
  }

  if (error) {
    return <ProfileError message={error} />;
  }

  if (!analytics) {
    return (
      <ProfileError message="Analytics data is unavailable." />
    );
  }

  return (
    <div className="space-y-8 py-2">
      <div>
        <Link
          to={`/profile/${encodeURIComponent(username ?? "")}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-heading transition-colors mb-3"
        >
          <span>&larr; Back to @{username}&apos;s profile</span>
        </Link>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Developer Analytics
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-heading">
            @{username}
          </h1>

          <p className="mt-1 max-w-2xl text-sm sm:text-base text-body">
            Comprehensive developer metrics, repository aggregates, and codebase insights.
          </p>
        </div>
      </div>

      <AnalyticsOverview analytics={analytics} />

      <AnalyticsDetails analytics={analytics} />
    </div>
  );
}

export default AnalyticsPage;
