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
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 animate-pulse">
        <div className="h-6 w-48 rounded-lg bg-surface-hover" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-surface-hover/60" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-500/20 bg-surface p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
          <AlertCircle size={24} />
        </div>
        <p className="text-heading font-medium">{error}</p>
        <button
          type="button"
          onClick={fetchContributors}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          <RefreshCw size={14} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Users size={24} />
        </div>
        <h3 className="text-lg font-bold text-heading">No Contributors Found</h3>
        <p className="text-sm text-body">This repository currently has no recorded contributors.</p>
      </div>
    );
  }

  const totalContributions = contributors.reduce((sum, c) => sum + c.contributions, 0);
  const topContributor = contributors[0];

  return (
    <div className="space-y-6">
      {/* Header Overview Card */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-heading">Contributor Analytics</h3>
              <p className="text-xs text-body">
                Contributors ranked by total merged commits and contributions
              </p>
            </div>
          </div>

          <span className="self-start rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary border border-primary/20">
            {contributors.length} {contributors.length === 1 ? "Contributor" : "Contributors"}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-black/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-body">
              Total Contributions
            </p>
            <p className="mt-2 text-2xl font-bold text-heading">
              {totalContributions.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-black/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-body">
              Top Contributor
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Trophy size={18} className="text-amber-400 shrink-0" />
              <p className="text-lg font-bold text-heading truncate">
                {topContributor.login}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-black/10 p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-body">
              Top Contributor Share
            </p>
            <p className="mt-2 text-2xl font-bold text-primary">
              {totalContributions > 0
                ? `${((topContributor.contributions / totalContributions) * 100).toFixed(1)}%`
                : "0%"}
            </p>
          </div>
        </div>

        {/* Contributor Rankings List */}
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-body">
            Ranked Contributors
          </h4>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((c, index) => {
              const share = totalContributions > 0 ? (c.contributions / totalContributions) * 100 : 0;
              const isTop3 = index < 3;

              return (
                <div
                  key={c.login}
                  className="relative rounded-2xl border border-border bg-surface-hover/30 p-5 transition-all hover:border-primary/40 hover:bg-surface-hover/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatarUrl}
                        alt={c.login}
                        className="h-10 w-10 rounded-full border border-border object-cover"
                        loading="lazy"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                              index === 0
                                ? "bg-amber-500/20 text-amber-500"
                                : index === 1
                                ? "bg-slate-300/20 text-slate-300"
                                : index === 2
                                ? "bg-amber-700/20 text-amber-600"
                                : "bg-primary/10 text-body"
                            }`}
                          >
                            #{index + 1}
                          </span>
                          <span className="font-semibold text-heading truncate max-w-[120px]">
                            {c.login}
                          </span>
                        </div>
                        <p className="text-xs text-body mt-0.5">
                          {c.contributions.toLocaleString()}{" "}
                          {c.contributions === 1 ? "contribution" : "contributions"}
                        </p>
                      </div>
                    </div>

                    <a
                      href={c.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-body hover:bg-surface hover:text-heading transition-colors"
                      title="View GitHub profile"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Contribution share progress bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-body">
                      <span>Contribution Share</span>
                      <span className="font-medium text-heading">{share.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/20">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isTop3 ? "bg-primary" : "bg-primary/60"
                        }`}
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
