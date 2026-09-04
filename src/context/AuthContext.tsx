import React, { useCallback, useEffect, useState } from "react";
import type {
  AuthStatusResponse,
  LoginRequestData,
  SignUpRequestData,
  UserAuth,
} from "../services/authService";
import { authService } from "../services/authService";
import { AuthContext } from "./authContextValue";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async (): Promise<UserAuth | null> => {
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
  }, []);

  useEffect(() => {
    let isMounted = true;
    const initializeAuth = async () => {
      try {
        const data: AuthStatusResponse = await authService.getCurrentUser();
        if (isMounted) {
          if (data.authenticated && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to check auth status:", err);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
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

  const linkGithub = async (username: string): Promise<UserAuth> => {
    const updatedUser = await authService.linkGithub(username);
    setUser(updatedUser);
    return updatedUser;
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
        linkGithub,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
