"use client";

import { motion, type Variants } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useTheme } from "../lib/theme-provider";
import "./PrintAgentFlowAnimation.css";
import {
  type PrintAgentPreview,
  PRINT_AGENT_PREVIEWS,
} from "./print-agent-flow/constants";
import { PrintAgentPreviewModal } from "./print-agent-flow/PrintAgentPreviewModal";
import { usePrintAgentLoop } from "./print-agent-flow/usePrintAgentLoop";

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
      duration: 1,
      ease: "easeInOut" as const,
    },
  }),
};

interface PrintAgentFlowAnimationProps {
  isThumbnail?: boolean;
}

type FlowThumbnailCardProps = {
  preview: PrintAgentPreview;
  strokeColor: string;
  strokeWidth: number;
  textColor: string;
  openPreview: (preview: PrintAgentPreview) => void;
  getAnimationProps: (delay?: number) => {
    initial: "hidden";
    animate: "visible";
    custom: number | undefined;
  };
};

function handleSvgButtonKeyDown(
  event: ReactKeyboardEvent<SVGGElement>,
  action: () => void
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

function FlowThumbnailCard({
  preview,
  strokeColor,
  strokeWidth,
  textColor,
  openPreview,
  getAnimationProps,
}: FlowThumbnailCardProps) {
  return (
    <motion.g
      variants={cardVariants}
      {...getAnimationProps(preview.delay)}
      style={{ cursor: "pointer" }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${preview.modalTitle}`}
      onClick={() => openPreview(preview)}
      onKeyDown={(event) =>
        handleSvgButtonKeyDown(event, () => openPreview(preview))
      }
    >
      <rect
        x={preview.x}
        y={preview.y}
        width={preview.width}
        height={preview.height}
        rx={12}
        stroke={strokeColor}
        fill="none"
        strokeWidth={strokeWidth}
      />
      <image
        href={preview.src}
        x={preview.imageX}
        y={preview.imageY}
        width={preview.imageWidth}
        height={preview.imageHeight}
        preserveAspectRatio="xMidYMid meet"
        opacity={0.95}
      />
      <text
        x={preview.x + preview.width / 2}
        y={preview.y + preview.height + 30}
        fill={textColor}
        fontSize={18}
        fontWeight={600}
        textAnchor="middle"
      >
        {preview.label}
      </text>
    </motion.g>
  );
}

function FlowThumbnailConnector({
  preview,
  strokeColor,
  strokeWidth,
  getAnimationProps,
}: Omit<FlowThumbnailCardProps, "textColor" | "openPreview">) {
  return (
    <motion.path
      d={preview.connectorPath}
      stroke={strokeColor}
      strokeWidth={strokeWidth * 0.7}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 6"
      variants={lineVariants}
      {...getAnimationProps(preview.connectorDelay)}
      opacity={0.6}
    />
  );
}

export function PrintAgentFlowAnimation({
  isThumbnail = false,
}: PrintAgentFlowAnimationProps = {}) {
  const { theme } = useTheme();
  const [selectedPreview, setSelectedPreview] = useState<PrintAgentPreview | null>(
    null
  );
  const {
    animationKey,
    isLooping,
    isResetting,
    pauseLoop,
    restartAnimation,
    resumeLoop,
    toggleLoop,
  } = usePrintAgentLoop();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-black" : "bg-white";
  const strokeColor = isDark ? "white" : "#1a1a1a";
  const textColor = isDark ? "white" : "#1a1a1a";
  const strokeWidth = isDark ? 2 : 2.5;

  const getAnimationProps = (customDelay?: number) => ({
    initial: "hidden" as const,
    animate: "visible" as const,
    custom: customDelay,
  });

  const openPreview = (preview: PrintAgentPreview) => {
    pauseLoop();
    setSelectedPreview(preview);
  };

  const closePreview = () => {
    setSelectedPreview(null);
    resumeLoop();
  };

  return (
    <div
      className={`${
        isThumbnail ? "absolute inset-0 h-full w-full" : "w-full aspect-[16/9]"
      } ${bgColor} ${
        isThumbnail ? "rounded-lg" : "rounded-2xl"
      } relative overflow-hidden`}
    >
      {isThumbnail && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggleLoop();
          }}
          className={`absolute bottom-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm shadow-lg transition-all duration-200 ${
            isDark
              ? "border border-white/20 bg-white/10 hover:bg-white/20"
              : "border border-black/20 bg-black/10 hover:bg-black/20"
          }`}
          aria-label={isLooping ? "Pause animation" : "Play animation"}
        >
          {isLooping ? (
            <Pause
              className={`h-4 w-4 ${isDark ? "text-white" : "text-black"}`}
              fill={isDark ? "white" : "black"}
            />
          ) : (
            <Play
              className={`ml-0.5 h-4 w-4 ${
                isDark ? "text-white" : "text-black"
              }`}
              fill={isDark ? "white" : "black"}
            />
          )}
        </button>
      )}

      {!isThumbnail && (
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            type="button"
            onClick={toggleLoop}
            className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-colors ${
              isLooping
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {isLooping ? "⏸️ Zastavit loop" : "▶️ Zapnout loop"}
          </button>
          <button
            type="button"
            onClick={restartAnimation}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-gray-200"
          >
            🔄 Restart
          </button>
        </div>
      )}

      <motion.svg
        key={animationKey}
        viewBox="0 0 1700 820"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isResetting ? 0 : 1 }}
        transition={{
          duration: isResetting ? 0.4 : 0.5,
          ease: isResetting ? "easeIn" : "easeOut",
        }}
      >
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

        <motion.g variants={cardVariants} {...getAnimationProps(0)}>
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

        <motion.g variants={cardVariants} {...getAnimationProps(0.6)}>
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

        <motion.path
          d="M330 305 H360"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          {...getAnimationProps(0.4)}
          markerEnd="url(#arrowhead)"
        />

        <motion.path
          d="M540 305 H620"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          {...getAnimationProps(1)}
          markerEnd="url(#arrowhead)"
        />

        <motion.g variants={cardVariants} {...getAnimationProps(1.4)}>
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

        <motion.path
          d="M720 305 H800"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          {...getAnimationProps(1.6)}
          markerEnd="url(#arrowhead)"
        />

        <motion.g variants={cardVariants} {...getAnimationProps(1.8)}>
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

        <motion.path
          d="M880 325 C 1000 375, 1100 375, 1150 395"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          {...getAnimationProps(2.4)}
          markerEnd="url(#arrowhead)"
        />

        <motion.g variants={cardVariants} {...getAnimationProps(2.5)}>
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

        <motion.path
          d="M880 285 C 1050 235, 1250 235, 1350 235"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          {...getAnimationProps(2.8)}
          markerEnd="url(#arrowhead)"
        />

        <motion.g variants={cardVariants} {...getAnimationProps(2.9)}>
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

        <motion.g variants={cardVariants} {...getAnimationProps(3)}>
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

        <motion.g variants={cardVariants} {...getAnimationProps(2.6)}>
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

        {PRINT_AGENT_PREVIEWS.map((preview) => (
          <FlowThumbnailCard
            key={preview.id}
            preview={preview}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            textColor={textColor}
            openPreview={openPreview}
            getAnimationProps={getAnimationProps}
          />
        ))}

        {PRINT_AGENT_PREVIEWS.map((preview) => (
          <FlowThumbnailConnector
            key={`${preview.id}-connector`}
            preview={preview}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            getAnimationProps={getAnimationProps}
          />
        ))}
      </motion.svg>

      <PrintAgentPreviewModal
        key={selectedPreview?.id ?? "closed"}
        preview={selectedPreview}
        theme={theme}
        onClose={closePreview}
      />
    </div>
  );
}
