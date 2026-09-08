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
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 animate-pulse">
        <div className="h-6 w-56 rounded-lg bg-surface-hover" />
        <div className="grid gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-surface-hover/60" />
          ))}
        </div>
        <div className="h-56 rounded-2xl bg-surface-hover/40" />
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
          onClick={loadData}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          <RefreshCw size={14} />
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
    <div className="space-y-6">
      {/* Calculating Status Banner */}
      {isCalculating && (
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500">
              <Clock size={20} className="animate-spin" />
            </div>
            <div>
              <h4 className="font-semibold text-heading">Statistics Calculating</h4>
              <p className="text-xs text-body">
                GitHub is currently calculating activity statistics for this repository.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2 text-xs font-semibold text-heading hover:bg-surface-hover transition-colors"
          >
            <RefreshCw size={14} />
            <span>Check Again</span>
          </button>
        </div>
      )}

      {/* Main Stats Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-500">
            <PlusCircle size={20} />
            <span className="font-medium text-sm">Total Additions</span>
          </div>
          <p className="mt-4 text-3xl font-bold text-heading">
            +{totalAdditions.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-body">Lines of code added</p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
          <div className="flex items-center gap-2 text-rose-500">
            <MinusCircle size={20} />
            <span className="font-medium text-sm">Total Deletions</span>
          </div>
          <p className="mt-4 text-3xl font-bold text-heading">
            -{totalDeletions.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-body">Lines of code removed</p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-primary">
            <Code2 size={20} />
            <span className="font-medium text-sm">Net Code Change</span>
          </div>
          <p
            className={`mt-4 text-3xl font-bold ${
              netGrowth >= 0 ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {netGrowth >= 0 ? `+${netGrowth.toLocaleString()}` : netGrowth.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-body">Net codebase expansion</p>
        </div>
      </div>

      {/* 52-Week Commit Activity Trend */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-heading">Commit Activity (Past 52 Weeks)</h3>
              <p className="text-xs text-body">
                Weekly commit distribution over the past year
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-body">Annual Commits: </span>
              <span className="font-bold text-heading">
                {activity?.totalYearCommits.toLocaleString() ?? 0}
              </span>
            </div>
            <div>
              <span className="text-body">Peak Week: </span>
              <span className="font-bold text-heading">{maxWeeklyCommits}</span>
            </div>
          </div>
        </div>

        {/* 52-Week Activity Histogram */}
        {weeks.length > 0 ? (
          <div className="space-y-2">
            <div className="flex h-40 items-end gap-1 sm:gap-1.5 pt-4 pb-2">
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
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        week.totalCommits > 0
                          ? "bg-primary hover:bg-primary-hover"
                          : "bg-surface-hover/40"
                      }`}
                    />

                    {/* Tooltip on Hover */}
                    <div className="pointer-events-none absolute bottom-full mb-2 hidden flex-col items-center group-hover:flex z-20">
                      <div className="rounded-lg bg-heading px-2.5 py-1 text-[11px] font-medium text-surface shadow-md whitespace-nowrap">
                        <p>{weekDate}</p>
                        <p className="font-bold">{week.totalCommits} commits</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-body pt-2 border-t border-border/40">
              <span>52 weeks ago</span>
              <span>26 weeks ago</span>
              <span>This week</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-body py-8 text-center">
            {isCalculating
              ? "Calculating weekly commit activity..."
              : "No commit activity records available for this repository."}
          </p>
        )}
      </div>

      {/* Participation Breakdown: Owner vs Community */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border/60 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-heading">Participation Breakdown</h3>
            <p className="text-xs text-body">
              Commit split between the repository owner and community contributors
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-black/10 p-5 space-y-2">
            <div className="flex justify-between text-xs text-body">
              <span>Owner Commits (52 Weeks)</span>
              <span className="font-bold text-heading">{totalOwnerYearCommits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-body">
              <span>Community Commits</span>
              <span className="font-bold text-heading">
                {(totalAllYearCommits - totalOwnerYearCommits).toLocaleString()}
              </span>
            </div>

            <div className="pt-3">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-primary">Owner Share: {ownerShare.toFixed(1)}%</span>
                <span className="text-emerald-500">
                  Community: {(100 - ownerShare).toFixed(1)}%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-emerald-500/30 flex">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${ownerShare}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-black/10 p-5 flex flex-col justify-center space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              <h4 className="font-bold text-heading text-sm">Collaboration Balance</h4>
            </div>
            <p className="text-xs text-body leading-relaxed">
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
