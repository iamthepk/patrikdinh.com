"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, ZoomIn, RotateCcw } from "lucide-react";
import { useTheme } from "../lib/theme-provider";
import "./Projects.css";

// Timing-based variants pro loop animaci
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" as const },
  }),
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      delay,
      duration: 1.0,
      ease: "easeInOut" as const,
    },
  }),
};

// Nejdelší delay je 3.5, nejdelší duration je 1.0
// Celá animace trvá přibližně 3.5 + 1.0 = 4.5 sekundy
// Přidáme delší pauzu před restartem (delší než swipe duration 400ms)
const ANIMATION_DURATION = 4500; // Délka animace v ms
const PAUSE_BEFORE_RESTART = 3000; // Pauza před restartem v ms (3 sekundy - delší než swipe)
const TOTAL_CYCLE_TIME = ANIMATION_DURATION + PAUSE_BEFORE_RESTART; // Celkem 7.5 sekund

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
  const [selectedThumbnail, setSelectedThumbnail] = useState<
    string | string[] | null
  >(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
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

  // Resetovat zoom při zavření modalu a blokovat scroll stránky
  useEffect(() => {
    if (!selectedThumbnail) {
      // Reset zoom při zavření modalu
      setTimeout(() => {
        setZoomLevel(1);
        setIsZoomed(false);
      }, 0);
      // Obnovit scroll stránky
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    } else {
      // Blokovat scroll stránky když je modal otevřený
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      // Cleanup - obnovit scroll při unmount
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedThumbnail]);

  // Zavřít modal na ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedThumbnail) {
        if (isZoomed) {
          setZoomLevel(1);
          setIsZoomed(false);
        } else {
          setSelectedThumbnail(null);
          setIsLooping(true);
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedThumbnail, isZoomed]);

  const handleImageClick = () => {
    if (isMultipleImages) return;
    // Jednoduchá lupa - přepne mezi 1x a 2x
    if (isZoomed) {
      setZoomLevel(1);
      setIsZoomed(false);
    } else {
      setZoomLevel(2);
      setIsZoomed(true);
    }
  };

  const isMultipleImages = Array.isArray(selectedThumbnail);

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

  // Helper pro získání správných variant podle režimu
  const getCardVariants = () => {
    // Používáme stejné varianty pro oba režimy - časově založené
    return cardVariants;
  };

  const getLineVariants = () => {
    // Používáme stejné varianty pro oba režimy - časově založené
    return lineVariants;
  };

  // Helper pro získání správných animačních props
  const getAnimationProps = (customDelay?: number) => {
    if (isThumbnail) {
      // V thumbnail režimu také používáme animate s delay, ne scroll-based
      return {
        initial: "hidden" as const,
        animate: "visible" as const,
        custom: customDelay,
      };
    }
    return {
      initial: "hidden" as const,
      animate: "visible" as const,
      custom: customDelay,
    };
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
        viewBox="0 0 1700 820"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isResetting ? 0 : 1,
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
        <motion.g variants={getCardVariants()} {...getAnimationProps(0.0)}>
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
          <text
            x={240}
            y={370}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            POS App
          </text>
        </motion.g>

        {/* --- Order --- */}
        <motion.g variants={getCardVariants()} {...getAnimationProps(0.6)}>
          <rect
            x={360}
            y={260}
            width={180}
            height={90}
            rx={16}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <text
            x={450}
            y={310}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            JSON Payload
          </text>
          <text
            x={450}
            y={370}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            Order
          </text>
        </motion.g>

        {/* --- Order Thumbnail --- */}
        <motion.g
          variants={getCardVariants()}
          {...getAnimationProps(0.8)}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsLooping(false);
            setSelectedThumbnail("/thumbnails/print-agent/order-thumbnail.png");
          }}
        >
          <rect
            x={140}
            y={630}
            width={300}
            height={200}
            rx={12}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Thumbnail */}
          <image
            href="/thumbnails/print-agent/order-thumbnail.png"
            x={148}
            y={638}
            width={284}
            height={184}
            preserveAspectRatio="xMidYMid meet"
            opacity={0.95}
          />
          <text
            x={290}
            y={860}
            fill={textColor}
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            Order
          </text>
        </motion.g>

        {/* --- Line: POS App -> Order --- */}
        <motion.path
          d="M330 305 H360"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={getLineVariants()}
          {...getAnimationProps(0.4)}
          markerEnd="url(#arrowhead)"
        />

        {/* --- Line: Order -> ngrok --- */}
        <motion.path
          d="M540 305 H620"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={getLineVariants()}
          {...getAnimationProps(1.0)}
          markerEnd="url(#arrowhead)"
        />

        {/* --- ngrok --- */}
        <motion.g variants={getCardVariants()} {...getAnimationProps(1.4)}>
          <rect
            x={620}
            y={260}
            width={100}
            height={90}
            rx={16}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <text
            x={670}
            y={310}
            fill={textColor}
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            ngrok
          </text>
          <text
            x={670}
            y={370}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            HTTPS Tunnel
          </text>
        </motion.g>

        {/* --- Line: ngrok -> Print Agent --- */}
        <motion.path
          d="M720 305 H800"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={getLineVariants()}
          {...getAnimationProps(1.6)}
          markerEnd="url(#arrowhead)"
        />

        {/* --- Print Agent --- */}
        <motion.g variants={getCardVariants()} {...getAnimationProps(1.8)}>
          <polygon
            points="800,285 840,265 880,285 880,325 840,345 800,325"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <text
            x={840}
            y={308}
            fill={textColor}
            fontSize={20}
            fontWeight={600}
            textAnchor="middle"
          >
            JS
          </text>

          <text
            x={840}
            y={365}
            fill={textColor}
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            Print Agent
          </text>
          <text
            x={840}
            y={385}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            :8000
          </text>
          <text
            x={840}
            y={405}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            REST API
          </text>
        </motion.g>

        {/* --- Branch lines --- */}
        {/* Label line - from right edge of Print Agent to left edge of Label box (closer, because there can be multiple prints) */}
        <motion.path
          d="M880 325 C 1000 375, 1100 375, 1150 395"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={getLineVariants()}
          {...getAnimationProps(2.4)}
          markerEnd="url(#arrowhead)"
        />
        {/* Endpoint label on label line - positioned well above the arrow */}
        <motion.g variants={getCardVariants()} {...getAnimationProps(2.5)}>
          <rect
            x={950}
            y={323}
            width={100}
            height={22}
            rx={4}
            fill={isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)"}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.5}
            opacity={0.8}
          />
          <text
            x={1000}
            y={338}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            /print-label
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
          variants={getLineVariants()}
          {...getAnimationProps(2.8)}
          markerEnd="url(#arrowhead)"
        />
        {/* Endpoint label on receipt line - positioned well below the arrow */}
        <motion.g variants={getCardVariants()} {...getAnimationProps(2.9)}>
          <rect
            x={1070}
            y={253}
            width={105}
            height={22}
            rx={4}
            fill={isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)"}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.5}
            opacity={0.8}
          />
          <text
            x={1122.5}
            y={268}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            /print-receipt
          </text>
        </motion.g>

        {/* --- Epson receipt placeholder --- */}
        <motion.g variants={getCardVariants()} {...getAnimationProps(3.0)}>
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

          <text
            x={1425}
            y={305}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            Epson TM-T20III
          </text>
          <text
            x={1425}
            y={325}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            PDFKit + SumatraPDF
          </text>
        </motion.g>

        {/* --- Brother label placeholder --- */}
        <motion.g variants={getCardVariants()} {...getAnimationProps(2.6)}>
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
            fontSize={18}
            textAnchor="middle"
          >
            Label
          </text>

          <text
            x={1225}
            y={460}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            Brother QL-700
          </text>
          <text
            x={1225}
            y={480}
            fill={textColor}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
          >
            Puppeteer + IrfanView
          </text>
        </motion.g>

        {/* --- Label 1 Thumbnail --- */}
        <motion.g
          variants={getCardVariants()}
          {...getAnimationProps(2.8)}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsLooping(false);
            setSelectedThumbnail(
              "/thumbnails/print-agent/label1-thumbnail.png"
            );
          }}
        >
          <rect
            x={520}
            y={630}
            width={300}
            height={200}
            rx={12}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Thumbnail */}
          <image
            href="/thumbnails/print-agent/label1-thumbnail.png"
            x={528}
            y={638}
            width={284}
            height={184}
            preserveAspectRatio="xMidYMid meet"
            opacity={0.95}
          />
          <text
            x={670}
            y={860}
            fill={textColor}
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            Drink #1 label
          </text>
        </motion.g>

        {/* --- Label 2 Thumbnail --- */}
        <motion.g
          variants={getCardVariants()}
          {...getAnimationProps(2.9)}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsLooping(false);
            setSelectedThumbnail(
              "/thumbnails/print-agent/label2-thumbnail.png"
            );
          }}
        >
          <rect
            x={830}
            y={630}
            width={300}
            height={200}
            rx={12}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Thumbnail */}
          <image
            href="/thumbnails/print-agent/label2-thumbnail.png"
            x={838}
            y={638}
            width={284}
            height={184}
            preserveAspectRatio="xMidYMid meet"
            opacity={0.95}
          />
          <text
            x={980}
            y={860}
            fill={textColor}
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            Drink #2 label
          </text>
        </motion.g>

        {/* --- Receipt Thumbnail --- */}
        <motion.g
          variants={getCardVariants()}
          {...getAnimationProps(3.0)}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsLooping(false);
            setSelectedThumbnail(
              "/thumbnails/print-agent/receipt-thumbnail.png"
            );
          }}
        >
          <rect
            x={1210}
            y={630}
            width={300}
            height={200}
            rx={12}
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Thumbnail */}
          <image
            href="/thumbnails/print-agent/receipt-thumbnail.png"
            x={1218}
            y={638}
            width={284}
            height={184}
            preserveAspectRatio="xMidYMid meet"
            opacity={0.95}
          />
          <text
            x={1360}
            y={860}
            fill={textColor}
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            Receipt
          </text>
        </motion.g>

        {/* --- Dotted lines from thumbnails to boxes --- */}
        {/* Order Data -> Order box (přímá čára zezhora, připojuje se zespoda blíž k názvu Order) */}
        <motion.path
          d="M290 630 L 400 350"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.7}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 6"
          variants={getLineVariants()}
          {...getAnimationProps(1.0)}
          opacity={0.6}
        />

        {/* Label 1 -> Label printer (obchází texty vpravo, připojuje se k levému okraji zvenčí) */}
        <motion.path
          d="M670 630 C 860 620, 1600 500, 1300 395"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.7}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 6"
          variants={getLineVariants()}
          {...getAnimationProps(3.0)}
          opacity={0.6}
        />

        {/* Label 2 -> Label printer (obchází texty vpravo, připojuje se k levému okraji zvenčí) */}
        <motion.path
          d="M980 630 C 1100 620, 1620 500, 1300 395"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.7}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 6"
          variants={getLineVariants()}
          {...getAnimationProps(3.1)}
          opacity={0.6}
        />

        {/* Receipt Data -> Receipt printer (ohnutá L-křivka: zespoda doprava, pak z pravé strany nahoru do Receipt boxu) */}
        <motion.path
          d="M1360 630 C 1550 600, 1620 360, 1500 235"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.7}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 6"
          variants={getLineVariants()}
          {...getAnimationProps(3.2)}
          opacity={0.6}
        />
      </motion.svg>

      {/* Modal pro full size thumbnail - renderován pomocí Portal přímo do body */}
      {selectedThumbnail &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="modal"
            onClick={() => {
              setSelectedThumbnail(null);
              setIsLooping(true);
            }}
            style={{
              overflowY: "auto",
            }}
          >
            <div
              className={`modalContent ${isMultipleImages ? "flex gap-4" : ""}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
              }}
            >
              {isMultipleImages ? (
                <>
                  {selectedThumbnail.map((src, index) => (
                    <div
                      key={index}
                      className="relative inline-block max-w-[45vw] max-h-[90vh]"
                    >
                      <img
                        src={src}
                        alt={`Full size preview ${index + 1}`}
                        className="max-w-full max-h-[90vh] w-auto h-auto object-contain modalImage"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="relative inline-block max-w-[90vw] max-h-[90vh]">
                  <div
                    className="relative cursor-zoom-in"
                    style={{
                      zoom: zoomLevel,
                      transition: "zoom 0.2s ease",
                    }}
                    onClick={handleImageClick}
                  >
                    <img
                      src={selectedThumbnail}
                      alt="Full size preview"
                      className="max-w-full max-h-[90vh] w-auto h-auto object-contain modalImage select-none"
                      draggable={false}
                    />
                  </div>
                  {/* Lupa - jednoduché přepínání mezi 1x a 2x */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isZoomed) {
                          setZoomLevel(1);
                          setIsZoomed(false);
                        } else {
                          setZoomLevel(2);
                          setIsZoomed(true);
                        }
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                        isDark
                          ? "bg-white/10 border border-white/20 hover:bg-white/20 text-white"
                          : "bg-black/10 border border-black/20 hover:bg-black/20 text-black"
                      }`}
                      aria-label={isZoomed ? "Zmenšit" : "Přiblížit"}
                      title={isZoomed ? "Zmenšit" : "Přiblížit (lupa)"}
                    >
                      {isZoomed ? (
                        <RotateCcw className="w-5 h-5" />
                      ) : (
                        <ZoomIn className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
