import { Menu } from "lucide-react";

type MobileHeaderProps = {
  onMenuClick: () => void;
};

function MobileHeader({
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-4 lg:hidden">
      <h1 className="text-xl font-bold text-heading">
        GitTracker
      </h1>

      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-xl border border-border p-2 transition hover:bg-background"
      >
        <Menu size={22} />
      </button>
    </header>
  );
}

export default MobileHeader;