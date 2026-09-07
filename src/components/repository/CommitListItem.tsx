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
      className="group flex w-full flex-col gap-3 rounded-2xl border border-border bg-surface p-4 text-left transition-all hover:border-primary/50 hover:bg-surface-hover/80 hover:shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3 min-w-0">
        {/* Author Avatar or Initial Fallback */}
        <div className="shrink-0 pt-0.5">
          {commit.authorAvatarUrl ? (
            <img
              src={commit.authorAvatarUrl}
              alt={commit.authorName || "Author avatar"}
              className="h-8 w-8 rounded-full border border-border/80 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase">
              {commit.authorName ? (
                commit.authorName.slice(0, 2).toUpperCase()
              ) : (
                <User size={14} />
              )}
            </div>
          )}
        </div>

        {/* Message and Author Meta */}
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-semibold text-heading group-hover:text-primary transition-colors">
            {firstLineMessage}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-body">
            <span className="font-medium text-heading/80">
              {commit.authorName}
            </span>
            {commit.authorLogin && (
              <span className="text-body/70">@{commit.authorLogin}</span>
            )}
            <span>·</span>
            <span>{displayTime}</span>
          </div>
        </div>
      </div>

      {/* SHA badge */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 font-mono text-xs font-semibold text-primary group-hover:border-primary/40 transition-colors">
          <GitCommit size={13} />
          {commit.shortSha}
        </span>
      </div>
    </button>
  );
}
