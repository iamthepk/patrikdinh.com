"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { useTheme } from "../lib/theme-provider";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" as const },
  }),
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  }),
};

// Nejdelší delay je 1.7, nejdelší duration je 0.6
// Celá animace trvá přibližně 1.7 + 0.6 = 2.3 sekundy
// Přidáme pauzu 1.5 sekundy před restartem
const ANIMATION_DURATION = 2300; // Délka animace v ms
const PAUSE_BEFORE_RESTART = 1500; // Pauza před restartem v ms
const TOTAL_CYCLE_TIME = ANIMATION_DURATION + PAUSE_BEFORE_RESTART; // Celkem 3.8 sekundy

interface PrintAgentFlowAnimationProps {
  isThumbnail?: boolean; // Režim pro thumbnail - skryje tlačítka a upraví velikosti
}

export function PrintAgentFlowAnimation({
  isThumbnail = false,
}: PrintAgentFlowAnimationProps = {}) {
  const { theme } = useTheme();
  const [animationKey, setAnimationKey] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const swipeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);

  // Barvy podle theme
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-black" : "bg-white";
  const strokeColor = isDark ? "white" : "#1a1a1a"; // Tmavě šedá pro lepší kontrast v light theme
  const textColor = isDark ? "white" : "#1a1a1a";
  const strokeWidth = isDark ? 2 : 2.5; // Silnější čáry pro light theme

  useEffect(() => {
    // Vyčistit předchozí timery
    if (loopTimerRef.current) {
      clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
    if (swipeTimerRef.current) {
      clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }

    if (!isLooping) {
      // Když je pause, uložíme uplynulý čas a zastavíme timery
      if (startTimeRef.current !== null) {
        elapsedTimeRef.current += Date.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
      return;
    }

    // Když je play, nastavíme start time
    startTimeRef.current = Date.now();

    const SWIPE_DURATION = 400; // Délka swipe left animace
    const PAUSE_AFTER_SWIPE = 300; // Pauza po swipe left před resetem

    // Vypočítáme zbývající čas do dalšího cyklu
    const remainingTime =
      TOTAL_CYCLE_TIME - (elapsedTimeRef.current % TOTAL_CYCLE_TIME);

    // Po dokončení animace a delaye začne swipe left
    swipeTimerRef.current = setTimeout(() => {
      if (isLooping && startTimeRef.current !== null) {
        setIsResetting(true);
      }
    }, remainingTime);

    // Po swipe left a pauze se resetuje a začne nová animace s fade in
    loopTimerRef.current = setTimeout(() => {
      if (isLooping && startTimeRef.current !== null) {
        setAnimationKey((prev) => prev + 1);
        setIsResetting(false);
        elapsedTimeRef.current = 0; // Resetujeme elapsed time po dokončení cyklu
      }
    }, remainingTime + SWIPE_DURATION + PAUSE_AFTER_SWIPE);

    return () => {
      if (swipeTimerRef.current) clearTimeout(swipeTimerRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, [animationKey, isLooping]);

  const restartAnimation = () => {
    setIsResetting(true);
    setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
      setIsResetting(false);
    }, 400 + 300); // swipe left + pauza
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  // Pro thumbnail použijeme menší velikosti pomocí CSS transform
  const scale = isThumbnail ? 0.95 : 1;

  return (
    <div
      className={`${
        isThumbnail ? "absolute inset-0 w-full h-full" : "w-full aspect-[16/9]"
      } ${bgColor} ${
        isThumbnail ? "rounded-lg" : "rounded-2xl"
      } overflow-hidden relative`}
    >
      {isThumbnail && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLoop();
          }}
          className={`absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-lg ${
            isDark
              ? "bg-white/10 border border-white/20 hover:bg-white/20"
              : "bg-black/10 border border-black/20 hover:bg-black/20"
          }`}
          aria-label={isLooping ? "Pause animation" : "Play animation"}
        >
          {isLooping ? (
            <Pause
              className={`w-4 h-4 ${isDark ? "text-white" : "text-black"}`}
              fill={isDark ? "white" : "black"}
            />
          ) : (
            <Play
              className={`w-4 h-4 ${
                isDark ? "text-white" : "text-black"
              } ml-0.5`}
              fill={isDark ? "white" : "black"}
            />
          )}
        </button>
      )}
      {!isThumbnail && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={toggleLoop}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-lg ${
              isLooping
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {isLooping ? "⏸️ Zastavit loop" : "▶️ Zapnout loop"}
          </button>
          <button
            onClick={restartAnimation}
            className="px-4 py-2 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors shadow-lg"
          >
            🔄 Restart
          </button>
        </div>
      )}
      <motion.svg
        key={animationKey}
        viewBox="0 0 1200 675"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: isResetting ? 0 : 1,
          x: isResetting ? -1200 : 0,
        }}
        transition={{
          duration: isResetting ? 0.4 : 0.5,
          ease: isResetting ? "easeIn" : "easeOut",
        }}
        style={
          isThumbnail
            ? { transform: `scale(${scale})`, transformOrigin: "center" }
            : undefined
        }
      >
        {/* --- Order card --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate={isLooping ? "visible" : "visible"}
          custom={0.1}
        >
          <rect
            x={60}
            y={250}
            width={220}
            height={120}
            rx={16}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <text x={80} y={285} fill={textColor} fontSize={18} fontWeight={600}>
            Brown Sugar Milk Tea
          </text>
          <text x={80} y={310} fill={textColor} fontSize={16}>
            + Tapioca
          </text>
          <text x={80} y={345} fill={textColor} fontSize={14} opacity={0.7}>
            Order #1024
          </text>

          <text x={60} y={390} fill={textColor} fontSize={14} opacity={0.6}>
            POS App – objednávka
          </text>
        </motion.g>

        {/* --- POS box --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <rect
            x={330}
            y={260}
            width={180}
            height={90}
            rx={16}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <rect
            x={350}
            y={280}
            width={60}
            height={40}
            rx={6}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <rect
            x={415}
            y={295}
            width={30}
            height={10}
            rx={3}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <text x={330} y={380} fill={textColor} fontSize={14} opacity={0.7}>
            POS App
          </text>
        </motion.g>

        {/* --- Line: Order -> POS --- */}
        <motion.path
          d="M280 305 H330"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={0.4}
        />

        {/* --- POS -> Print Agent line --- */}
        <motion.path
          d="M510 305 H570"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={0.8}
        />

        {/* --- Print Agent --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.9}
        >
          <polygon
            points="630,270 670,250 710,270 710,310 670,330 630,310"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <text x={651} y={297} fill={textColor} fontSize={18} fontWeight={600}>
            JS
          </text>

          <text x={605} y={360} fill={textColor} fontSize={16} fontWeight={600}>
            Print Agent
          </text>
          <text x={575} y={385} fill={textColor} fontSize={13} opacity={0.7}>
            směruje účtenky & stickery
          </text>
        </motion.g>

        {/* --- Branch lines --- */}
        <motion.path
          d="M670 270 C 770 220, 850 220, 940 220"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={1.2}
        />

        <motion.path
          d="M670 330 C 770 380, 850 380, 940 380"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={1.4}
        />

        {/* --- Epson receipt placeholder --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1.5}
        >
          <rect
            x={940}
            y={190}
            width={150}
            height={90}
            rx={10}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <rect
            x={955}
            y={205}
            width={120}
            height={55}
            rx={6}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.75}
          />
          <text
            x={1015}
            y={237}
            fill={textColor}
            fontSize={16}
            textAnchor="middle"
          >
            ÚČTENKA
          </text>

          <text x={940} y={305} fill={textColor} fontSize={14} opacity={0.8}>
            Epson TM-T20III
          </text>
          <text x={940} y={323} fill={textColor} fontSize={13} opacity={0.6}>
            Receipt
          </text>
        </motion.g>

        {/* --- Brother sticker placeholder --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1.7}
        >
          <rect
            x={940}
            y={350}
            width={150}
            height={90}
            rx={10}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <rect
            x={955}
            y={340}
            width={120}
            height={45}
            rx={6}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.75}
          />
          <text
            x={1015}
            y={368}
            fill={textColor}
            fontSize={15}
            textAnchor="middle"
          >
            STICKER
          </text>

          <text x={940} y={450} fill={textColor} fontSize={14} opacity={0.8}>
            Brother QL-700
          </text>
          <text x={940} y={468} fill={textColor} fontSize={13} opacity={0.6}>
            Sticker
          </text>
        </motion.g>
      </motion.svg>
    </div>
  );
}
