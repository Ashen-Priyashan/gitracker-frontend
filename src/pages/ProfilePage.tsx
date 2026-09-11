import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnalyticsSummary from "../components/profile/AnalyticsSummary";
import LanguageCard from "../components/profile/LanguageCard";
import RepositoryPreview from "../components/profile/RepositoryPreview";
import ProfileError from "../components/profile/ProfileError";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileLoading from "../components/profile/ProfileLoading";
import { getProfileSummary } from "../services/profileService";
import { addRecentSearch } from "../utils/recentSearches";

import type {
  ApiError,
  ProfileSummary,
} from "../types/profile";

function formatErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    const status = error.response?.status;
    const backendMessage = error.response?.data?.message;

    if (status === 404) {
      return backendMessage || "GitHub user not found. Please check the username and try again.";
    }
    if (status === 429) {
      return backendMessage || "GitHub API rate limit exceeded. Please try again in a few moments.";
    }
    if (status === 403) {
      return backendMessage || "GitHub API access is temporarily restricted. Please try again later.";
    }
    if (status === 401) {
      return backendMessage || "Authentication error when communicating with GitHub.";
    }
    if (status === 400 || status === 422) {
      return backendMessage || "Invalid request parameters for GitHub profile.";
    }
    if (status && status >= 500) {
      return backendMessage || "GitHub services are temporarily unavailable. Please try again shortly.";
    }
    return backendMessage || "Unable to load the GitHub profile.";
  }
  return "An unexpected error occurred. Please try again later.";
}

function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!username) {
      setError("GitHub username is required.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const profileSummary = await getProfileSummary(username);

      setProfile(profileSummary);
      addRecentSearch(profileSummary.user.username);
    } catch (requestError) {
      setError(formatErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!username) {
        setError("GitHub username is required.");
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const profileSummary = await getProfileSummary(username);
        if (isMounted) {
          setProfile(profileSummary);
          addRecentSearch(profileSummary.user.username);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(formatErrorMessage(requestError));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [username]);

  if (loading) {
    return <ProfileLoading />;
  }

  if (error) {
    return <ProfileError message={error} onRetry={fetchProfile} />;
  }

  if (!profile) {
    return (
      <ProfileError message="Profile data is unavailable." onRetry={fetchProfile} />
    );
  }

  return (
    <div className="space-y-10 py-2">
      <ProfileHeader user={profile.user} />

      <AnalyticsSummary analytics={profile.analytics} />

      <LanguageCard
        language={profile.analytics.mostUsedLanguage}
      />

      <RepositoryPreview
        repositories={profile.repositories}
      />
    </div>
  );
}

export default ProfilePage;