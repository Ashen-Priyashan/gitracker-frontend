const popularUsers = [
  "torvalds",
  "gaearon",
  "sindresorhus",
];

function PopularSearches() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <span className="text-sm text-slate-500">
        Popular searches:
      </span>

      {popularUsers.map((username) => (
        <button
          key={username}
          type="button"
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition duration-200 hover:bg-blue-50 hover:text-blue-600"
        >
          {username}
        </button>
      ))}
    </div>
  );
}

export default PopularSearches;