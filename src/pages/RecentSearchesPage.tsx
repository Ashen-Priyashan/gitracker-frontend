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
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Search History
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
            Recent searches
          </h1>

          <p className="mt-3 text-body">
            Quickly return to GitHub profiles you recently analyzed.
          </p>
        </div>

        {recentSearches.length > 0 && (
          <button
            type="button"
            onClick={handleClearSearches}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-body transition hover:border-danger hover:text-danger"
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
        <div className="mt-8 rounded-3xl border border-border bg-surface p-12 text-center">
          <h2 className="text-xl font-semibold text-heading">
            No recent searches
          </h2>

          <p className="mt-2 text-body">
            Profiles you successfully analyze will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecentSearchesPage;