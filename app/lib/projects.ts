export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tech: string;
  liveUrl?: string;
  githubUrl?: string;
  screenshot?: string;
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
    liveUrl: "/pos-app",
    githubUrl: "https://github.com/iamthepk/pos.lootea.cz",
    screenshot: "/thumbnails/pos-system.webp",
  },
  {
    id: "invoice-ai",
    title: "Invoice AI Extractor",
    subtitle: "AI-powered invoice data extraction using Google Gemini.",
    description:
      "Parses PDFs into a unified JSON schema, including items, VAT breakdown, totals, suppliers, customers, and metadata. Includes validation and correction logic (e.g., VAT fixes, date normalization) used directly in my internal ERP system.",
    tech: "React · Next.js · TypeScript · Gemini",
    liveUrl: "https://invoice.ai.extractor.patrikdinh.com/",
    screenshot: "/thumbnails/invoice-ai-extractor.webp",
  },
  {
    id: "print-agent",
    title: "Print Agent",
    subtitle: "Automated print job orchestration for document workflows.",
    description:
      "Local Node.js service that receives print requests from the POS system and handles thermal receipt printing (including refunds, VAT, discounts, dual-currency totals) and Brother label printing for individual drinks. Runs silently in the background, starts automatically with Windows, and exposes a small REST API for POS↔printer communication. Generates receipts via PDFKit and controls printers using SumatraPDF and Puppeteer.",
    tech: "Node.js · Express",
    screenshot: "/thumbnails/print-agent.webp",
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
