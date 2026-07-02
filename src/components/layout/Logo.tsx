import { FolderGit2 } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
        <FolderGit2 size={22} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          GitTracker
        </h1>

        <p className="text-sm text-slate-500">
          GitHub Analytics
        </p>
      </div>
    </div>
  );
}

export default Logo;