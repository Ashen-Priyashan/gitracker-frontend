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
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Codebases
          </p>

          <h2 className="mt-0.5 text-xl font-bold tracking-tight text-heading">
            Repositories
          </h2>
        </div>

        {username && (
          <Link
            to={`/profile/${encodeURIComponent(username)}/repositories`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
          >
            <span>View All ({repositories.length})</span>
            <ArrowRight size={13} />
          </Link>
        )}
      </div>

      {previewRepositories.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewRepositories.map((repository) => (
            <RepositoryCard
              key={repository.name}
              repository={repository}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/80 bg-surface p-8 text-center text-sm text-body">
          No public repositories available for this user.
        </div>
      )}
    </section>
  );
}

export default RepositoryPreview;