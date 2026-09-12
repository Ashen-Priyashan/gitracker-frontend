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
  const activeUsername = username || user?.githubUsername;

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col overflow-y-auto border-r border-border/80 bg-surface/80 backdrop-blur-xl px-3.5 py-5 select-none">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="mt-8 flex flex-col gap-5 flex-1">
        <div>
          <p className="px-3 text-[10px] font-semibold tracking-wider text-muted uppercase">
            Platform
          </p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            <SidebarItem icon={House} label="Home" to="/" />
            <SidebarItem
              icon={History}
              label="Recent Searches"
              to="/recent-searches"
            />
          </div>
        </div>

        {activeUsername && (
          <div>
            <p className="px-3 text-[10px] font-semibold tracking-wider text-muted uppercase">
              Intelligence
            </p>
            <div className="mt-1.5 flex flex-col gap-0.5">
              <SidebarItem
                icon={User}
                label="Profile"
                to={`/profile/${encodeURIComponent(activeUsername)}`}
              />
              <SidebarItem
                icon={FolderGit2}
                label="Repositories"
                to={`/profile/${encodeURIComponent(activeUsername)}/repositories`}
              />
              <SidebarItem
                icon={ChartColumn}
                label="Analytics"
                to={`/profile/${encodeURIComponent(activeUsername)}/analytics`}
              />
            </div>
          </div>
        )}

        <div>
          <p className="px-3 text-[10px] font-semibold tracking-wider text-muted uppercase">
            Preferences
          </p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            <SidebarItem
              icon={Settings}
              label="Settings"
              to="/settings"
            />
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-4 space-y-3">
        {user ? (
          <div className="rounded-xl border border-border/80 bg-surface-hover/40 p-2.5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              {user.githubAvatarUrl ? (
                <img
                  src={user.githubAvatarUrl}
                  alt={user.name}
                  className="h-8 w-8 rounded-lg border border-border/60 object-cover shrink-0"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-heading/10 text-heading font-semibold text-xs shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-heading text-xs truncate leading-tight">{user.name}</p>
                {user.githubUsername ? (
                  <p className="text-[11px] text-primary truncate leading-tight">@{user.githubUsername}</p>
                ) : (
                  <p className="text-[11px] text-amber-500 font-medium truncate leading-tight">No GitHub Linked</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-medium text-danger hover:bg-danger/10 transition-colors"
            >
              <LogOut size={12} />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
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