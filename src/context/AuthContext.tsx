import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  AuthStatusResponse,
  LoginRequestData,
  SignUpRequestData,
  UserAuth,
} from "../services/authService";
import { authService } from "../services/authService";

interface AuthContextType {
  user: UserAuth | null;
  loading: boolean;
  githubConnected: boolean;
  login: (data: LoginRequestData) => Promise<UserAuth>;
  signUp: (data: SignUpRequestData) => Promise<UserAuth>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<UserAuth | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async (): Promise<UserAuth | null> => {
    try {
      const data: AuthStatusResponse = await authService.getCurrentUser();
      if (data.authenticated && data.user) {
        setUser(data.user);
        return data.user;
      } else {
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error("Failed to check auth status:", err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (data: LoginRequestData): Promise<UserAuth> => {
    const loggedInUser = await authService.login(data);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signUp = async (data: SignUpRequestData): Promise<UserAuth> => {
    const registeredUser = await authService.signUp(data);
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  const githubConnected = Boolean(user?.githubConnected);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        githubConnected,
        login,
        signUp,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
