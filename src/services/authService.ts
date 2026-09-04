import apiClient from "../api/apiClient";

export interface UserAuth {
  id: number;
  name: string;
  email: string;
  githubConnected: boolean;
  githubUsername: string | null;
  githubAvatarUrl: string | null;
  createdAt: string | null;
}

export interface SignUpRequestData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface AuthStatusResponse {
  authenticated: boolean;
  user?: UserAuth;
}

export const authService = {
  signUp: async (data: SignUpRequestData): Promise<UserAuth> => {
    const response = await apiClient.post<UserAuth>("/api/auth/signup", data);
    return response.data;
  },

  login: async (data: LoginRequestData): Promise<UserAuth> => {
    const response = await apiClient.post<UserAuth>("/api/auth/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/api/auth/logout");
  },

  linkGithub: async (username: string): Promise<UserAuth> => {
    const response = await apiClient.post<UserAuth>("/api/auth/link-github", { username });
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthStatusResponse> => {
    const response = await apiClient.get<AuthStatusResponse>("/api/auth/me");
    return response.data;
  },
};
