import apiClient from "../api/apiClient";
import type { ReadmeResponse, Repository } from "../types/profile";
import type {
  Branch,
  CommitDetail,
  CommitSummary,
} from "../types/repositoryActivity";
import type {
  CodeFrequencyResponse,
  CommitActivityResponse,
  Contributor,
  ParticipationResponse,
} from "../types/repositoryIntelligence";

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

const getRepositoryContributors = async (
  username: string,
  repoName: string,
): Promise<Contributor[]> => {
  const response = await apiClient.get<Contributor[]>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/contributors`,
  );

  return response.data;
};

const getRepositoryCommitActivity = async (
  username: string,
  repoName: string,
): Promise<CommitActivityResponse> => {
  const response = await apiClient.get<CommitActivityResponse>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/stats/commit-activity`,
  );

  return response.data;
};

const getRepositoryCodeFrequency = async (
  username: string,
  repoName: string,
): Promise<CodeFrequencyResponse> => {
  const response = await apiClient.get<CodeFrequencyResponse>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/stats/code-frequency`,
  );

  return response.data;
};

const getRepositoryParticipation = async (
  username: string,
  repoName: string,
): Promise<ParticipationResponse> => {
  const response = await apiClient.get<ParticipationResponse>(
    `/api/users/${encodeURIComponent(username)}/repositories/${encodeURIComponent(repoName)}/stats/participation`,
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
  getRepositoryContributors,
  getRepositoryCommitActivity,
  getRepositoryCodeFrequency,
  getRepositoryParticipation,
};