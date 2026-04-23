"use client";

import { motion, useReducedMotion } from "framer-motion";

const keyframeTimes = [0, 0.26, 0.54, 0.8, 1] as const;
const driftEase = "easeInOut" as const;

const glyphs = [
  {
    id: "left-four",
    value: "4",
    tone: "primary",
    anchor: {
      top: "24%",
      left: "18%",
    },
    x: ["0vw", "9vw", "4vw", "12vw", "0vw"],
    y: ["0vh", "7vh", "-3vh", "11vh", "0vh"],
    rotate: [-16, -24, -12, -22, -16],
    scale: [1.16, 1.24, 1.12, 1.2, 1.16],
    opacity: [0.5, 0.72, 0.56, 0.68, 0.5],
    duration: 22,
    delay: 0,
  },
  {
    id: "center-zero",
    value: "0",
    tone: "orbital",
    anchor: {
      top: "42%",
      left: "68%",
    },
    x: ["0vw", "6vw", "-4vw", "8vw", "0vw"],
    y: ["0vh", "-8vh", "12vh", "4vh", "0vh"],
    rotate: [-8, 10, -12, 6, -8],
    scale: [1.14, 1.24, 1.08, 1.2, 1.14],
    opacity: [0.42, 0.6, 0.38, 0.54, 0.42],
    duration: 28,
    delay: 0.25,
  },
  {
    id: "right-four",
    value: "4",
    tone: "primary",
    anchor: {
      top: "72%",
      left: "80%",
    },
    x: ["0vw", "-10vw", "-5vw", "-14vw", "0vw"],
    y: ["0vh", "-9vh", "5vh", "-4vh", "0vh"],
    rotate: [18, 28, 16, 24, 18],
    scale: [1.16, 1.24, 1.12, 1.2, 1.16],
    opacity: [0.5, 0.7, 0.56, 0.66, 0.5],
    duration: 24,
    delay: 0.45,
  },
] as const;

export default function NotFoundBurst() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="notFoundBurst" aria-hidden="true">
      {glyphs.map((glyph) => (
        <div
          key={glyph.id}
          className="notFoundGlyphAnchor"
          style={{
            top: glyph.anchor.top,
            left: glyph.anchor.left,
          }}
        >
          <motion.span
            className={`notFoundGlyph notFoundGlyph${glyph.tone[0].toUpperCase()}${glyph.tone.slice(1)}`}
            initial={{
              opacity: reducedMotion ? glyph.opacity[0] : 0,
              x: 0,
              y: 0,
              rotate: reducedMotion ? glyph.rotate[0] : 0,
              scale: reducedMotion ? glyph.scale[0] : 0.92,
            }}
            animate={{
              opacity: reducedMotion ? glyph.opacity[0] : [...glyph.opacity],
              x: reducedMotion ? glyph.x[0] : [...glyph.x],
              y: reducedMotion ? glyph.y[0] : [...glyph.y],
              rotate: reducedMotion ? glyph.rotate[0] : [...glyph.rotate],
              scale: reducedMotion ? glyph.scale[0] : [...glyph.scale],
            }}
            transition={{
              duration: reducedMotion ? 0.35 : glyph.duration,
              delay: reducedMotion ? 0 : glyph.delay,
              times: [...keyframeTimes],
              ease: driftEase,
              repeat: reducedMotion ? 0 : Infinity,
            }}
          >
            {glyph.value}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
