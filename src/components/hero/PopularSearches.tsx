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
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <span className="text-sm text-body">
        Popular searches:
      </span>

      {popularUsers.map((username) => (
        <button
          key={username}
          type="button"
          onClick={() => handleProfileNavigation(username)}
          className="rounded-lg bg-border/40 px-3 py-1.5 text-sm font-medium text-body transition duration-200 hover:bg-primary/10 hover:text-primary"
        >
          {username}
        </button>
      ))}
    </div>
  );
}

export default PopularSearches;