import {
  CalendarDays,
  Eye,
  GitFork,
  Star,
} from "lucide-react";

import type { Repository } from "../../types/profile";

type RepositoryListCardProps = {
  repository: Repository;
};

function RepositoryListCard({
  repository,
}: RepositoryListCardProps) {
  const updatedDate = new Date(
    repository.updatedAt,
  ).toLocaleDateString();

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {repository.name}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {repository.description ?? "No description available."}
          </p>
        </div>

        <span className="rounded-xl bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
          {repository.language ?? "Unknown"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Star size={17} />
          <span>{repository.stars.toLocaleString()} stars</span>
        </div>

        <div className="flex items-center gap-2">
          <GitFork size={17} />
          <span>{repository.forks.toLocaleString()} forks</span>
        </div>

        <div className="flex items-center gap-2">
          <Eye size={17} />
          <span>{repository.watchers.toLocaleString()} watchers</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={17} />
          <span>Updated {updatedDate}</span>
        </div>
      </div>
    </article>
  );
}

export default RepositoryListCard;