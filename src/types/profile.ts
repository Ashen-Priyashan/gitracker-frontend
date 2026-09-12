export type GitHubUser = {
  username: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  avatarUrl: string;
  createdAt: string;
};

export type Repository = {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  defaultBranch?: string;
  openIssues?: number;
  licenseName?: string | null;
  topics?: string[];
  htmlUrl?: string | null;
  size?: number;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ReadmeResponse = {
  content: string | null;
  htmlUrl: string | null;
  exists: boolean;
};

export type AnalyticsGitHubUser = {
  id: number;
  githubId: number;
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
  updatedAt: string;
};

export type UserAnalytics = {
  id: number;
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  mostUsedLanguage: string | null;
  calculatedAt: string;
  githubUser: AnalyticsGitHubUser;
};

export type ProfileSummary = {
  user: GitHubUser;
  analytics: UserAnalytics;
  repositories: Repository[];
};

export type ApiError = {
  message: string;
  status: number;
  timestamp: string;
  retryAfterSeconds?: number;
  resetTimeSeconds?: number;
};