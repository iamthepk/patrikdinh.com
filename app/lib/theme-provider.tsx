"use client";

import {
  createContext,
  useContext,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      return stored || "dark";
    }
    return "dark";
  });
  const [mounted, setMounted] = useState(false);

  // Update favicon based on theme
  const updateFavicon = useCallback((isDark: boolean) => {
    // Remove all existing favicon links
    document
      .querySelectorAll("link[rel*='icon']")
      .forEach((link) => link.remove());

    // Create new favicon link
    const link = document.createElement("link");
    link.type = "image/svg+xml";
    link.rel = "icon";
    link.href = isDark ? "/favicon-dark.svg" : "/favicon-light.svg";
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  useLayoutEffect(() => {
    // Required for Next.js hydration - prevents hydration mismatch
    // This is a valid pattern for theme providers
    // eslint-disable-next-line
    setMounted(true);
    document.documentElement.classList.toggle("dark", theme === "dark");
    updateFavicon(theme === "dark");
  }, [theme, updateFavicon]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    updateFavicon(newTheme === "dark");
  };

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
