"use client";

import Image from "next/image";
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
  const isDark = theme === "dark";
  const previewSrc = isDark ? preview?.src : preview?.lightSrc;

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
          <div className="printAgentPreviewCanvas">
            <Image
              src={previewSrc ?? preview.src}
              alt={preview.modalAlt}
              fill
              unoptimized
              sizes="90vw"
              className="printAgentPreviewImage"
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
