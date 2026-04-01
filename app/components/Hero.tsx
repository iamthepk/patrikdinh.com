"use client";

import { useTheme } from "../lib/theme-provider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import CVContent from "./CVContent";
import "./Hero.css";

export default function Hero() {
  const { theme, toggleTheme } = useTheme();
  const [cvOpen, setCvOpen] = useState(false);

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!cvOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [cvOpen]);

  return (
    <>
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
            Full-stack developer building internal systems, automation and AI
            tools for real-world use.
          </h2>

          <p className="heroDescription">
            I build practical software for real workflows, with a strong focus on
            security, testing and whether the final system can actually be trusted
            in day-to-day use.
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

      {cvOpen && (
        <div className="cvModal" onClick={() => setCvOpen(false)}>
          <div className="cvModalContent" onClick={(e) => e.stopPropagation()}>
            <button
              className="cvModalClose"
              onClick={() => setCvOpen(false)}
              aria-label="Close CV"
            >
              ×
            </button>
            <div className="cvModalInner">
              <CVContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
