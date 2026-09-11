import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import RepositoryDetailsCard from "../components/repository/RepositoryDetailsCard";
import ProfileError from "../components/profile/ProfileError";
import RepositoryDetailsLoading from "../components/loading/RepositoryDetailsLoading";
import { getRepositoryDetails } from "../services/repositoryService";
import type {
  ApiError,
  Repository,
} from "../types/profile";

function RepositoryDetailsPage() {
  const { username, repositoryName } = useParams<{
    username: string;
    repositoryName: string;
  }>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRepository = async () => {
      if (!username || !repositoryName) {
        if (isMounted) {
          setError("GitHub username and repository name are required.");
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        const data = await getRepositoryDetails(username, repositoryName);

        if (isMounted) {
          setRepository(data);
        }
      } catch (requestError) {
        if (!isMounted) return;
        if (axios.isAxiosError<ApiError>(requestError)) {
          setError(
            requestError.response?.data.message ??
              "Unable to load repository.",
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRepository();

    return () => {
      isMounted = false;
    };
  }, [username, repositoryName]);

  if (loading) {
    return <RepositoryDetailsLoading />;
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
    <div className="space-y-6 py-2">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted mb-3 flex-wrap">
          <Link
            to={`/profile/${encodeURIComponent(username ?? "")}`}
            className="hover:text-heading transition-colors"
          >
            @{username}
          </Link>
          <span>/</span>
          <Link
            to={`/profile/${encodeURIComponent(username ?? "")}/repositories`}
            className="hover:text-heading transition-colors"
          >
            repositories
          </Link>
          <span>/</span>
          <span className="text-heading font-semibold">{repository.name}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="break-all text-2xl sm:text-3xl font-bold tracking-tight text-heading">
            {repository.name}
          </h1>

          <p className="text-xs sm:text-sm text-body max-w-2xl">
            Repository intelligence, commit activity, contributor rankings, and code telemetry.
          </p>
        </div>
      </div>

      <RepositoryDetailsCard
        repository={repository}
        username={username!}
      />
    </div>
  );
}

export default RepositoryDetailsPage;
