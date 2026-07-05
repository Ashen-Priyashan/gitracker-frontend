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
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}

export default useTheme;