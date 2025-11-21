"use client";

import { useTheme } from "../lib/theme-provider";
import { Sun, Moon } from "lucide-react";

export default function Hero() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center section-padding pt-24 pb-8"
    >
      <button
        onClick={toggleTheme}
        className="fixed top-12 right-12 p-2 hover:opacity-70 transition-opacity"
        style={{ color: "var(--text)" }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <div className="max-w-5xl">
        <h1
          className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.95] tracking-tight mb-8"
          style={{ color: "var(--text)" }}
        >
          Patrik Dinh
        </h1>
        <h2
          className="text-[clamp(2rem,8vw,5rem)] font-black leading-[0.95] tracking-tight mb-20"
          style={{ color: "var(--text)" }}
        >
          Building useful products with AI & TypeScript.
        </h2>

        <p
          className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] max-w-4xl mb-24"
          style={{ color: "var(--text)" }}
        >
          Full-stack & AI developer focused on practical automation and
          intelligent systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 text-xl font-medium">
          <button
            onClick={() => scrollToSection("work")}
            style={{ color: "var(--text)" }}
            aria-label="Scroll to work section"
          >
            Work ↓
          </button>
          <a
            href="mailto:me@patrikdinh.com"
            style={{ color: "var(--text)" }}
          >
            Email
          </a>
          <a
            href="https://github.com/iamthepk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text)" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
