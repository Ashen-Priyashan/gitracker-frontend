import apiClient from "../api/apiClient";
import type { ReadmeResponse, Repository } from "../types/profile";
import type {
  Branch,
  CommitDetail,
  CommitSummary,
} from "../types/repositoryActivity";

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

const getRepositoryBranches = async (
  username: string,
  repoName: string,
): Promise<Branch[]> => {
  const response = await apiClient.get<Branch[]>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/branches`,
  );

  return response.data;
};

const getRepositoryCommits = async (
  username: string,
  repoName: string,
  branch?: string,
  page: number = 1,
  perPage: number = 20,
): Promise<CommitSummary[]> => {
  const params = new URLSearchParams();
  if (branch) {
    params.append("branch", branch);
  }
  params.append("page", String(page));
  params.append("perPage", String(perPage));

  const response = await apiClient.get<CommitSummary[]>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/commits?${params.toString()}`,
  );

  return response.data;
};

const getRepositoryCommitDetail = async (
  username: string,
  repoName: string,
  sha: string,
): Promise<CommitDetail> => {
  const response = await apiClient.get<CommitDetail>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/commits/${encodeURIComponent(sha)}`,
  );

  return response.data;
};

export {
  getRepositories,
  getRepositoryDetails,
  getRepositoryReadme,
  getRepositoryBranches,
  getRepositoryCommits,
  getRepositoryCommitDetail,
};