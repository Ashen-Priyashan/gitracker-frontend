import { createContext } from "react";
import type {
  LoginRequestData,
  SignUpRequestData,
  UserAuth,
} from "../services/authService";

export interface AuthContextType {
  user: UserAuth | null;
  loading: boolean;
  githubConnected: boolean;
  login: (data: LoginRequestData) => Promise<UserAuth>;
  signUp: (data: SignUpRequestData) => Promise<UserAuth>;
  logout: () => Promise<void>;
  linkGithub: (username: string) => Promise<UserAuth>;
  refreshUser: () => Promise<UserAuth | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
