import { FolderGit2 } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-heading text-surface dark:bg-white dark:text-black shadow-xs">
        <FolderGit2 size={18} strokeWidth={2.2} />
      </div>

      <div>
        <h1 className="text-base font-semibold tracking-tight text-heading leading-none">
          GitTracker
        </h1>
        <p className="mt-1 text-[11px] font-medium tracking-wide text-muted uppercase">
          Intelligence
        </p>
      </div>
    </div>
  );
}

export default Logo;