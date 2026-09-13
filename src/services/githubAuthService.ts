import apiClient from "../api/apiClient";
import { ensureCsrfToken } from "./authService";
import type { Repository } from "../types/profile";

export interface GitHubConnectionStatus {
  connected: boolean;
  username: string | null;
  avatarUrl: string | null;
  connectedAt: string | null;
}

export interface AuthorizeUrlResponse {
  url: string;
}

export interface DisconnectResponse {
  message: string;
}

export const githubAuthService = {
  getAuthorizationUrl: async (): Promise<AuthorizeUrlResponse> => {
    const response = await apiClient.get<AuthorizeUrlResponse>("/api/github/authorize");
    return response.data;
  },

  getConnectionStatus: async (): Promise<GitHubConnectionStatus> => {
    const response = await apiClient.get<GitHubConnectionStatus>("/api/github/status");
    return response.data;
  },

  disconnectGitHub: async (): Promise<DisconnectResponse> => {
    await ensureCsrfToken();
    const response = await apiClient.post<DisconnectResponse>("/api/github/disconnect");
    return response.data;
  },

  getAuthenticatedRepositories: async (): Promise<Repository[]> => {
    const response = await apiClient.get<Repository[]>("/api/github/user/repositories");
    return response.data;
  },
};
