import {
  House,
  Search,
  User,
  FolderGit2,
  ChartColumn,
  History,
  Settings,
} from "lucide-react";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white px-6 py-8">
      <Logo />

      <nav className="mt-10 flex flex-col gap-2">
        <SidebarItem icon={House} label="Home" active />
        <SidebarItem icon={Search} label="Search" />
        <SidebarItem icon={User} label="Profiles" />
        <SidebarItem icon={FolderGit2} label="Repositories" />
        <SidebarItem icon={ChartColumn} label="Analytics" />
        <SidebarItem icon={History} label="Recent Searches" />
        <SidebarItem icon={Settings} label="Settings" />
      </nav>

      <div className="mt-auto">
        {/* API Status Card */}

        {/* Theme Toggle */}
      </div>
    </aside>
  );
}

export default Sidebar;