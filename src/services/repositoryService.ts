import apiClient from "../api/apiClient";
import type { Repository } from "../types/profile";

const getRepositories = async (
  username: string,
): Promise<Repository[]> => {
  const response = await apiClient.get<Repository[]>(
    `/api/users/${username}/repositories`,
  );

  return response.data;
};

export { getRepositories };