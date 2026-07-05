import { GitFork, Star } from "lucide-react";

import type { Repository } from "../../types/profile";

type RepositoryCardProps = {
  repository: Repository;
};

function RepositoryCard({
  repository,
}: RepositoryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <h3 className="font-semibold text-slate-900">
        {repository.name}
      </h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
        {repository.description ?? "No description available."}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span className="font-medium text-blue-600">
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
  );
}

export default RepositoryCard;