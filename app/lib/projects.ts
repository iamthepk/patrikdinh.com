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
    screenshot: "/thumbnails/pos-app.webp",
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
      "Local Node.js service that receives structured print jobs from the POS and routes them to the correct printer (Epson receipts or Brother stickers). Uses predefined templates for both receipts and stickers, ensuring consistent formatting, VAT accuracy, discounts, dual-currency totals, and refund handling. Prints fully silently - no dialogs, no pop-ups - and runs in the background on Windows with automatic startup. Exposes a small REST API for POS↔printer communication and generates outputs via PDFKit, Puppeteer and SumatraPDF.",
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
