"use client";

import Image from "next/image";
import { RotateCcw, ZoomIn } from "lucide-react";
import { useState } from "react";
import type { Theme } from "../../lib/theme";
import Modal from "../Modal";
import type { PrintAgentPreview } from "./constants";

type PrintAgentPreviewModalProps = {
  preview: PrintAgentPreview | null;
  theme: Theme;
  onClose: () => void;
};

export function PrintAgentPreviewModal({
  preview,
  theme,
  onClose,
}: PrintAgentPreviewModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed((currentValue) => !currentValue);
  };

  const isDark = theme === "dark";

  return (
    <Modal
      isOpen={preview !== null}
      onClose={onClose}
      ariaLabel={preview?.modalTitle ?? "Print Agent preview"}
      closeLabel="Close Print Agent preview"
      panelClassName="printAgentPreviewModalContent"
      bodyClassName="printAgentPreviewModalBody"
      closeButtonClassName="printAgentPreviewModalClose"
    >
      {preview && (
        <div className="printAgentPreviewViewport">
          <button
            type="button"
            className={`printAgentPreviewImageButton${
              isZoomed ? " printAgentPreviewImageButtonZoomed" : ""
            }`}
            onClick={toggleZoom}
            aria-label={
              isZoomed ? "Zoom out preview image" : "Zoom in preview image"
            }
          >
            <div
              className={`printAgentPreviewCanvas${
                isZoomed ? " printAgentPreviewCanvasZoomed" : ""
              }`}
            >
              <Image
                src={preview.src}
                alt={preview.modalAlt}
                fill
                unoptimized
                sizes="90vw"
                className="printAgentPreviewImage"
              />
            </div>
          </button>

          <div className="printAgentPreviewToolbar">
            <button
              type="button"
              onClick={toggleZoom}
              className={`printAgentPreviewZoomButton ${
                isDark
                  ? "printAgentPreviewZoomButtonDark"
                  : "printAgentPreviewZoomButtonLight"
              } uiTooltip uiTooltipTop`}
              aria-label={isZoomed ? "Zoom out preview" : "Zoom in preview"}
              data-tooltip={isZoomed ? "Zoom out" : "Zoom in"}
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
    </Modal>
  );
}
