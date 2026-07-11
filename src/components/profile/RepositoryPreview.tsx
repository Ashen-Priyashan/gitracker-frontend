import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import type { Repository } from "../../types/profile";
import RepositoryCard from "./RepositoryCard";

type RepositoryPreviewProps = {
  repositories: Repository[];
};

function RepositoryPreview({
  repositories,
}: RepositoryPreviewProps) {
  const previewRepositories = repositories.slice(0, 6);
  const { username } = useParams<{ username: string }>();

  return (
    <section className="rounded-3xl border border-border bg-surface p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Repositories
          </p>

          <h2 className="mt-2 text-2xl font-bold text-heading">
            Repository overview
          </h2>
        </div>

        {username && (
          <Link
            to={`/profile/${encodeURIComponent(username)}/repositories`}
            className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
          >
            View all
            <ArrowRight size={17} />
          </Link>
        )}
      </div>

      {previewRepositories.length > 0 ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {previewRepositories.map((repository) => (
            <RepositoryCard
              key={repository.name}
              repository={repository}
            />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-body">
          No repositories available.
        </p>
      )}
    </section>
  );
}

export default RepositoryPreview;