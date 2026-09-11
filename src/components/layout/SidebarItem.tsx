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
        `group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-left transition-all duration-150 ${
          isActive
            ? "bg-heading/5 text-heading font-semibold dark:bg-white/10"
            : "text-body font-medium hover:bg-surface-hover hover:text-heading"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              aria-hidden="true"
              className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full bg-primary"
            />
          )}
          <Icon
            size={18}
            className={`shrink-0 transition-colors ${
              isActive ? "text-primary" : "text-body group-hover:text-heading"
            }`}
          />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default SidebarItem;