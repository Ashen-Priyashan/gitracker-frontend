import { useEffect, useState } from "react";

import {
  applyTheme,
  getStoredTheme,
  saveTheme,
  type Theme,
} from "../utils/theme";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);

    window.dispatchEvent(new Event("theme-change"));
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getStoredTheme());
    };

    window.addEventListener("theme-change", handleThemeChange);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme =
      theme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
    saveTheme(nextTheme);
    setTheme(nextTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}

export default useTheme;