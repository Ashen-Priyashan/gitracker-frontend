import { GitFork, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import type { Repository } from "../../types/profile";

type RepositoryCardProps = {
  repository: Repository;
};

function RepositoryCard({
  repository,
}: RepositoryCardProps) {
  const { username } = useParams<{ username: string }>();

  return (
    <Link
      to={`/profile/${encodeURIComponent(
        username ?? "",
      )}/repositories/${encodeURIComponent(repository.name)}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
    >
      <article className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-surface p-5 transition-colors duration-150 hover:bg-surface-hover/80 hover:border-border">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-heading tracking-tight group-hover:text-primary transition-colors truncate">
              {repository.name}
            </h3>

            {repository.language && (
              <span className="shrink-0 rounded-md bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-body border border-border/60">
                {repository.language}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-body line-clamp-2">
            {repository.description ?? "No description provided."}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-4 pt-3 border-t border-border/40 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-muted" />
            <span className="tabular-nums font-medium text-heading">
              {repository.stars.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <GitFork size={13} className="text-muted" />
            <span className="tabular-nums font-medium text-heading">
              {repository.forks.toLocaleString()}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default RepositoryCard;