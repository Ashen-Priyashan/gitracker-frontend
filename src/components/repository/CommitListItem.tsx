import { GitCommit, User } from "lucide-react";
import type { CommitSummary } from "../../types/repositoryActivity";
import { formatRelativeTime } from "../../utils/dateUtils";

type CommitListItemProps = {
  commit: CommitSummary;
  onSelect: (sha: string) => void;
};

export default function CommitListItem({
  commit,
  onSelect,
}: CommitListItemProps) {
  // Extract first line of commit message for the summary
  const firstLineMessage =
    commit.message.split("\n")[0] || "No commit message";
  const displayTime = formatRelativeTime(
    commit.committedAt || commit.authoredAt,
  );

  return (
    <button
      type="button"
      onClick={() => onSelect(commit.sha)}
      className="group flex w-full flex-col gap-2.5 sm:gap-3 rounded-xl border border-border/70 bg-surface/70 px-4 py-3 text-left transition-all duration-150 hover:border-border hover:bg-surface-hover/80 active:scale-[0.995] focus:outline-hidden focus:ring-2 focus:ring-primary/20 sm:flex-row sm:items-center sm:justify-between shadow-2xs"
    >
      <div className="flex items-start gap-3 min-w-0">
        {/* Author Avatar or Initial Fallback */}
        <div className="shrink-0 pt-0.5">
          {commit.authorAvatarUrl ? (
            <img
              src={commit.authorAvatarUrl}
              alt={commit.authorName || "Author avatar"}
              className="h-7 w-7 rounded-full border border-border/70 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-hover text-muted border border-border/70 text-2xs font-bold uppercase">
              {commit.authorName ? (
                commit.authorName.slice(0, 2).toUpperCase()
              ) : (
                <User size={12} />
              )}
            </div>
          )}
        </div>

        {/* Message and Author Meta */}
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="truncate text-xs sm:text-sm font-semibold text-heading group-hover:text-primary transition-colors">
            {firstLineMessage}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted">
            <span className="font-medium text-body">
              {commit.authorName}
            </span>
            {commit.authorLogin && (
              <span className="text-muted">@{commit.authorLogin}</span>
            )}
            <span>·</span>
            <span>{displayTime}</span>
          </div>
        </div>
      </div>

      {/* SHA badge */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-surface px-2 py-0.5 font-mono text-2xs font-medium text-muted group-hover:text-heading group-hover:border-border transition-colors">
          <GitCommit size={11} className="text-muted" />
          {commit.shortSha}
        </span>
      </div>
    </button>
  );
}
