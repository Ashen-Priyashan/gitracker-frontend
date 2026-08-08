import {
  CalendarDays,
  Eye,
  GitFork,
  Star,
  GitBranch,
  CircleDot,
  Scale,
  Tag,
  ExternalLink,
  HardDrive,
  Archive,
} from "lucide-react";

import type { Repository } from "../../types/profile";
import ReadmePreviewCard from "./ReadmePreviewCard";

type RepositoryDetailsCardProps = {
  repository: Repository;
  username: string;
};

function formatSize(sizeInKb?: number): string {
  if (sizeInKb == null) return "N/A";
  if (sizeInKb < 1024) return `${sizeInKb} KB`;
  return `${(sizeInKb / 1024).toFixed(2)} MB`;
}

function RepositoryDetailsCard({
  repository,
  username,
}: RepositoryDetailsCardProps) {
  const createdDate = new Date(repository.createdAt).toLocaleDateString();
  const updatedDate = new Date(repository.updatedAt).toLocaleDateString();

  return (
    <section className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-3xl border border-border bg-surface p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-heading">
                {repository.name}
              </h2>

              {repository.archived && (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20">
                  <Archive size={12} />
                  Archived
                </span>
              )}
            </div>

            <p className="max-w-3xl leading-7 text-body">
              {repository.description ?? "No description available."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {repository.language && (
              <span className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                {repository.language}
              </span>
            )}

            {repository.htmlUrl && (
              <a
                href={repository.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-heading hover:bg-surface-hover transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <Star size={20} />
            <span className="font-medium">Stars</span>
          </div>

          <p className="mt-4 text-3xl font-bold text-heading">
            {repository.stars.toLocaleString()}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <GitFork size={20} />
            <span className="font-medium">Forks</span>
          </div>

          <p className="mt-4 text-3xl font-bold text-heading">
            {repository.forks.toLocaleString()}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <Eye size={20} />
            <span className="font-medium">Watchers</span>
          </div>

          <p className="mt-4 text-3xl font-bold text-heading">
            {repository.watchers.toLocaleString()}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 text-primary">
            <CalendarDays size={20} />
            <span className="font-medium">Language</span>
          </div>

          <p className="mt-4 text-xl font-bold text-heading">
            {repository.language ?? "Unknown"}
          </p>
        </div>
      </div>

      {/* Repository Insights & Metadata Grid */}
      <div className="rounded-3xl border border-border bg-surface p-8">
        <h2 className="text-xl font-bold text-heading">
          Repository Metadata & Insights
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border/50 bg-black/10 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-body">
              <GitBranch size={14} className="text-primary" />
              <span>Default Branch</span>
            </div>
            <p className="mt-2 font-mono font-bold text-heading text-lg">
              {repository.defaultBranch ?? "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-black/10 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-body">
              <CircleDot size={14} className="text-primary" />
              <span>Open Issues</span>
            </div>
            <p className="mt-2 font-bold text-heading text-lg">
              {repository.openIssues != null ? repository.openIssues.toLocaleString() : "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-black/10 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-body">
              <Scale size={14} className="text-primary" />
              <span>License</span>
            </div>
            <p className="mt-2 font-bold text-heading text-sm truncate">
              {repository.licenseName ?? "No license specified"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-black/10 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-body">
              <HardDrive size={14} className="text-primary" />
              <span>Repo Size</span>
            </div>
            <p className="mt-2 font-bold text-heading text-lg">
              {formatSize(repository.size)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 pt-4 border-t border-border/60">
          <div>
            <p className="text-sm text-body">Created Date</p>
            <p className="mt-1 font-semibold text-heading">{createdDate}</p>
          </div>

          <div>
            <p className="text-sm text-body">Last Updated</p>
            <p className="mt-1 font-semibold text-heading">{updatedDate}</p>
          </div>
        </div>
      </div>

      {/* Topics Pill Badge Section */}
      {repository.topics && repository.topics.length > 0 && (
        <div className="rounded-3xl border border-border bg-surface p-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag size={18} className="text-primary" />
            <h2 className="text-xl font-bold text-heading">Topics</h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {repository.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* README Preview Card Component */}
      <ReadmePreviewCard
        username={username}
        repositoryName={repository.name}
      />
    </section>
  );
}

export default RepositoryDetailsCard;