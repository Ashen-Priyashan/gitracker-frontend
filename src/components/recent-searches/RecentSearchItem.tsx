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
      className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UserRound size={21} />
        </div>

        <div>
          <p className="font-semibold text-heading">
            {username}
          </p>

          <p className="mt-1 text-sm text-body">
            View GitHub profile analytics
          </p>
        </div>
      </div>

      <ArrowRight
        size={19}
        className="text-body transition group-hover:text-primary"
      />
    </Link>
  );
}

export default RecentSearchItem;