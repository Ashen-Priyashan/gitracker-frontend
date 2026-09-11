import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedUsername = username.trim().replace(/^@/, "");

    if (!trimmedUsername) {
      return;
    }

    navigate(`/profile/${encodeURIComponent(trimmedUsername)}`);
  };

  return (
    <div className="group relative flex w-full max-w-2xl flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl border border-border bg-surface p-2 shadow-sm transition-all duration-200 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
      <div className="flex flex-1 items-center px-2">
        <Search
          size={18}
          className="text-muted transition-colors group-focus-within:text-primary shrink-0 ml-1"
        />

        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Enter a GitHub username, e.g. torvalds..."
          className="w-full bg-transparent px-3.5 py-2.5 text-sm sm:text-base text-heading placeholder:text-muted/70 focus:outline-none tracking-tight"
        />

        {username && (
          <button
            type="button"
            onClick={() => setUsername("")}
            className="text-xs text-muted hover:text-heading px-2 py-1 rounded-md transition"
            aria-label="Clear search input"
          >
            Clear
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-heading text-surface hover:opacity-90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-6 py-2.5 text-sm font-medium transition-all active:scale-[0.98] select-none"
      >
        <span>Analyze</span>
        <span className="text-xs opacity-60 font-mono">↵</span>
      </button>
    </div>
  );
}

export default SearchBar;