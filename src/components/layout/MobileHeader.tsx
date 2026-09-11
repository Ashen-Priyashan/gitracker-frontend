import { Menu } from "lucide-react";

type MobileHeaderProps = {
  onMenuClick: () => void;
};

function MobileHeader({
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-surface/80 backdrop-blur-xl px-4 py-2.5 lg:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-heading text-surface dark:bg-white dark:text-black">
          <span className="font-bold text-xs">G</span>
        </div>
        <span className="text-sm font-semibold tracking-tight text-heading">
          GitTracker
        </span>
      </div>

      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={onMenuClick}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 text-heading hover:bg-surface-hover active:scale-95 transition"
      >
        <Menu size={18} />
      </button>
    </header>
  );
}

export default MobileHeader;