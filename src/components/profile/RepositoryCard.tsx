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
      className="block"
    >
      <article className="rounded-2xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:shadow-md">
        <h3 className="font-semibold text-heading">
          {repository.name}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-6 text-body">
          {repository.description ?? "No description available."}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-body">
          <span className="font-medium text-primary">
            {repository.language ?? "Unknown"}
          </span>

          <div className="flex items-center gap-1.5">
            <Star size={16} />
            <span>{repository.stars.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <GitFork size={16} />
            <span>{repository.forks.toLocaleString()}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default RepositoryCard;