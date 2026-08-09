import apiClient from "../api/apiClient";
import type { ProfileSummary } from "../types/profile";

const getProfileSummary = async (
  username: string,
): Promise<ProfileSummary> => {
  const response = await apiClient.get<ProfileSummary>(
    `/api/profile/${username}`,
  );

  return response.data;
};

export { getProfileSummary };