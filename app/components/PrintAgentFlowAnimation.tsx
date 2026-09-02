"use client";

import { motion, type Variants } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
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
  imageSrc: string;
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
  imageSrc,
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
        rx={8}
        stroke={strokeColor}
        fill="none"
        strokeWidth={strokeWidth}
      />
      <image
        href={imageSrc}
        x={preview.imageX}
        y={preview.imageY}
        width={preview.imageWidth}
        height={preview.imageHeight}
        preserveAspectRatio="xMidYMid meet"
        opacity={1}
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
  const mutedTextColor = isDark
    ? "rgba(255,255,255,0.62)"
    : "rgba(26,26,26,0.62)";
  const softStrokeColor = isDark
    ? "rgba(255,255,255,0.28)"
    : "rgba(26,26,26,0.24)";
  const nodeFillColor = isDark ? "#050505" : "#ffffff";
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
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-colors ${
              isLooping
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {isLooping ? (
              <>
                <Pause className="h-4 w-4" />
                Pause loop
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play loop
              </>
            )}
          </button>
          <button
            type="button"
            onClick={restartAnimation}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-gray-200"
          >
            <RotateCcw className="h-4 w-4" />
            Restart
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
            <path d="M0,0 L0,6 L9,3 Z" fill={strokeColor} stroke="none" />
          </marker>
        </defs>

        <motion.g variants={cardVariants} {...getAnimationProps(0)}>
          <rect
            x={90}
            y={120}
            width={350}
            height={300}
            rx={8}
            stroke={strokeColor}
            fill={nodeFillColor}
            strokeWidth={strokeWidth}
          />
          <text
            x={265}
            y={175}
            fill={textColor}
            fontSize={34}
            fontWeight={800}
            textAnchor="middle"
          >
            Cloud POS
          </text>
          <text
            x={265}
            y={220}
            fill={mutedTextColor}
            fontSize={20}
            fontWeight={700}
            textAnchor="middle"
          >
            sends tokenized jobs
          </text>
          <line x1={120} y1={245} x2={410} y2={245} stroke={softStrokeColor} />
          <text
            x={265}
            y={284}
            fill={textColor}
            fontSize={22}
            fontWeight={700}
            textAnchor="middle"
          >
            GET /health
          </text>
          <text
            x={265}
            y={320}
            fill={textColor}
            fontSize={22}
            fontWeight={700}
            textAnchor="middle"
          >
            POST /print-jobs
          </text>
          <text
            x={265}
            y={356}
            fill={textColor}
            fontSize={21}
            fontWeight={700}
            textAnchor="middle"
          >
            receipt / kitchen
          </text>
          <text
            x={265}
            y={390}
            fill={textColor}
            fontSize={21}
            fontWeight={700}
            textAnchor="middle"
          >
            cash_drawer
          </text>
        </motion.g>

        <motion.path
          d="M440 270 H610"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.9}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          {...getAnimationProps(0.65)}
          markerEnd="url(#arrowhead)"
        />

        <motion.g variants={cardVariants} {...getAnimationProps(0.9)}>
          <rect
            x={610}
            y={105}
            width={430}
            height={330}
            rx={8}
            stroke={strokeColor}
            fill={nodeFillColor}
            strokeWidth={strokeWidth * 1.15}
          />
          <text
            x={825}
            y={165}
            fill={textColor}
            fontSize={38}
            fontWeight={850}
            textAnchor="middle"
          >
            Print Agent
          </text>
          <text
            x={825}
            y={205}
            fill={mutedTextColor}
            fontSize={22}
            fontWeight={750}
            textAnchor="middle"
          >
            Electron app - 127.0.0.1:47821
          </text>
          <line x1={650} y1={232} x2={1000} y2={232} stroke={softStrokeColor} />
          <text
            x={825}
            y={275}
            fill={textColor}
            fontSize={22}
            fontWeight={750}
            textAnchor="middle"
          >
            Token auth + config UI
          </text>
          <text
            x={825}
            y={312}
            fill={textColor}
            fontSize={22}
            fontWeight={750}
            textAnchor="middle"
          >
            Role routing + printer queues
          </text>
          <text
            x={825}
            y={349}
            fill={textColor}
            fontSize={22}
            fontWeight={750}
            textAnchor="middle"
          >
            PDF/ESC-POS + Windows fallback
          </text>
          <text
            x={825}
            y={386}
            fill={textColor}
            fontSize={22}
            fontWeight={750}
            textAnchor="middle"
          >
            Health + 24h dedupe
          </text>
        </motion.g>

        <motion.path
          d="M1040 270 H1128"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.9}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          {...getAnimationProps(1.25)}
        />

        <motion.path
          d="M1128 162.5 V492.5"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.9}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          {...getAnimationProps(1.35)}
        />

        <motion.path
          d="M1128 162.5 H1180"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.9}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          {...getAnimationProps(1.5)}
          markerEnd="url(#arrowhead)"
        />

        <motion.path
          d="M1128 337.5 H1180"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.9}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          {...getAnimationProps(1.6)}
          markerEnd="url(#arrowhead)"
        />

        <motion.path
          d="M1128 492.5 H1180"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.9}
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          {...getAnimationProps(1.7)}
          markerEnd="url(#arrowhead)"
        />

        <motion.g variants={cardVariants} {...getAnimationProps(1.7)}>
          <rect
            x={1180}
            y={95}
            width={455}
            height={135}
            rx={8}
            stroke={strokeColor}
            fill={nodeFillColor}
            strokeWidth={strokeWidth}
          />
          <text
            x={1407.5}
            y={145}
            fill={textColor}
            fontSize={28}
            fontWeight={850}
            textAnchor="middle"
          >
            Receipt
          </text>
          <text
            x={1407.5}
            y={184}
            fill={mutedTextColor}
            fontSize={20}
            fontWeight={700}
            textAnchor="middle"
          >
            SumatraPDF/PDF - ESC/POS raw
          </text>
        </motion.g>

        <motion.g variants={cardVariants} {...getAnimationProps(1.9)}>
          <rect
            x={1180}
            y={270}
            width={455}
            height={135}
            rx={8}
            stroke={strokeColor}
            fill={nodeFillColor}
            strokeWidth={strokeWidth}
          />
          <text
            x={1407.5}
            y={320}
            fill={textColor}
            fontSize={28}
            fontWeight={850}
            textAnchor="middle"
          >
            Kitchen label
          </text>
          <text
            x={1407.5}
            y={359}
            fill={mutedTextColor}
            fontSize={20}
            fontWeight={700}
            textAnchor="middle"
          >
            Image/PDF - Windows fallback
          </text>
        </motion.g>

        <motion.g variants={cardVariants} {...getAnimationProps(2.1)}>
          <rect
            x={1180}
            y={445}
            width={455}
            height={95}
            rx={8}
            stroke={strokeColor}
            fill={nodeFillColor}
            strokeWidth={strokeWidth}
          />
          <text
            x={1407.5}
            y={485}
            fill={textColor}
            fontSize={28}
            fontWeight={850}
            textAnchor="middle"
          >
            Drawer kick
          </text>
          <text
            x={1407.5}
            y={519}
            fill={mutedTextColor}
            fontSize={20}
            fontWeight={700}
            textAnchor="middle"
          >
            ESC p pulse
          </text>
        </motion.g>

        <motion.g variants={cardVariants} {...getAnimationProps(2.35)}>
          <text x={95} y={585} fill={mutedTextColor} fontSize={18} fontWeight={800}>
            API contracts
          </text>
          <line x1={230} y1={579} x2={1510} y2={579} stroke={softStrokeColor} />
        </motion.g>

        {PRINT_AGENT_PREVIEWS.map((preview) => (
          <FlowThumbnailCard
            key={preview.id}
            preview={preview}
            imageSrc={isDark ? preview.src : preview.lightSrc}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            textColor={textColor}
            openPreview={openPreview}
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
