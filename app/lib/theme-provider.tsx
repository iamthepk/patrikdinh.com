"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_THEME,
  applyTheme,
  getStoredTheme,
  persistTheme,
  type Theme,
} from "./theme";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const theme = themeOverride ?? (hydrated ? getStoredTheme() : DEFAULT_THEME);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    applyTheme(theme);
    persistTheme(theme);
  }, [hydrated, theme]);

  const toggleTheme = useCallback(() => {
    setThemeOverride((currentTheme) => {
      const resolvedTheme = currentTheme ?? getStoredTheme();
      return resolvedTheme === "dark" ? "light" : "dark";
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
