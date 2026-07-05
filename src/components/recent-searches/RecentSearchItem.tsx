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
      className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <UserRound size={21} />
        </div>

        <div>
          <p className="font-semibold text-slate-900">
            {username}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            View GitHub profile analytics
          </p>
        </div>
      </div>

      <ArrowRight
        size={19}
        className="text-slate-400 transition group-hover:text-blue-600"
      />
    </Link>
  );
}

export default RecentSearchItem;