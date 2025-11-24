"use client";

import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";

const firstName = "PATRIK";
const lastName = "DINH";

const firstNameLetters = firstName.split("");
const lastNameLetters = lastName.split("");

interface RandomDirection {
  x: number;
  y: number;
  rotate: number;
}

const getRandomDirection = (): RandomDirection => ({
  x: (Math.random() - 0.5) * 1000,
  y: (Math.random() - 0.5) * 1000,
  rotate: (Math.random() - 0.5) * 720,
});

type Phase = "enter" | "exit";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("enter");

  // theme sync
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;

    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // po „dopsání“ jména chvíli podržet a pak spustit exit
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
    }, 2200); // klidně si poladíš (délka enter animace + chvilka pauzy)

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    initial: { opacity: 1 },
    enter: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // rychlost „psaní“
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 40, scale: 0.9, rotate: 0 },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    },
    exit: (custom: RandomDirection) => ({
      opacity: 0,
      x: custom.x,
      y: custom.y,
      rotate: custom.rotate,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate={phase}
      onAnimationComplete={() => {
        if (phase === "exit") {
          // necháme jemný buffer, ať to není useknuté
          setTimeout(onComplete, 350);
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >
      <motion.div
        variants={containerVariants}
        style={{
          fontFamily: "var(--font-inter), -apple-system, sans-serif",
          lineHeight: 0.85,
          textAlign: "center",
        }}
      >
        <div className="flex justify-center" style={{ marginBottom: "-0.1em" }}>
          {firstNameLetters.map((letter, index) => {
            const directions = getRandomDirection();
            return (
              <motion.span
                key={`first-${index}`}
                custom={directions}
                variants={letterVariants}
                className="inline-block"
                style={{
                  fontSize: "clamp(10rem, 45vw, 35rem)",
                  fontWeight: 900,
                  color: "var(--text)",
                  fontFamily: "var(--font-inter), -apple-system, sans-serif",
                  letterSpacing: "-0.07em",
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
        <div
          className="flex justify-center"
          style={{
            width: "100%",
            maxWidth: "100vw",
            gap: "clamp(2rem, 8vw, 6rem)",
            flexWrap: "nowrap",
            boxSizing: "border-box",
          }}
        >
          {lastNameLetters.map((letter, index) => {
            const directions = getRandomDirection();
            return (
              <motion.span
                key={`last-${index}`}
                custom={directions}
                variants={letterVariants}
                className="inline-block"
                style={{
                  fontSize: "clamp(10.8rem, 48.6vw, 37.8rem)",
                  fontWeight: 900,
                  color: "var(--text)",
                  fontFamily: "var(--font-inter), -apple-system, sans-serif",
                  flexShrink: 0,
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
