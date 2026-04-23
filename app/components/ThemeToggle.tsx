"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/theme-provider";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="themeToggle"
      aria-label="Toggle theme"
      aria-pressed={theme === "light"}
      type="button"
    >
      {theme === "dark" ? (
        <Sun className="themeToggleIcon" />
      ) : (
        <Moon className="themeToggleIcon" />
      )}
    </button>
  );
}
