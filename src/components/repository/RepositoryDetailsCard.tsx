import { useState } from "react";
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
import RepositoryActivity from "./RepositoryActivity";
import RepositoryIntelligenceNav, { type RepositoryTab } from "./RepositoryIntelligenceNav";
import ContributorAnalytics from "./ContributorAnalytics";
import CommitActivityTrends from "./CommitActivityTrends";

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
  const [activeTab, setActiveTab] = useState<RepositoryTab>("overview");
  const createdDate = new Date(repository.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(repository.updatedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="space-y-6">
      {/* Top Header Workspace Card */}
      <div className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-heading">
                {repository.name}
              </h2>

              {repository.archived && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Archive size={12} />
                  Archived
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-body">
              {repository.description ?? "No description provided for this repository."}
            </p>

            {/* Inline Topics */}
            {repository.topics && repository.topics.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <Tag size={13} className="text-muted mr-1 shrink-0" />
                {repository.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-md border border-border/80 bg-surface-hover/50 px-2 py-0.5 text-xs font-medium text-muted hover:text-heading transition-colors"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
            {repository.language && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface-hover/70 px-3 py-1.5 text-xs font-medium text-heading">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {repository.language}
              </span>
            )}

            {repository.htmlUrl && (
              <a
                href={repository.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs font-medium text-heading hover:bg-surface-hover transition-colors shadow-2xs"
              >
                <span>GitHub</span>
                <ExternalLink size={13} className="text-muted" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Repository Intelligence Navigation */}
      <RepositoryIntelligenceNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Tab 1: Overview & Commits (Default Experience) */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Main Key Statistics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                <Star size={14} className="text-amber-500" />
                <span>Stars</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-heading tabular-nums">
                {repository.stars.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                <GitFork size={14} className="text-primary" />
                <span>Forks</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-heading tabular-nums">
                {repository.forks.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                <Eye size={14} className="text-indigo-500" />
                <span>Watchers</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-heading tabular-nums">
                {repository.watchers.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-surface p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                <CircleDot size={14} className="text-emerald-500" />
                <span>Open Issues</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-heading tabular-nums">
                {repository.openIssues != null ? repository.openIssues.toLocaleString() : "0"}
              </p>
            </div>
          </div>

          {/* Repository Metadata & Details */}
          <div className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-6 shadow-2xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Repository Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <GitBranch size={13} />
                  <span>Default Branch</span>
                </div>
                <p className="mt-1 font-mono text-xs sm:text-sm font-semibold text-heading truncate">
                  {repository.defaultBranch ?? "main"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Scale size={13} />
                  <span>License</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-heading truncate" title={repository.licenseName ?? "None"}>
                  {repository.licenseName ?? "No license"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <HardDrive size={13} />
                  <span>Disk Size</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-heading tabular-nums">
                  {formatSize(repository.size)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <CalendarDays size={13} />
                  <span>Last Updated</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-heading tabular-nums">
                  {updatedDate}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted">
              <span>Created on {createdDate}</span>
              <span>Language: {repository.language ?? "N/A"}</span>
            </div>
          </div>

          {/* Repository Activity (Branch Selector & Commit History) */}
          <RepositoryActivity
            username={username}
            repositoryName={repository.name}
            defaultBranch={repository.defaultBranch}
          />

          {/* README Preview Card */}
          <ReadmePreviewCard
            username={username}
            repositoryName={repository.name}
          />
        </div>
      )}

      {/* Tab 2: Contributor Analytics */}
      {activeTab === "contributors" && (
        <ContributorAnalytics
          username={username}
          repositoryName={repository.name}
        />
      )}

      {/* Tab 3: Commit Activity & Trends */}
      {activeTab === "activity" && (
        <CommitActivityTrends
          username={username}
          repositoryName={repository.name}
        />
      )}
    </section>
  );
}

export default RepositoryDetailsCard;