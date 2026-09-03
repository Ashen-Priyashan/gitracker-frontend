import {
  ChartColumn,
  FolderGit2,
  History,
  House,
  LogIn,
  LogOut,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import ApiStatusCard from "./ApiStatusCard";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {
  const { username } = useParams<{ username: string }>();
  const { user, logout } = useAuth();

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col overflow-y-auto border-r border-border bg-surface px-6 py-8">
      <Logo />

      <nav className="mt-10 flex flex-col gap-2">
        <SidebarItem icon={House} label="Home" to="/" />

        

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

      <div className="mt-auto pt-6 space-y-4">
        {user ? (
          <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
            <div className="flex items-center gap-3">
              {user.githubAvatarUrl ? (
                <img src={user.githubAvatarUrl} alt={user.name} className="h-9 w-9 rounded-full border border-border" />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="font-semibold text-heading text-sm truncate">{user.name}</p>
                {user.githubUsername ? (
                  <p className="text-xs text-primary truncate">@{user.githubUsername}</p>
                ) : (
                  <p className="text-xs text-amber-500 font-medium">No GitHub Connected</p>
                )}
              </div>
            </div>

            <button
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <SidebarItem icon={LogIn} label="Log In" to="/login" />
            <SidebarItem icon={UserPlus} label="Sign Up" to="/signup" />
          </div>
        )}

        <ApiStatusCard />

        <ThemeToggle />
      </div>
    </aside>
  );
}

export default Sidebar;