import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      return;
    }

    navigate(`/profile/${encodeURIComponent(trimmedUsername)}`);
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm sm:flex-row sm:items-center sm:gap-0 sm:p-2">
      <div className="flex flex-1 items-center">
        <Search className="ml-3 text-body" size={21} />

        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search GitHub username..."
          className="flex-1 bg-transparent px-4 py-3 text-heading outline-none placeholder:text-body"
        />
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-white transition duration-200 hover:bg-primary-hover sm:w-auto"
      >
        Analyze Profile
      </button>
    </div>
  );
}

export default SearchBar;