import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

const motionPropsToStrip = new Set([
  "animate",
  "custom",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "transition",
  "variants",
  "viewport",
  "whileHover",
  "whileInView",
  "whileTap",
]);

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    priority,
    ...rest
  }: {
    src: string | { src?: string };
    alt: string;
    fill?: boolean;
    priority?: boolean;
    quality?: number;
    placeholder?: string;
    blurDataURL?: string;
    loader?: unknown;
    unoptimized?: boolean;
    [key: string]: unknown;
  }) => {
    const resolvedSrc = typeof src === "string" ? src : src?.src ?? "";
    const domProps = { ...rest };

    delete domProps.quality;
    delete domProps.placeholder;
    delete domProps.blurDataURL;
    delete domProps.loader;
    delete domProps.unoptimized;

    const nextProps = {
      ...domProps,
      alt,
      src: resolvedSrc,
      "data-fill": fill ? "true" : undefined,
      "data-priority": priority ? "true" : undefined,
    };

    return React.createElement("img", nextProps);
  },
}));

vi.mock("framer-motion", () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        ({
          children,
          ...props
        }: {
          children?: React.ReactNode;
          [key: string]: unknown;
        }) => {
          const domProps = Object.fromEntries(
            Object.entries(props).filter(
              ([key]) => !motionPropsToStrip.has(key)
            )
          );

          return React.createElement(tag, domProps, children);
        },
    }
  );

  return { motion };
});

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

afterEach(() => {
  cleanup();
  document.documentElement.className = "";
  document.body.innerHTML = "";
  document.body.removeAttribute("style");
  window.localStorage.clear();
  vi.clearAllMocks();
});
