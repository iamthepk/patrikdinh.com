"use client";

import type { Theme } from "../../lib/theme";
import ImagePreviewModal from "../ImagePreviewModal";
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
  if (!preview) return null;

  const previewSrc = theme === "dark" ? preview.src : preview.lightSrc;

  return (
    <ImagePreviewModal
      key={previewSrc}
      src={previewSrc}
      alt={preview.modalAlt}
      onClose={onClose}
      ariaLabel={preview.modalTitle}
      closeLabel="Close Print Agent preview"
      width={920}
      height={560}
    />
  );
}
