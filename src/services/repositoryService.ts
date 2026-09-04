import apiClient from "../api/apiClient";
import type { ReadmeResponse, Repository } from "../types/profile";

const getRepositories = async (
  username: string,
): Promise<Repository[]> => {
  const response = await apiClient.get<Repository[]>(
    `/api/users/${encodeURIComponent(username)}/repositories`,
  );

  return response.data;
};

const getRepositoryDetails = async (
  username: string,
  repoName: string,
): Promise<Repository> => {
  const response = await apiClient.get<Repository>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}`,
  );

  return response.data;
};

const getRepositoryReadme = async (
  username: string,
  repoName: string,
): Promise<ReadmeResponse> => {
  const response = await apiClient.get<ReadmeResponse>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/readme`,
  );

  return response.data;
};

export { getRepositories, getRepositoryDetails, getRepositoryReadme };