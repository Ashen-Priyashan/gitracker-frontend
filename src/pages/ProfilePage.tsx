import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileError from "../components/profile/ProfileError";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileLoading from "../components/profile/ProfileLoading";
import { getProfileSummary } from "../services/profileService";
import type {
  ApiError,
  ProfileSummary,
} from "../types/profile";

function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
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
      } catch (requestError) {
        if (axios.isAxiosError<ApiError>(requestError)) {
          setError(
            requestError.response?.data.message ??
              "Unable to load the GitHub profile.",
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return <ProfileLoading />;
  }

  if (error) {
    return <ProfileError message={error} />;
  }

  if (!profile) {
    return (
      <ProfileError message="Profile data is unavailable." />
    );
  }

  return <ProfileHeader user={profile.user} />;
}

export default ProfilePage;