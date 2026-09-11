import { useNavigate } from "react-router-dom";

const popularUsers = [
  "torvalds",
  "gaearon",
  "sindresorhus",
];

function PopularSearches() {
  const navigate = useNavigate();

  const handleProfileNavigation = (username: string) => {
    navigate(`/profile/${encodeURIComponent(username)}`);
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted mr-1">
        Suggested:
      </span>

      {popularUsers.map((username) => (
        <button
          key={username}
          type="button"
          onClick={() => handleProfileNavigation(username)}
          className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-medium text-body hover:text-heading hover:border-heading/30 hover:bg-surface-hover transition-all"
        >
          <span>@{username}</span>
        </button>
      ))}
    </div>
  );
}

export default PopularSearches;