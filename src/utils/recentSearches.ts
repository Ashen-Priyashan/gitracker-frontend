const RECENT_SEARCHES_KEY = "gitracker_recent_searches";
const MAX_RECENT_SEARCHES = 10;

const getRecentSearches = (): string[] => {
  const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);

  if (!storedSearches) {
    return [];
  }

  try {
    const parsedSearches: unknown = JSON.parse(storedSearches);

    if (!Array.isArray(parsedSearches)) {
      return [];
    }

    return parsedSearches.filter(
      (search): search is string => typeof search === "string",
    );
  } catch {
    return [];
  }
};

const addRecentSearch = (username: string) => {
  const recentSearches = getRecentSearches();

  const updatedSearches = [
    username,
    ...recentSearches.filter(
      (search) => search.toLowerCase() !== username.toLowerCase(),
    ),
  ].slice(0, MAX_RECENT_SEARCHES);

  localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(updatedSearches),
  );
};

const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
};

export {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
};