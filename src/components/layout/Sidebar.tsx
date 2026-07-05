import {
  ChartColumn,
  FolderGit2,
  History,
  House,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";

import ApiStatusCard from "./ApiStatusCard";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {
  const { username } = useParams<{ username: string }>();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white px-6 py-8">
      <Logo />

      <nav className="mt-10 flex flex-col gap-2">
        <SidebarItem icon={House} label="Home" to="/" />

        <SidebarItem icon={Search} label="Search" to="/" />

        {username && (
          <>
            <SidebarItem
              icon={User}
              label="Profile"
              to={`/profile/${encodeURIComponent(username)}`}
            />

            <SidebarItem
              icon={FolderGit2}
              label="Repositories"
              to={`/profile/${encodeURIComponent(username)}/repositories`}
            />

            <SidebarItem
              icon={ChartColumn}
              label="Analytics"
              to={`/profile/${encodeURIComponent(username)}/analytics`}
            />
          </>
        )}

        <SidebarItem
          icon={History}
          label="Recent Searches"
          to="/recent-searches"
        />

        <SidebarItem
          icon={Settings}
          label="Settings"
          to="/settings"
        />
      </nav>

      <div className="mt-auto">
        <ApiStatusCard />

        <ThemeToggle />
      </div>
    </aside>
  );
}

export default Sidebar;