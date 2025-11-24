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
        viewBox="0 0 1600 675"
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
        style={undefined}
      >
        {/* Arrow marker definition - modern elegant style */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M 0 0.5 Q 0 0, 1 0.5 L 8 3 L 1 5.5 Q 0 6, 0 5.5 Z"
              fill={strokeColor}
              stroke="none"
            />
          </marker>
        </defs>
        {/* --- POS App --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <rect
            x={150}
            y={260}
            width={180}
            height={90}
            rx={16}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* POS Screen */}
          <rect
            x={165}
            y={275}
            width={90}
            height={50}
            rx={4}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Screen content lines */}
          <line
            x1={175}
            y1={290}
            x2={245}
            y2={290}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.6}
          />
          <line
            x1={175}
            y1={300}
            x2={230}
            y2={300}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.6}
          />
          <line
            x1={175}
            y1={310}
            x2={220}
            y2={310}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.6}
          />
          {/* Product tiles/items */}
          <rect
            x={260}
            y={278}
            width={25}
            height={20}
            rx={3}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.7}
          />
          <rect
            x={290}
            y={278}
            width={25}
            height={20}
            rx={3}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.7}
          />
          <rect
            x={260}
            y={303}
            width={25}
            height={20}
            rx={3}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.7}
          />
          <rect
            x={290}
            y={303}
            width={25}
            height={20}
            rx={3}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.7}
          />
          <text x={240} y={370} fill={textColor} fontSize={14} opacity={0.7} textAnchor="middle">
            POS App
          </text>
        </motion.g>

        {/* --- Order --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <rect
            x={420}
            y={260}
            width={180}
            height={90}
            rx={16}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <text x={510} y={310} fill={textColor} fontSize={18} fontWeight={600} textAnchor="middle">
            Order
          </text>
        </motion.g>

        {/* --- Line: POS App -> Order --- */}
        <motion.path
          d="M330 305 H420"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
          markerEnd="url(#arrowhead)"
        />

        {/* --- Line: Order -> Print Agent --- */}
        <motion.path
          d="M600 305 H800"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
          markerEnd="url(#arrowhead)"
        />

        {/* --- Print Agent --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.9}
        >
          <polygon
            points="800,285 840,265 880,285 880,325 840,345 800,325"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <text x={840} y={308} fill={textColor} fontSize={18} fontWeight={600} textAnchor="middle">
            JS
          </text>

          <text x={840} y={365} fill={textColor} fontSize={16} fontWeight={600} textAnchor="middle">
            Print Agent
          </text>
          <text x={840} y={385} fill={textColor} fontSize={12} opacity={0.6} textAnchor="middle">
            :8000
          </text>
          <text x={840} y={400} fill={textColor} fontSize={12} opacity={0.7} textAnchor="middle">
            REST API
          </text>
        </motion.g>

        {/* --- Branch lines --- */}
        {/* Sticker line - from right edge of Print Agent to left edge of Sticker box (closer, because there can be multiple prints) */}
        <motion.path
          d="M880 325 C 1000 375, 1100 375, 1150 395"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={1.2}
          markerEnd="url(#arrowhead)"
        />
        {/* Endpoint label on sticker line - positioned well above the arrow */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1.25}
        >
          <rect
            x={950}
            y={325}
            width={90}
            height={18}
            rx={4}
            fill={isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)"}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.5}
            opacity={0.8}
          />
          <text
            x={995}
            y={337}
            fill={textColor}
            fontSize={10}
            fontWeight={500}
            textAnchor="middle"
            opacity={0.9}
          >
            /print-sticker
          </text>
        </motion.g>

        {/* Receipt line - from right edge of Print Agent to left edge of Receipt box (further, because it's the last step) */}
        <motion.path
          d="M880 285 C 1050 235, 1250 235, 1350 235"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          custom={1.4}
          markerEnd="url(#arrowhead)"
        />
        {/* Endpoint label on receipt line - positioned well below the arrow */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1.45}
        >
          <rect
            x={1050}
            y={255}
            width={95}
            height={18}
            rx={4}
            fill={isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)"}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.5}
            opacity={0.8}
          />
          <text
            x={1097.5}
            y={267}
            fill={textColor}
            fontSize={10}
            fontWeight={500}
            textAnchor="middle"
            opacity={0.9}
          >
            /print-receipt
          </text>
        </motion.g>

        {/* --- Epson receipt placeholder --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1.5}
        >
          <rect
            x={1350}
            y={190}
            width={150}
            height={90}
            rx={10}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <rect
            x={1365}
            y={205}
            width={120}
            height={60}
            rx={6}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.75}
          />
          <text
            x={1425}
            y={240}
            fill={textColor}
            fontSize={16}
            textAnchor="middle"
          >
            Receipt
          </text>

          <text x={1425} y={305} fill={textColor} fontSize={14} opacity={0.8} textAnchor="middle">
            Epson TM-T20III
          </text>
          <text x={1425} y={323} fill={textColor} fontSize={12} opacity={0.5} textAnchor="middle">
            PDFKit + SumatraPDF
          </text>
        </motion.g>

        {/* --- Brother sticker placeholder --- */}
        <motion.g
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1.3}
        >
          <rect
            x={1150}
            y={350}
            width={150}
            height={90}
            rx={10}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <rect
            x={1165}
            y={365}
            width={120}
            height={60}
            rx={6}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth * 0.75}
          />
          <text
            x={1225}
            y={398}
            fill={textColor}
            fontSize={15}
            textAnchor="middle"
          >
            Sticker
          </text>

          <text x={1225} y={460} fill={textColor} fontSize={14} opacity={0.8} textAnchor="middle">
            Brother QL-700
          </text>
          <text x={1225} y={478} fill={textColor} fontSize={12} opacity={0.5} textAnchor="middle">
            Puppeteer + IrfanView
          </text>
        </motion.g>
      </motion.svg>
    </div>
  );
}
