"use client";

import Image from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import { Maximize, ZoomIn, ZoomOut } from "lucide-react";
import Modal from "./Modal";
import "./ImagePreviewModal.css";

type ImagePreviewModalProps = {
  src: string;
  alt: string;
  ariaLabel: string;
  closeLabel: string;
  width: number;
  height: number;
  onClose: () => void;
};

export default function ImagePreviewModal({
  src,
  alt,
  ariaLabel,
  closeLabel,
  width,
  height,
  onClose,
}: ImagePreviewModalProps) {
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);

  const fitImage = () => {
    setZoom(1);
    if (viewportRef.current) {
      viewportRef.current.scrollLeft = 0;
      viewportRef.current.scrollTop = 0;
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      ariaLabel={ariaLabel}
      closeLabel={closeLabel}
      overlayClassName="imagePreviewOverlay"
      panelClassName="imagePreviewPanel"
      bodyClassName="imagePreviewBody"
      topBarClassName="imagePreviewTopBar"
      closeButtonClassName="imagePreviewControl"
      topBarContent={
        <div className="imagePreviewControls" role="group" aria-label="Image zoom">
          <button
            type="button"
            className="imagePreviewControl"
            aria-label="Zoom out"
            title="Zoom out"
            disabled={zoom <= 1}
            onClick={() => setZoom((value) => Math.max(1, value - 0.5))}
          >
            <ZoomOut aria-hidden="true" />
          </button>
          <output className="imagePreviewScale" aria-label="Zoom level" aria-live="polite">
            {Math.round(zoom * 100)}%
          </output>
          <button
            type="button"
            className="imagePreviewControl"
            aria-label="Zoom in"
            title="Zoom in"
            disabled={zoom >= 4}
            onClick={() => setZoom((value) => Math.min(4, value + 0.5))}
          >
            <ZoomIn aria-hidden="true" />
          </button>
          <button
            type="button"
            className="imagePreviewControl"
            aria-label="Fit image"
            title="Fit image"
            onClick={fitImage}
          >
            <Maximize aria-hidden="true" />
          </button>
        </div>
      }
    >
      <div
        ref={viewportRef}
        className="imagePreviewViewport"
        role="region"
        aria-label={alt}
        tabIndex={0}
        style={{
          "--image-preview-ratio": width / height,
          "--image-preview-zoom": zoom,
        } as CSSProperties}
      >
        <div className="imagePreviewCanvas">
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            draggable={false}
            className="imagePreviewImage"
          />
        </div>
      </div>
    </Modal>
  );
}
