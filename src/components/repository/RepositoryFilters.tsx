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
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:flex-row">
      <div className="flex flex-1 items-center rounded-2xl border border-slate-200 px-4">
        <Search size={19} className="text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search repositories..."
          className="w-full bg-transparent px-3 py-3 text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none"
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