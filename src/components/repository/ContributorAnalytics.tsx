import { useEffect, useState, useCallback } from "react";
import { Users, Trophy, ExternalLink, AlertCircle, RefreshCw } from "lucide-react";
import type { Contributor } from "../../types/repositoryIntelligence";
import { getRepositoryContributors } from "../../services/repositoryService";

type ContributorAnalyticsProps = {
  username: string;
  repositoryName: string;
};

export default function ContributorAnalytics({
  username,
  repositoryName,
}: ContributorAnalyticsProps) {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContributors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRepositoryContributors(username, repositoryName);
      setContributors(data);
    } catch {
      setError("Failed to load repository contributors.");
    } finally {
      setLoading(false);
    }
  }, [username, repositoryName]);

  useEffect(() => {
    let isMounted = true;
    getRepositoryContributors(username, repositoryName)
      .then((data) => {
        if (isMounted) setContributors(data);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load repository contributors.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [username, repositoryName]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 space-y-5 animate-pulse">
        <div className="h-5 w-44 rounded-lg bg-surface-hover" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-surface-hover/60" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-surface p-6 sm:p-8 text-center space-y-3">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
          <AlertCircle size={20} />
        </div>
        <p className="text-xs sm:text-sm font-medium text-heading">{error}</p>
        <button
          type="button"
          onClick={fetchContributors}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs font-medium text-heading hover:bg-surface-hover transition-colors"
        >
          <RefreshCw size={12} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="rounded-2xl border border-border/80 bg-surface p-8 text-center space-y-2.5">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface-hover text-muted">
          <Users size={20} />
        </div>
        <h3 className="text-sm font-semibold text-heading">No Contributors Found</h3>
        <p className="text-xs text-muted">This repository currently has no recorded contributors.</p>
      </div>
    );
  }

  const totalContributions = contributors.reduce((sum, c) => sum + c.contributions, 0);
  const topContributor = contributors[0];

  return (
    <div className="space-y-5">
      {/* Header Overview Card */}
      <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover text-muted">
              <Users size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold tracking-tight text-heading">
                Contributor Analytics
              </h3>
              <p className="text-2xs text-muted">
                Contributors ranked by total merged commits and contributions
              </p>
            </div>
          </div>

          <span className="self-start rounded-full bg-surface-hover border border-border/80 px-2.5 py-0.5 text-2xs font-medium text-muted tabular-nums">
            {contributors.length} {contributors.length === 1 ? "Contributor" : "Contributors"}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-surface p-4 shadow-2xs">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
              Total Contributions
            </p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-heading tabular-nums">
              {totalContributions.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface p-4 shadow-2xs">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
              Top Contributor
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Trophy size={16} className="text-amber-500 shrink-0" />
              <p className="text-base font-semibold text-heading truncate">
                {topContributor.login}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface p-4 shadow-2xs sm:col-span-2 lg:col-span-1">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
              Top Contributor Share
            </p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-primary tabular-nums">
              {totalContributions > 0
                ? `${((topContributor.contributions / totalContributions) * 100).toFixed(1)}%`
                : "0%"}
            </p>
          </div>
        </div>

        {/* Contributor Rankings List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Ranked Contributors
          </h4>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((c, index) => {
              const share = totalContributions > 0 ? (c.contributions / totalContributions) * 100 : 0;

              return (
                <div
                  key={c.login}
                  className="rounded-xl border border-border/70 bg-surface p-4 transition-all duration-150 hover:border-border hover:bg-surface-hover/50 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={c.avatarUrl}
                        alt={c.login}
                        className="h-8 w-8 rounded-full border border-border/70 object-cover shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full text-2xs font-bold ${
                              index === 0
                                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                                : index === 1
                                ? "bg-slate-300/30 text-slate-600 dark:text-slate-300"
                                : index === 2
                                ? "bg-amber-700/20 text-amber-700 dark:text-amber-500"
                                : "bg-surface-hover text-muted"
                            }`}
                          >
                            #{index + 1}
                          </span>
                          <span className="text-xs font-semibold text-heading truncate">
                            {c.login}
                          </span>
                        </div>
                        <p className="text-2xs text-muted mt-0.5 tabular-nums">
                          {c.contributions.toLocaleString()}{" "}
                          {c.contributions === 1 ? "contribution" : "contributions"}
                        </p>
                      </div>
                    </div>

                    <a
                      href={c.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md p-1 text-muted hover:text-heading hover:bg-surface-hover transition-colors shrink-0"
                      title="View GitHub profile"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>

                  {/* Contribution share progress bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-2xs text-muted">
                      <span>Contribution Share</span>
                      <span className="font-medium text-heading tabular-nums">{share.toFixed(1)}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-surface-hover">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${Math.max(share, 2)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
