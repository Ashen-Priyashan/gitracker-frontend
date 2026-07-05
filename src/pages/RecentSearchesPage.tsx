import { Trash2 } from "lucide-react";
import { useState } from "react";

import RecentSearchItem from "../components/recent-searches/RecentSearchItem";
import {
  clearRecentSearches,
  getRecentSearches,
} from "../utils/recentSearches";

function RecentSearchesPage() {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    getRecentSearches,
  );

  const handleClearSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Search History
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Recent searches
          </h1>

          <p className="mt-3 text-slate-600">
            Quickly return to GitHub profiles you recently analyzed.
          </p>
        </div>

        {recentSearches.length > 0 && (
          <button
            type="button"
            onClick={handleClearSearches}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
            Clear history
          </button>
        )}
      </div>

      {recentSearches.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {recentSearches.map((username) => (
            <RecentSearchItem
              key={username.toLowerCase()}
              username={username}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No recent searches
          </h2>

          <p className="mt-2 text-slate-600">
            Profiles you successfully analyze will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecentSearchesPage;