import { Search } from "lucide-react";

type RepositoryFiltersProps = {
  search: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

function RepositoryFilters({
  search,
  sort,
  onSearchChange,
  onSortChange,
}: RepositoryFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="group relative flex flex-1 items-center rounded-xl border border-border/80 bg-surface px-3 py-2 shadow-2xs transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
        <Search size={16} className="text-muted group-focus-within:text-primary transition-colors shrink-0 ml-0.5" />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Filter repositories by name..."
          className="w-full bg-transparent px-2.5 text-xs sm:text-sm text-heading outline-none placeholder:text-muted/70 tracking-tight"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-[11px] text-muted hover:text-heading px-1.5 py-0.5 rounded transition"
            aria-label="Clear repository search"
          >
            Clear
          </button>
        )}
      </div>

      <div className="relative sm:w-52 shrink-0">
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-border/80 bg-surface px-3.5 py-2 pr-8 text-xs sm:text-sm font-medium text-heading outline-none shadow-2xs hover:bg-surface-hover focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition cursor-pointer"
        >
          <option value="default">Default order</option>
          <option value="stars">Most stars</option>
          <option value="forks">Most forks</option>
          <option value="updated">Recently updated</option>
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted">
          ▼
        </span>
      </div>
    </div>
  );
}

export default RepositoryFilters;