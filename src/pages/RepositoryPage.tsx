import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProfileError from "../components/profile/ProfileError";
import RepositoryListLoading from "../components/loading/RepositoryListLoading";
import RepositoryFilters from "../components/repository/RepositoryFilters";
import RepositoryListCard from "../components/repository/RepositoryListCard";
import { getRepositories } from "../services/repositoryService";
import type {
  ApiError,
  Repository,
} from "../types/profile";

function RepositoryPage() {
  const { username } = useParams<{ username: string }>();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!username) {
        setError("GitHub username is required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const repositoryData = await getRepositories(username);

        setRepositories(repositoryData);
      } catch (requestError) {
        if (axios.isAxiosError<ApiError>(requestError)) {
          setError(
            requestError.response?.data.message ??
              "Unable to load repositories.",
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  const displayedRepositories = useMemo(() => {
    const filteredRepositories = repositories.filter((repository) =>
      repository.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (sort === "stars") {
      return [...filteredRepositories].sort(
        (first, second) => second.stars - first.stars,
      );
    }

    if (sort === "forks") {
      return [...filteredRepositories].sort(
        (first, second) => second.forks - first.forks,
      );
    }

    if (sort === "updated") {
      return [...filteredRepositories].sort(
        (first, second) =>
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime(),
      );
    }

    return filteredRepositories;
  }, [repositories, search, sort]);

  if (loading) return <RepositoryListLoading />;

  if (error) return <ProfileError message={error} />;

  return (
    <div className="space-y-6 py-2">
      <div>
        <Link
          to={`/profile/${encodeURIComponent(username ?? "")}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-heading transition-colors mb-3"
        >
          <span>&larr; Back to @{username}&apos;s profile</span>
        </Link>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Repositories
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-heading">
            @{username}&apos;s repositories
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-body max-w-2xl">
            Explore repository codebases, activity, language metrics, stars, and forks.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <RepositoryFilters
          search={search}
          sort={sort}
          onSearchChange={setSearch}
          onSortChange={setSort}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Showing <strong className="text-heading tabular-nums">{displayedRepositories.length}</strong> of{" "}
          <span className="tabular-nums">{repositories.length}</span> repositories
        </span>
      </div>

      {displayedRepositories.length > 0 ? (
        <div className="grid gap-3 sm:gap-4">
          {displayedRepositories.map((repository) => (
            <RepositoryListCard
              key={repository.name}
              repository={repository}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/80 bg-surface p-12 text-center space-y-2">
          <p className="text-base font-semibold text-heading">
            No repositories found
          </p>
          <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto">
            {search
              ? `No repositories match "${search}". Try adjusting your search query.`
              : "This user does not have any public repositories available."}
          </p>
        </div>
      )}
    </div>
  );
}

export default RepositoryPage;
