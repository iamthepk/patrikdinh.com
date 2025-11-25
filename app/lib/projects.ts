export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tech: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    id: "pos-system",
    title: "POS System",
    subtitle:
      "Modern point-of-sale with real-time inventory, smart invoicing, and automated workflows.",
    description:
      "Designed for high-throughput bubble tea operations with instant printing, dual-currency support, and live sync with the internal ERP. Includes order flow, inventory deduction, discounts, VAT handling, shift management, and customer database integration.",
    tech: "React · TypeScript · Supabase · Vite · MUI",
    liveUrl: "https://pos.system.patrikdinh.com/",
    thumbnail: "/thumbnails/pos-app.webp",
  },
  {
    id: "invoice-ai",
    title: "Invoice AI Extractor",
    subtitle: "AI-powered invoice data extraction using Google Gemini.",
    description:
      "Parses complex PDF invoices into a structured, unified JSON schema. The output includes key financial data (items, VAT breakdown, totals) and comprehensive metadata (suppliers, customers). The system features built-in validation and correction logic (e.g., VAT fixes, date normalization) to ensure data integrity, which is then used directly in our internal ERP system for automated processing.",
    tech: "React · Next.js · TypeScript · Gemini",
    liveUrl: "https://invoice.ai.extractor.patrikdinh.com/",
    thumbnail: "/thumbnails/invoice-ai-extractor.webp",
  },
  {
    id: "print-agent",
    title: "Print Agent",
    subtitle: "Automated print job orchestration for document workflows.",
    description:
      "Local Node.js service that receives structured print jobs from the POS and routes them to the correct printer (Epson receipts or Brother stickers). Uses ngrok for secure, stable HTTPS tunneling, which bridges the gap between the cloud-hosted POS application and the local Print Agent, eliminating Mixed Content and CORS issues. Uses predefined templates for both receipts and stickers, ensuring consistent formatting, VAT accuracy, discounts, dual-currency totals, and refund handling. Prints fully silently - no dialogs, no pop-ups - and runs in the background on Windows with automatic startup. Exposes a small REST API for POS↔printer communication and generates outputs via PDFKit, Puppeteer and SumatraPDF.",
    tech: "Node.js · Express",
    thumbnail: "/thumbnails/print-agent.webp",
  },
];

export const techStack = {
  primary: [
    "React",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Node.js",
    "Firebase",
    "Supabase",
    "Vercel",
  ],
};
