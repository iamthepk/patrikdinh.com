import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiFirebase,
  SiSupabase,
  SiVercel,
  SiVite,
  SiMui,
  SiExpress,
  SiPuppeteer,
  SiGooglegemini,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechIconComponent = IconType;

export const techIcons: Record<string, TechIconComponent> = {
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  Vercel: SiVercel,
  Vite: SiVite,
  MUI: SiMui,
  Express: SiExpress,
  Puppeteer: SiPuppeteer,
  Gemini: SiGooglegemini,
  PostgreSQL: SiPostgresql,
  "Tailwind CSS": SiTailwindcss,
  PDFKit: SiPuppeteer, // Fallback, PDFKit doesn't have an icon
};
