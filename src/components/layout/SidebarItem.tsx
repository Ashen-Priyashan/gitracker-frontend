import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
};

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: SidebarItemProps) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-blue-50 ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-slate-600 hover:text-blue-600"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default SidebarItem;