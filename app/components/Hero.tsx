"use client";

import { useTheme } from "../lib/theme-provider";
import { Sun, Moon } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="heroSection section-padding">
      <button
        onClick={toggleTheme}
        className="themeToggle"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="themeToggleIcon" />
        ) : (
          <Moon className="themeToggleIcon" />
        )}
      </button>

      <div className="heroContainer">
        <h1 className="heroTitle">Patrik Dinh</h1>
        <h2 className="heroSubtitle">
          Building useful products with AI & TypeScript.
        </h2>

        <p className="heroDescription">
          Full-stack & AI developer focused on practical automation and
          intelligent systems.
        </p>

        <div className="heroNavigation">
          <button
            onClick={() => scrollToSection("work")}
            className="heroLink"
            aria-label="Scroll to work section"
          >
            Work ↓
          </button>
          <a href="mailto:me@patrikdinh.com" className="heroLink">
            Email
          </a>
          <a
            href="https://github.com/iamthepk"
            target="_blank"
            rel="noopener noreferrer"
            className="heroLink"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
