import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        username={username!}
      />
    </div>
  );
}

export default RepositoryDetailsPage;
