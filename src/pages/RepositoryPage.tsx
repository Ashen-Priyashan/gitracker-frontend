import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Repository Analytics
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          {username}&apos;s repositories
        </h1>

        <p className="mt-3 text-body">
          Explore repository activity, languages, stars, forks, and watchers.
        </p>
      </div>

      <div className="mt-8">
        <RepositoryFilters
          search={search}
          sort={sort}
          onSearchChange={setSearch}
          onSortChange={setSort}
        />
      </div>

      <p className="mt-6 text-sm text-body">
        Showing {displayedRepositories.length} of {repositories.length} repositories
      </p>

      {displayedRepositories.length > 0 ? (
        <div className="mt-5 grid gap-5">
          {displayedRepositories.map((repository) => (
            <RepositoryListCard
              key={repository.name}
              repository={repository}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-border bg-surface p-10 text-center">
          <p className="text-body">
            No repositories match your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default RepositoryPage;
