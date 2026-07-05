import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  to: string;
};

function SidebarItem({
  icon: Icon,
  label,
  to,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-blue-50 ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:text-blue-600"
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

export default SidebarItem;