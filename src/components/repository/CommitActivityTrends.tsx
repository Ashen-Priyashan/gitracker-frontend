import { useEffect, useState, useCallback } from "react";
import {
  TrendingUp,
  Activity,
  PlusCircle,
  MinusCircle,
  Code2,
  Users,
  AlertCircle,
  RefreshCw,
  Clock,
} from "lucide-react";
import type {
  CommitActivityResponse,
  CodeFrequencyResponse,
  ParticipationResponse,
} from "../../types/repositoryIntelligence";
import {
  getRepositoryCommitActivity,
  getRepositoryCodeFrequency,
  getRepositoryParticipation,
} from "../../services/repositoryService";

type CommitActivityTrendsProps = {
  username: string;
  repositoryName: string;
};

export default function CommitActivityTrends({
  username,
  repositoryName,
}: CommitActivityTrendsProps) {
  const [activity, setActivity] = useState<CommitActivityResponse | null>(null);
  const [codeFreq, setCodeFreq] = useState<CodeFrequencyResponse | null>(null);
  const [participation, setParticipation] = useState<ParticipationResponse | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [actResult, freqResult, partResult] = await Promise.allSettled([
        getRepositoryCommitActivity(username, repositoryName),
        getRepositoryCodeFrequency(username, repositoryName),
        getRepositoryParticipation(username, repositoryName),
      ]);

      if (actResult.status === "rejected") {
        setError("Failed to load commit activity and trends.");
        return;
      }

      setActivity(actResult.value);
      setCodeFreq(
        freqResult.status === "fulfilled"
          ? freqResult.value
          : { status: "CALCULATING", weeklyStats: [] }
      );
      setParticipation(
        partResult.status === "fulfilled"
          ? partResult.value
          : { status: "CALCULATING", allCommits: [], ownerCommits: [] }
      );
    } catch {
      setError("Failed to load commit activity and trends.");
    } finally {
      setLoading(false);
    }
  }, [username, repositoryName]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [actResult, freqResult, partResult] = await Promise.allSettled([
          getRepositoryCommitActivity(username, repositoryName),
          getRepositoryCodeFrequency(username, repositoryName),
          getRepositoryParticipation(username, repositoryName),
        ]);

        if (!isMounted) return;

        if (actResult.status === "rejected") {
          setError("Failed to load commit activity and trends.");
          return;
        }

        setActivity(actResult.value);
        setCodeFreq(
          freqResult.status === "fulfilled"
            ? freqResult.value
            : { status: "CALCULATING", weeklyStats: [] }
        );
        setParticipation(
          partResult.status === "fulfilled"
            ? partResult.value
            : { status: "CALCULATING", allCommits: [], ownerCommits: [] }
        );
      } catch {
        if (isMounted) setError("Failed to load commit activity and trends.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [username, repositoryName]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 space-y-5 animate-pulse">
        <div className="h-5 w-52 rounded-lg bg-surface-hover" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-surface-hover/60" />
          ))}
        </div>
        <div className="h-48 rounded-xl bg-surface-hover/40" />
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
          onClick={loadData}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs font-medium text-heading hover:bg-surface-hover transition-colors"
        >
          <RefreshCw size={12} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  const isCalculating =
    activity?.status === "CALCULATING" ||
    codeFreq?.status === "CALCULATING" ||
    participation?.status === "CALCULATING";

  const weeks = activity?.weeks ?? [];
  const maxWeeklyCommits = weeks.reduce((max, w) => Math.max(max, w.totalCommits), 1);

  // Code Frequency Totals
  const weeklyCodeStats = codeFreq?.weeklyStats ?? [];
  const totalAdditions = weeklyCodeStats.reduce((sum, w) => sum + w.additions, 0);
  const totalDeletions = weeklyCodeStats.reduce((sum, w) => sum + Math.abs(w.deletions), 0);
  const netGrowth = totalAdditions - totalDeletions;

  // Participation Totals
  const allCommits = participation?.allCommits ?? [];
  const ownerCommits = participation?.ownerCommits ?? [];
  const totalAllYearCommits = allCommits.reduce((sum, c) => sum + c, 0);
  const totalOwnerYearCommits = ownerCommits.reduce((sum, c) => sum + c, 0);
  const ownerShare =
    totalAllYearCommits > 0 ? (totalOwnerYearCommits / totalAllYearCommits) * 100 : 0;

  return (
    <div className="space-y-5">
      {/* Calculating Status Banner */}
      {isCalculating && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500 shrink-0">
              <Clock size={18} className="animate-spin" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-heading">Statistics Calculating</h4>
              <p className="text-2xs sm:text-xs text-muted">
                GitHub is currently calculating activity statistics for this repository.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs font-medium text-heading hover:bg-surface-hover transition-colors shrink-0"
          >
            <RefreshCw size={12} />
            <span>Check Again</span>
          </button>
        </div>
      )}

      {/* Main Stats Cards Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <PlusCircle size={14} className="text-emerald-500" />
            <span>Total Additions</span>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-heading tabular-nums">
            +{totalAdditions.toLocaleString()}
          </p>
          <p className="mt-0.5 text-2xs text-muted">Lines of code added</p>
        </div>

        <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <MinusCircle size={14} className="text-rose-500" />
            <span>Total Deletions</span>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-heading tabular-nums">
            -{totalDeletions.toLocaleString()}
          </p>
          <p className="mt-0.5 text-2xs text-muted">Lines of code removed</p>
        </div>

        <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <Code2 size={14} className="text-primary" />
            <span>Net Code Change</span>
          </div>
          <p
            className={`mt-2 text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums ${
              netGrowth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {netGrowth >= 0 ? `+${netGrowth.toLocaleString()}` : netGrowth.toLocaleString()}
          </p>
          <p className="mt-0.5 text-2xs text-muted">Net codebase expansion</p>
        </div>
      </div>

      {/* 52-Week Commit Activity Trend */}
      <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover text-muted">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold tracking-tight text-heading">
                Commit Activity (Past 52 Weeks)
              </h3>
              <p className="text-2xs text-muted">
                Weekly commit distribution over the past year
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted">
            <div>
              <span>Annual Commits: </span>
              <span className="font-semibold text-heading tabular-nums">
                {activity?.totalYearCommits.toLocaleString() ?? 0}
              </span>
            </div>
            <span>·</span>
            <div>
              <span>Peak Week: </span>
              <span className="font-semibold text-heading tabular-nums">{maxWeeklyCommits}</span>
            </div>
          </div>
        </div>

        {/* 52-Week Activity Histogram */}
        {weeks.length > 0 ? (
          <div className="space-y-2">
            <div className="flex h-36 items-end gap-1 sm:gap-1.5 pt-3 pb-1">
              {weeks.map((week, idx) => {
                const heightPercent =
                  maxWeeklyCommits > 0 ? (week.totalCommits / maxWeeklyCommits) * 100 : 0;
                const weekDate = new Date(week.weekTimestamp * 1000).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div
                    key={week.weekTimestamp || idx}
                    className="group relative flex-1 h-full flex items-end justify-center"
                  >
                    <div
                      style={{ height: `${Math.max(heightPercent, 4)}%` }}
                      className={`w-full rounded-t-sm transition-all duration-200 ${
                        week.totalCommits > 0
                          ? "bg-primary hover:bg-primary-hover"
                          : "bg-surface-hover/50"
                      }`}
                    />

                    {/* Tooltip on Hover */}
                    <div className="pointer-events-none absolute bottom-full mb-1.5 hidden flex-col items-center group-hover:flex z-20">
                      <div className="rounded-md bg-heading px-2 py-1 text-2xs font-medium text-surface shadow-md whitespace-nowrap">
                        <p>{weekDate}</p>
                        <p className="font-semibold tabular-nums">{week.totalCommits} commits</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-2xs text-muted pt-2 border-t border-border/60">
              <span>52 weeks ago</span>
              <span>26 weeks ago</span>
              <span>This week</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted py-6 text-center">
            {isCalculating
              ? "Calculating weekly commit activity..."
              : "No commit activity records available for this repository."}
          </p>
        )}
      </div>

      {/* Participation Breakdown: Owner vs Community */}
      <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover text-muted">
            <Users size={18} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold tracking-tight text-heading">
              Participation Breakdown
            </h3>
            <p className="text-2xs text-muted">
              Commit split between repository owner and community contributors
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-surface p-4 space-y-2 shadow-2xs">
            <div className="flex justify-between text-xs text-muted">
              <span>Owner Commits (52 Weeks)</span>
              <span className="font-semibold text-heading tabular-nums">{totalOwnerYearCommits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-muted">
              <span>Community Commits</span>
              <span className="font-semibold text-heading tabular-nums">
                {(totalAllYearCommits - totalOwnerYearCommits).toLocaleString()}
              </span>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-primary tabular-nums">Owner Share: {ownerShare.toFixed(1)}%</span>
                <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
                  Community: {(100 - ownerShare).toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover flex">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${ownerShare}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface p-4 flex flex-col justify-center space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <h4 className="font-semibold text-heading text-xs">Collaboration Balance</h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {ownerShare > 85
                ? "This repository is primarily maintained by the owner with limited external contributor activity."
                : ownerShare < 40
                ? "This repository has a highly collaborative structure with substantial community participation."
                : "This repository maintains a balanced distribution between the owner and community contributions."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
