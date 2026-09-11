import { ArrowRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

type RecentSearchItemProps = {
  username: string;
};

function RecentSearchItem({
  username,
}: RecentSearchItemProps) {
  return (
    <Link
      to={`/profile/${encodeURIComponent(username)}`}
      className="group flex flex-col gap-3 rounded-xl border border-border/70 bg-surface p-4 transition-all duration-150 hover:border-border hover:bg-surface-hover/60 active:scale-[0.995] sm:flex-row sm:items-center sm:justify-between shadow-2xs"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover text-muted shrink-0">
          <UserRound size={16} />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-heading text-sm group-hover:text-primary transition-colors truncate">
            @{username}
          </p>

          <p className="text-2xs text-muted">
            View developer profile analytics & repository portfolio
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end shrink-0">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted group-hover:text-heading transition-colors">
          <span>View</span>
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export default RecentSearchItem;