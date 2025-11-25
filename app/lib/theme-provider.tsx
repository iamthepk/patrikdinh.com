"use client";

import {
  createContext,
  useContext,
  useCallback,
  useLayoutEffect,
  useEffect,
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
      // Nejprve zkontroluj URL parametr
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get("theme") as Theme | null;

      if (urlTheme === "dark" || urlTheme === "light") {
        // Aktualizuj localStorage podle URL parametru
        localStorage.setItem("theme", urlTheme);
        return urlTheme;
      }

      // Pokud není URL parametr, použij localStorage
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

  // Sleduj změny URL parametrů při navigaci
  useEffect(() => {
    const checkUrlTheme = () => {
      if (typeof window === "undefined") return;

      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get("theme") as Theme | null;

      if (urlTheme === "dark" || urlTheme === "light") {
        if (urlTheme !== theme) {
          setTheme(urlTheme);
          localStorage.setItem("theme", urlTheme);
        }
      }
    };

    // Zkontroluj při načtení
    checkUrlTheme();

    // Sleduj změny URL (např. při použití browser back/forward)
    window.addEventListener("popstate", checkUrlTheme);

    // Sleduj změny při navigaci v Next.js (pro případ, že by se URL změnilo bez reloadu)
    const interval = setInterval(checkUrlTheme, 100);

    return () => {
      window.removeEventListener("popstate", checkUrlTheme);
      clearInterval(interval);
    };
  }, [theme]);

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
