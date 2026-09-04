"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  closeLabel?: string;
  overlayClassName?: string;
  panelClassName?: string;
  bodyClassName?: string;
  topBarClassName?: string;
  closeButtonClassName?: string;
  topBarContent?: ReactNode;
  children: ReactNode;
}

const EXIT_ANIMATION_MS = 380;
const FOCUSABLE_SELECTOR =
  'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]';

export default function Modal({
  isOpen,
  onClose,
  ariaLabel,
  closeLabel = "Close dialog",
  overlayClassName,
  panelClassName,
  bodyClassName,
  topBarClassName,
  closeButtonClassName,
  topBarContent,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) {
      return;
    }

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ||
      document.activeElement instanceof SVGElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    // Native modality makes the background inert, including to assistive technology.
    dialog.dataset.state = "open";
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";

    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      dialog.close();
      document.body.style.overflow = previousOverflow;

      if (previousActiveElement?.isConnected) {
        previousActiveElement.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  const requestClose = () => {
    if (closeTimeoutRef.current !== null) {
      return;
    }

    dialogRef.current?.setAttribute("data-state", "closed");

    closeTimeoutRef.current = window.setTimeout(
      () => {
        closeTimeoutRef.current = null;
        onClose();
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : EXIT_ANIMATION_MS
    );
  };

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className={["appModalOverlay", overlayClassName].filter(Boolean).join(" ")}
      data-state="open"
      aria-label={ariaLabel}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab" && !event.defaultPrevented) {
          const focusable = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement | SVGElement>(FOCUSABLE_SELECTOR)
          ).filter((element) =>
            element.tabIndex >= 0 &&
            !element.matches(":disabled") &&
            !element.closest("[hidden], [inert]") &&
            element.getClientRects().length > 0 &&
            getComputedStyle(element).visibility === "visible"
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const active = document.activeElement;

          // Keep Tab inside the page as well as outside the inert background.
          if (event.shiftKey && (active === first || active === event.currentTarget)) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && (active === last || active === event.currentTarget)) {
            event.preventDefault();
            first?.focus();
          }
        }

        if (event.key === "Escape" && !event.defaultPrevented) {
          event.preventDefault();
          event.stopPropagation();
          requestClose();
        }
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
    >
      <div
        className={["appModalPanel", panelClassName].filter(Boolean).join(" ")}
      >
        <div className={["appModalTopBar", topBarClassName].filter(Boolean).join(" ")}>
          {topBarContent && (
            <div className="appModalTopBarContent">{topBarContent}</div>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            className={["appModalClose", closeButtonClassName]
              .filter(Boolean)
              .join(" ")}
            aria-label={closeLabel}
            onClick={requestClose}
          >
            <X className="appModalCloseIcon" aria-hidden="true" />
          </button>
        </div>
        <div
          className={["appModalBody", bodyClassName].filter(Boolean).join(" ")}
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    </dialog>,
    document.body
  );
}
