import { AlertCircle, GitCommit, Loader2, RefreshCw } from "lucide-react";
import type { CommitSummary } from "../../types/repositoryActivity";
import CommitListItem from "./CommitListItem";
import Skeleton from "../loading/Skeleton";

type CommitHistoryProps = {
  commits: CommitSummary[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  onLoadMore: () => void;
  onSelectCommit: (sha: string) => void;
  onRetry: () => void;
};

export default function CommitHistory({
  commits,
  loading,
  loadingMore,
  hasMore,
  error,
  onLoadMore,
  onSelectCommit,
  onRetry,
}: CommitHistoryProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCommit size={16} className="text-muted" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Commit History
          </h3>
          {!loading && commits.length > 0 && (
            <span className="rounded-full bg-surface-hover border border-border/80 px-2 py-0.5 text-2xs font-medium text-muted tabular-nums">
              {commits.length}{hasMore ? "+" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-600 dark:text-red-400">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-surface px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <RefreshCw size={12} />
            Try again
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-2" role="status" aria-label="Loading commits">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/50 p-3.5"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-44 sm:w-72" />
                  <Skeleton className="h-2.5 w-28" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          ))}
        </div>
      ) : commits.length === 0 && !error ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 py-10 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover text-muted mb-2.5">
            <GitCommit size={20} />
          </div>
          <p className="text-xs font-semibold text-heading">
            No commits found for this branch.
          </p>
          <p className="mt-0.5 text-2xs text-muted">
            This branch may be empty or newly created.
          </p>
        </div>
      ) : (
        /* Commit List */
        <div className="space-y-2">
          {commits.map((commit) => (
            <CommitListItem
              key={commit.sha}
              commit={commit}
              onSelect={onSelectCommit}
            />
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="pt-2 text-center">
              <button
                type="button"
                aria-label={loadingMore ? "Loading more commits..." : "Load more commits"}
                onClick={onLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-surface px-4 py-2 text-xs font-medium text-heading shadow-2xs hover:bg-surface-hover disabled:opacity-50 transition-colors cursor-pointer"
              >
                {loadingMore ? (
                  <>
                    <Loader2 size={13} className="animate-spin text-muted" />
                    <span>Loading more commits...</span>
                  </>
                ) : (
                  <span>Load more commits</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
