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
    <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5 md:flex-row">
      <div className="flex flex-1 items-center rounded-2xl border border-border px-4">
        <Search size={19} className="text-body" />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search repositories..."
          className="w-full bg-transparent px-3 py-3 text-heading outline-none placeholder:text-body"
        />
      </div>

      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        className="rounded-2xl border border-border bg-surface px-4 py-3 text-heading outline-none"
      >
        <option value="default">Default order</option>
        <option value="stars">Most stars</option>
        <option value="forks">Most forks</option>
        <option value="updated">Recently updated</option>
      </select>
    </div>
  );
}

export default RepositoryFilters;