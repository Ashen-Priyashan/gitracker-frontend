import {
  CalendarDays,
  Eye,
  GitFork,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import type { Repository } from "../../types/profile";

type RepositoryListCardProps = {
  repository: Repository;
};

function RepositoryListCard({
  repository,
}: RepositoryListCardProps) {
  const { username } = useParams<{ username: string }>();

  const updatedDate = new Date(
    repository.updatedAt,
  ).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      to={`/profile/${encodeURIComponent(
        username ?? "",
      )}/repositories/${encodeURIComponent(repository.name)}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
    >
      <article className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 transition-colors duration-150 hover:bg-surface-hover/80 hover:border-border">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-heading tracking-tight group-hover:text-primary transition-colors truncate">
                {repository.name}
              </h2>

              {repository.archived && (
                <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 shrink-0">
                  Archived
                </span>
              )}
            </div>

            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-body line-clamp-2 max-w-3xl">
              {repository.description ?? "No description available."}
            </p>
          </div>

          {repository.language && (
            <span className="self-start shrink-0 rounded-md bg-surface-hover px-2.5 py-1 text-xs font-medium text-body border border-border/60">
              {repository.language}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-border/40 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-muted" />
            <span className="tabular-nums font-medium text-heading">
              {repository.stars.toLocaleString()}
            </span>
            <span>stars</span>
          </div>

          <div className="flex items-center gap-1.5">
            <GitFork size={13} className="text-muted" />
            <span className="tabular-nums font-medium text-heading">
              {repository.forks.toLocaleString()}
            </span>
            <span>forks</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye size={13} className="text-muted" />
            <span className="tabular-nums font-medium text-heading">
              {repository.watchers.toLocaleString()}
            </span>
            <span>watchers</span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto sm:ml-0 text-muted/80">
            <CalendarDays size={13} />
            <span>Updated {updatedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default RepositoryListCard;