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
    <div className="flex w-full max-w-2xl items-center rounded-2xl border border-border bg-surface p-2 shadow-sm">
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

      <button
        type="button"
        onClick={handleSearch}
        className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition duration-200 hover:bg-primary-hover"
      >
        Analyze Profile
      </button>
    </div>
  );
}

export default SearchBar;