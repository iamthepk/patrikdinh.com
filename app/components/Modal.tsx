"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  closeLabel?: string;
  panelClassName?: string;
  bodyClassName?: string;
  topBarClassName?: string;
  closeButtonClassName?: string;
  topBarContent?: ReactNode;
  children: ReactNode;
}

const EXIT_ANIMATION_MS = 380;

export default function Modal({
  isOpen,
  onClose,
  ariaLabel,
  closeLabel = "Close dialog",
  panelClassName,
  bodyClassName,
  topBarClassName,
  closeButtonClassName,
  topBarContent,
  children,
}: ModalProps) {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    };
  }, [isOpen]);

  const requestClose = () => {
    if (isExiting) {
      return;
    }

    setIsExiting(true);

    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      onClose();
      setIsExiting(false);
    }, EXIT_ANIMATION_MS);
  };

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="appModalOverlay"
      data-state={isExiting ? "closed" : "open"}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
      role="presentation"
    >
      <div
        className={["appModalPanel", panelClassName].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            requestClose();
          }
        }}
      >
        <div className={["appModalTopBar", topBarClassName].filter(Boolean).join(" ")}>
          {topBarContent && (
            <div className="appModalTopBarContent">{topBarContent}</div>
          )}
          <button
            type="button"
            className={["appModalClose", closeButtonClassName]
              .filter(Boolean)
              .join(" ")}
            aria-label={closeLabel}
            onClick={requestClose}
            autoFocus
          >
            <X className="appModalCloseIcon" aria-hidden="true" />
          </button>
        </div>
        <div className={["appModalBody", bodyClassName].filter(Boolean).join(" ")}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
