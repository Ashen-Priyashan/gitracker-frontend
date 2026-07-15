import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import RepositoryDetailsCard from "../components/repository/RepositoryDetailsCard";
import ProfileError from "../components/profile/ProfileError";
import ProfileLoading from "../components/profile/ProfileLoading";
import { getRepositories } from "../services/repositoryService";
import type {
  ApiError,
  Repository,
} from "../types/profile";

function RepositoryDetailsPage() {
  const { username, repositoryName } = useParams<{
    username: string;
    repositoryName: string;
  }>();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        const data = await getRepositories(username);

        setRepositories(data);
      } catch (requestError) {
        if (axios.isAxiosError<ApiError>(requestError)) {
          setError(
            requestError.response?.data.message ??
              "Unable to load repository.",
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

  const repository = useMemo(() => {
    if (!repositoryName) {
      return null;
    }

    return (
      repositories.find(
        (item) =>
          item.name.toLowerCase() ===
          decodeURIComponent(repositoryName).toLowerCase(),
      ) ?? null
    );
  }, [repositories, repositoryName]);

  if (loading) {
    return <ProfileLoading />;
  }

  if (error) {
    return <ProfileError message={error} />;
  }

  if (!repository) {
    return (
      <ProfileError message="Repository not found." />
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Repository
        </p>

        <h1 className="mt-2 break-all text-3xl font-bold tracking-tight text-heading">
          {repository.name}
        </h1>

        <p className="mt-3 max-w-2xl text-body">
          Repository details and statistics.
        </p>
      </div>

      <RepositoryDetailsCard
        repository={repository}
      />
    </div>
  );
}

export default RepositoryDetailsPage;