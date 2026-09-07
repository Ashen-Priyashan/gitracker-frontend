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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCommit size={18} className="text-primary" />
          <h3 className="text-lg font-bold text-heading">Commit History</h3>
          {!loading && commits.length > 0 && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {commits.length} {hasMore ? "+" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-red-300/80 bg-red-50/50 p-4 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-400">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1.5 rounded-xl border border-red-300 bg-surface px-3 py-1.5 text-xs font-semibold text-red-600 shadow-xs hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors"
          >
            <RefreshCw size={13} />
            Try again
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-3" role="status" aria-label="Loading commits">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48 sm:w-80" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-6 w-18 rounded-lg" />
            </div>
          ))}
        </div>
      ) : commits.length === 0 && !error ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
            <GitCommit size={24} />
          </div>
          <p className="text-sm font-semibold text-heading">
            No commits found for this branch.
          </p>
          <p className="mt-1 text-xs text-body">
            This branch may be empty or newly created.
          </p>
        </div>
      ) : (
        /* Commit List */
        <div className="space-y-3">
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
                onClick={onLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-heading shadow-xs hover:border-primary/50 hover:bg-surface-hover hover:text-primary disabled:opacity-60 transition-all cursor-pointer"
              >
                {loadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-primary" />
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
