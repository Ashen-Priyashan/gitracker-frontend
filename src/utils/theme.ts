export type Theme = "light" | "dark";

const THEME_KEY = "gitracker_theme";

const getStoredTheme = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme === "dark") {
    return "dark";
  }

  return "light";
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const saveTheme = (theme: Theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export {
  applyTheme,
  getStoredTheme,
  saveTheme,
};