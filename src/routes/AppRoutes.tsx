import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AnalyticsPage from "../pages/AnalyticsPage";
import ConnectGithubPage from "../pages/ConnectGithubPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import RecentSearchesPage from "../pages/RecentSearchesPage";
import RepositoryDetailsPage from "../pages/RepositoryDetailsPage";
import RepositoryPage from "../pages/RepositoryPage";
import SettingsPage from "../pages/SettingsPage";
import SignupPage from "../pages/SignupPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Authenticated Routes (Requires Gitracker user login) */}
            <Route
              path="/connect-github"
              element={
                <ProtectedRoute requireGithub={false}>
                  <ConnectGithubPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute requireGithub={false}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Fully Protected Routes (Requires Gitracker user + Mandatory GitHub Connection) */}
            <Route
              path="/profile/:username"
              element={
                <ProtectedRoute requireGithub={true}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:username/repositories"
              element={
                <ProtectedRoute requireGithub={true}>
                  <RepositoryPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:username/repositories/:repositoryName"
              element={
                <ProtectedRoute requireGithub={true}>
                  <RepositoryDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:username/analytics"
              element={
                <ProtectedRoute requireGithub={true}>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recent-searches"
              element={
                <ProtectedRoute requireGithub={true}>
                  <RecentSearchesPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;