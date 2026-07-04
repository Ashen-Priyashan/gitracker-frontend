import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="flex w-full max-w-2xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <Search className="ml-3 text-slate-400" size={21} />

      <input
        type="text"
        placeholder="Search GitHub username..."
        className="flex-1 bg-transparent px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
      />

      <button
        type="button"
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
      >
        Analyze Profile
      </button>
    </div>
  );
}

export default SearchBar;