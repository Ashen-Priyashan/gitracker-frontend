import { Clock, Trash2 } from "lucide-react";
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
    <div className="space-y-6 py-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Search History
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-heading">
            Recent searches
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-body max-w-2xl">
            Quickly return to GitHub developer profiles and repositories you recently investigated.
          </p>
        </div>

        {recentSearches.length > 0 && (
          <button
            type="button"
            onClick={handleClearSearches}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs font-medium text-muted hover:text-red-600 hover:border-red-500/30 hover:bg-red-500/5 transition-colors sm:self-end"
          >
            <Trash2 size={13} />
            <span>Clear history</span>
          </button>
        )}
      </div>

      {recentSearches.length > 0 ? (
        <div className="grid gap-2.5">
          {recentSearches.map((username) => (
            <RecentSearchItem
              key={username.toLowerCase()}
              username={username}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/80 p-10 text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface-hover text-muted">
            <Clock size={20} />
          </div>
          <h2 className="text-sm font-semibold text-heading">
            No recent searches
          </h2>

          <p className="text-xs text-muted max-w-sm mx-auto">
            Profiles you search and analyze will automatically appear here for quick access.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecentSearchesPage;