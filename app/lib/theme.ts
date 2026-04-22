export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "theme";

export const FAVICON_ID = "app-favicon";
export const SHORTCUT_ICON_ID = "app-shortcut-icon";
export const APPLE_TOUCH_ICON_ID = "app-apple-touch-icon";

const DARK_FAVICON_PATH = "/favicon-dark.svg";
const LIGHT_FAVICON_PATH = "/favicon-light.svg";

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
}

function getFaviconHref(theme: Theme) {
  return theme === "dark" ? DARK_FAVICON_PATH : LIGHT_FAVICON_PATH;
}

function upsertFaviconLink(id: string, rel: string, href: string) {
  const existingLink = document.getElementById(id);
  let link: HTMLLinkElement;

  if (existingLink instanceof HTMLLinkElement) {
    link = existingLink;
  } else {
    link = document.createElement("link");
    link.id = id;

    if (existingLink) {
      existingLink.replaceWith(link);
    } else {
      document.head.appendChild(link);
    }
  }

  link.href = href;
  link.rel = rel;

  if (rel !== "apple-touch-icon") {
    link.type = "image/svg+xml";
  }
}

export function updateFaviconLinks(theme: Theme) {
  const href = getFaviconHref(theme);

  upsertFaviconLink(FAVICON_ID, "icon", href);
  upsertFaviconLink(SHORTCUT_ICON_ID, "shortcut icon", href);
  upsertFaviconLink(APPLE_TOUCH_ICON_ID, "apple-touch-icon", href);
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  updateFaviconLinks(theme);
}

export function persistTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
