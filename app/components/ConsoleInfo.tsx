"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    info?: () => void;
  }
}

function getConsoleColors() {
  const isDark = document.documentElement.classList.contains("dark");

  return {
    textColor: isDark ? "#d1d5db" : "#111827",
    accentColor: "#4ade80",
    highlightColor: isDark ? "#22d3ee" : "#0891b2",
  };
}

export default function ConsoleInfo() {
  useEffect(() => {
    const logIntro = () => {
      const { textColor, accentColor, highlightColor } = getConsoleColors();

      console.log(
        "%cPatrik Dinh",
        "color: " + accentColor + "; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%cFull-stack & AI Developer",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%cBuilding useful products with AI & TypeScript",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log("");
      console.log(
        "%c📧 me@patrikdinh.com",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%c🔗 linkedin.com/in/dinhpatrik",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%c🔗 github.com/iamthepk",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log("");
      console.log(
        "%cCurious? Try typing info() in the console",
        "color: " + accentColor + "; font-size: 12px;"
      );
      console.log(
        "%cinfo()",
        "color: " + highlightColor + "; font-size: 12px; font-weight: bold;"
      );
    };

    window.info = () => {
      const { textColor, accentColor } = getConsoleColors();

      console.table({
        Framework: "Next.js 16 (App Router)",
        Language: "TypeScript",
        Styling: "Tailwind CSS",
        Focus: "Full-stack & AI Development",
        Author: "Patrik Dinh",
        Location: "Prague, Czech Republic",
      });

      console.log(
        "%cLooking for a developer?",
        "color: " + accentColor + "; font-size: 14px; font-weight: bold;"
      );
      console.log(
        "%c• Experience with modern AI models (GPT, Gemini, Claude)",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%c• Next.js, React, TypeScript - daily practice",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%c• Clean, maintainable code + attention to detail",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%c• Solving complex problems",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%cContact:",
        "color: " + accentColor + "; font-size: 14px; font-weight: bold;"
      );
      console.log(
        "%cEmail: me@patrikdinh.com",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%cLinkedIn: linkedin.com/in/dinhpatrik",
        "color: " + textColor + "; font-size: 12px;"
      );
      console.log(
        "%cGitHub: github.com/iamthepk",
        "color: " + textColor + "; font-size: 12px;"
      );
    };

    logIntro();

    return () => {
      delete window.info;
    };
  }, []);

  return null;
}
