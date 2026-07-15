import {
  CalendarDays,
  Eye,
  GitFork,
  Star,
} from "lucide-react";

import type { Repository } from "../../types/profile";

type RepositoryDetailsCardProps = {
  repository: Repository;
};

function RepositoryDetailsCard({
  repository,
}: RepositoryDetailsCardProps) {
  const createdDate = new Date(
    repository.createdAt,
  ).toLocaleDateString();

  const updatedDate = new Date(
    repository.updatedAt,
  ).toLocaleDateString();

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-border bg-surface p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-heading">
              {repository.name}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-body">
              {repository.description ??
                "No description available."}
            </p>
          </div>

          <span className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {repository.language ?? "Unknown"}
          </span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <Star size={20} />
            <span className="font-medium">
              Stars
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-heading">
            {repository.stars.toLocaleString()}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <GitFork size={20} />
            <span className="font-medium">
              Forks
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-heading">
            {repository.forks.toLocaleString()}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <Eye size={20} />
            <span className="font-medium">
              Watchers
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-heading">
            {repository.watchers.toLocaleString()}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <CalendarDays size={20} />
            <span className="font-medium">
              Language
            </span>
          </div>

          <p className="mt-4 text-xl font-bold text-heading">
            {repository.language ?? "Unknown"}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-8">
        <h2 className="text-xl font-bold text-heading">
          Repository Information
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-body">
              Created
            </p>

            <p className="mt-1 font-semibold text-heading">
              {createdDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-body">
              Last Updated
            </p>

            <p className="mt-1 font-semibold text-heading">
              {updatedDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-body">
              Primary Language
            </p>

            <p className="mt-1 font-semibold text-heading">
              {repository.language ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-sm text-body">
              Repository Name
            </p>

            <p className="mt-1 font-semibold text-heading">
              {repository.name}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-border bg-surface p-8">
        <h2 className="text-xl font-bold text-heading">
          Future Repository Insights
        </h2>

        <p className="mt-4 leading-7 text-body">
          This page is designed to support additional repository insights in future
          updates, including README previews, topics, license information,
          default branch, open issues, commit activity and other GitHub metadata.
        </p>
      </div>
    </section>
  );
}

export default RepositoryDetailsCard;