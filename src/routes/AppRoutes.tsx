import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AnalyticsPage from "../pages/AnalyticsPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import RecentSearchesPage from "../pages/RecentSearchesPage";
import RepositoryDetailsPage from "../pages/RepositoryDetailsPage";
import RepositoryPage from "../pages/RepositoryPage";
import SettingsPage from "../pages/SettingsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/profile/:username"
            element={<ProfilePage />}
          />

          <Route
            path="/profile/:username/repositories"
            element={<RepositoryPage />}
          />

          <Route
            path="/profile/:username/repositories/:repositoryName"
            element={<RepositoryDetailsPage />}
          />

          <Route
            path="/profile/:username/analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="/recent-searches"
            element={<RecentSearchesPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;