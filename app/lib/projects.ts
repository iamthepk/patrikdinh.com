export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  keyPoints?: string[];
  tech: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
  caseStudy?: {
    title: string;
    sections: {
      heading?: string;
      content: string;
      bullets?: string[];
    }[];
  };
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
    id: "print-agent",
    title: "Print Agent",
    subtitle: "Local printing layer for a cloud-based POS system.",
    description:
      "Print Agent is a small desktop service that makes our cloud POS behave like a native local system, running on a Windows PC next to the cash desk and handling all receipts and product labels without any pop-ups or manual clicking.",
    keyPoints: [
      "Handles all receipt printing on the Epson POS printer, including discounts, VAT, refunds and <strong>dual-currency totals (CZK/EUR)</strong>.",
      "Automatically prints a label for every drink as it’s added to the order — with <strong>zero extra steps</strong> for the barista.",
      "Runs <strong>silently in the background</strong>, starts automatically with Windows and requires no staff interaction.",
      "<strong>Connects cloud POS to local printers</strong> using a secure <strong>HTTPS tunnel</strong> (ngrok) and a custom REST API.",
      "Reduced barista <strong>workflow time</strong>, removed <strong>all printing friction</strong> and made our cloud POS behave like a <strong>native on-premise system</strong>.",
    ],
    tech: "Node.js · Express",

    thumbnail: "/thumbnails/print-agent.webp",
    caseStudy: {
      title: "Print Agent – Technical Overview",
      sections: [
        {
          heading: "Context",
          content:
            "Our POS application runs in the cloud (Vercel, HTTPS) while both printers (Epson receipt printer and Brother label printer) live on a <strong>Windows PC</strong> inside the shop. Browsers can't talk directly to local printers, and mixing HTTPS (POS) with plain HTTP (local network) causes security issues (<strong>CORS, Mixed Content, .local hostname problems</strong>). I built Print Agent as a small <strong>Node.js service</strong> that sits on that Windows PC and acts as the single bridge between the cloud POS and all local printing.",
        },
        {
          heading: "High-level architecture",
          content:
            'Local <strong>Node.js service</strong> listening on a fixed port on Windows. POS app sends structured print jobs over HTTPS to a <strong>tunnel endpoint</strong>. A lightweight <strong>HTTPS tunnel</strong> forwards those requests to the local agent. The agent converts each job into either: a receipt <strong>PDF</strong> (for the Epson printer), or a <strong>label layout</strong> (for the Brother QL-700), and then triggers the actual print on the right device. The service exposes a small <strong>REST API</strong> for "print receipt", "print label", health-checks and discovery. No printers are exposed directly to the internet – only the tunnel endpoint is.',
        },
        {
          heading: "Receipts pipeline",
          content:
            "For receipts the flow is: POS sends a <strong>JSON payload</strong> describing the sale (items, VAT, discounts, totals, payment, refund flags, etc.). A dynamic template layer normalises the data (dates, VAT breakdown, multi-currency, negative totals for refunds). The template is rendered into a PDF using a <strong>PDF engine</strong>. A lightweight <strong>PDF viewer/CLI</strong> is used to send the document to the configured <strong>Epson printer</strong>. The agent returns a simple status back to the POS.",
          bullets: [
            "Normal sales, refunds and discounts (including percent-based discounts).",
            "<strong>Dual-currency totals (CZK + EUR)</strong> with printed exchange rate.",
            "Automatic <strong>cash change calculation</strong> when paying in cash.",
            "A single <strong>dynamic template</strong> where branding (logo, footer, QR for reviews, etc.) comes from the POS payload instead of being hard-coded.",
          ],
        },
        {
          heading: "Labels pipeline",
          content:
            "For drink labels: POS sends a small JSON describing one drink (name, size, sweetness/ice level, toppings, order number, round, optional message). The agent renders a compact label layout (<strong>HTML/Canvas</strong>) optimised for fast scanning by staff. A <strong>headless browser engine</strong> converts the layout to a printable format. The job is sent to the <strong>Brother QL-700 label printer</strong>. Labels are printed one per drink immediately after confirmation, so baristas just stick it on the cup and don't have to re-enter anything manually.",
        },
        {
          heading: "Reliability & operations",
          content:
            'Because this runs on a shop PC, reliability and "<strong>zero friction</strong>" for staff were priorities:',
          bullets: [
            '<strong>Automatic startup with Windows</strong> via a small helper script – no one has to remember to "turn the system on".',
            "Runs in <strong>silent mode</strong>, no console windows or dialogs for baristas.",
            "Simple restart/stop helpers for me as an admin (scripts instead of complex tooling).",
            "Built-in <strong>health-check and network info endpoints</strong> so the POS can: verify that the agent is alive, discover the correct URL / hostname to use on different clients (web browser vs iPad vs Android terminal).",
            "Basic logging so I can debug printing issues without přímý přístup k systému během směny.",
          ],
        },
        {
          heading: "Networking decisions",
          content:
            'To avoid <strong>Mixed Content/CORS issues</strong> between HTTPS POS and local HTTP, the agent uses an <strong>HTTPS tunnel (e.g. ngrok)</strong> in front of it. The tunnel URL is: started automatically together with the agent, stored locally and exposed through a tiny "what\'s my URL" endpoint for the POS. For production, the setup can be upgraded to a <strong>static tunnel/domain or a VPN</strong>, but the current design already works reliably for a single-shop environment.',
        },
        {
          heading: "My role",
          content:
            "I designed and implemented the <strong>whole solution</strong>: requirements, architecture and data model, <strong>Node.js service and printing pipelines</strong>, <strong>Windows integration</strong> (startup, restart, background mode), templates for receipts and labels, operational scripts and <strong>health-check endpoints</strong>. The system runs every day in our own shop and prints all receipts and hundreds of labels per month.",
        },
      ],
    },
  },
  {
    id: "voucher-generator",
    title: "VOUCHER GENERATOR",
    subtitle:
      "Automated PDF voucher generation with live preview, batch creation, and Supabase-backed sequencing.",
    description:
      "A precision utility for marketing operations. Generates print-ready voucher PDFs with pixel-perfect coordinate mapping, automatic sequential ID logic, and robust DEMO/PROD mode control. Designed to replace error-prone manual workflows and ensure database integrity for high-volume campaigns.",
    
    keyPoints: [
      "Generates <strong>print-ready PDF vouchers</strong> using a high-resolution template (A4, 300 DPI).",
      "Supports <strong>batch generation</strong> of up to 200 vouchers in a single transaction.", 
      "Pixel-perfect <strong>X/Y coordinate mapping</strong> with real-time live preview.", 
      "Automatic <strong>sequential numbering</strong> pulled from Supabase (PROD) or fixed sandbox start (DEMO).",
      "Built-in <strong>DEMO mode</strong> with mandatory “NOT VALID” watermark and disabled database writes.",
      "Multi-page PDF output with clean formatting and consistent layout across the entire batch."
    ],
    
    tech: "Next.js · TypeScript", 
    liveUrl: "https://voucher.generator.patrikdinh.com/",
    thumbnail: "/thumbnails/voucher-generator.webp",
    
    caseStudy: {
      title: "Voucher Generator: Precision Utility & Technical Overview",
      sections: [
        {
          heading: "Context: Automation of Print-Ready Assets",
          content:
            "Marketing operations required a robust solution for large-batch, unique customer voucher generation. Manual layout and data entry (expiration dates, sequential numbering) were error-prone and severely limited throughput. The Voucher Generator automates the entire print pipeline: incorporating live precision positioning, secure Supabase-backed sequencing, and multi-page batch processing." // Změněno na Generator
        },
        
        {
          heading: "High-level System Architecture",
          content:
            "The system is a <strong>Next.js application</strong> built on a <strong>TypeScript</strong> foundation. The backend utilizes <strong>PDFKit</strong> for a strongly typed rendering pipeline. The client handles <strong>Zero Scroll</strong> preview, positioning, and batch parameters. In <strong>PROD</strong> mode, the server securely writes each voucher record and metadata to Supabase. In <strong>DEMO</strong> mode, it applies a large watermark and skips all database transactions."
        },
        
        {
          heading: "PDF Generation Pipeline: Precision & Consistency",
          content:
            "Each page is rendered using a fixed A4 high-resolution PNG template layered with dynamic text fields. A consistent coordinate mapping ensures pixel-perfect placement for physical print. The pipeline handles:",
          bullets: [
            "Embedding brand fonts (Bebas Neue + Road Rage) for style compliance.",
            "Drawing unique <strong>sequential Voucher IDs</strong> derived from the database.",
            "Rendering expiration date, dynamic text, and metadata using coordinate mapping.",
            "Mandatory <strong>DEMO watermark</strong> applied as a rotated, low-opacity layer.",
            "Appending each voucher as a separate page within a single output PDF file."
          ]
        },
        
        {
          heading: "Live Preview Engine (Frontend)",
          content:
            "The client-side engine mirrors the final PDF layout in real-time using an optimized HTML canvas wrapper. This delivers critical user feedback:",
          bullets: [
            "Real-time X/Y coordinate adjustments for all dynamic fields.",
            "Batch preview thumbnails for sequential validation (#1, #2, #3 …).",
            "Zoom functionality (50-200%) for critical fine-tuning.",
            "Light/dark theme switching that is independent of the print output."
          ]
        },
        
        {
          heading: "Deployment Modes: DEMO vs PROD",
          content:
            "The application supports a secure two-tier environment controlled by environment variables:",
          bullets: [
            "<strong>DEMO Mode</strong>: Uses a sandbox prefix ('DEMO-'), forces sequence start at 1, and applies a mandatory <strong>'NOT VALID' watermark</strong>. All Supabase writes are disabled.",
            "<strong>PROD Mode</strong>: Uses the official campaign prefix ('10073A-'), pulls the latest sequence number from Supabase, and ensures secure storage of each voucher record without a watermark."
          ]
        },
        
        {
          heading: "Database Integrity (Supabase)",
          content:
            "Database integration is performed exclusively in PROD mode using a service role key to maintain security. Each generated voucher configuration is stored in Supabase (PostgreSQL) with key metadata for lifecycle tracking:",
          bullets: [
            "<strong>voucher_id</strong> (globally unique code generated by sequence engine)",
            "<strong>sequence number</strong> (for next batch calculation)",
            "<strong>expires_at</strong> (string)",
            "<strong>note</strong> (campaign name/batch reference)",
            "<strong>status</strong> + <strong>timestamps</strong> (redeemed_at, created_at)"
          ]
        },
        
        {
          heading: "Reliability & Performance",
          content:
            "The system is optimized for high-volume execution on Vercel's serverless platform. It reliably handles batches of <strong>up to 200 pages</strong> within the serverless execution limit. Optimisations include streaming PDF output to prevent memory issues, loading a single shared template bitmap, and asynchronous batch writing to Supabase. Robust validation logic prevents invalid inputs, ensuring clean data and reliable output."
        },
        
        {
          heading: "My Role & Ownership",
          content:
            "I was responsible for the entire full-stack pipeline: Architectural design, Next.js/TypeScript implementation, canvas-based live preview engine, secure PDFKit rendering logic, DEMO/PROD mode management, the prefix/sequence engine, Supabase integration, and final Vercel deployment setup. The tool is currently in use for live marketing campaigns."
        }
      ]
    }
  },
  {
    id: "invoice-ai",
    title: "Invoice AI Extractor",
    subtitle: "AI-powered invoice data extraction using Google Gemini.",
    description:
      "Parses <strong>complex PDF invoices</strong> into a <strong>structured, unified JSON schema</strong>. The output includes <strong>key financial data</strong> (items, <strong>VAT breakdown</strong>, totals) and comprehensive <strong>metadata</strong> (suppliers, customers). The system features built-in <strong>validation and correction logic</strong> (e.g., <strong>VAT fixes</strong>, date normalization) to ensure <strong>data integrity</strong>, which is then used directly in our internal <strong>ERP system</strong> for automated processing.",
    tech: "React · Next.js · TypeScript · Gemini",
    liveUrl: "https://invoice.ai.extractor.patrikdinh.com/",
    thumbnail: "/thumbnails/invoice-ai-extractor.webp",
    caseStudy: {
      title: "Invoice AI Extractor - Technical Overview",
      sections: [
        {
          heading: "Context & Challenge",
          content:
            "Processing invoices manually is time-consuming, expensive, and <strong>error-prone</strong>. Different suppliers use wildly varying invoice formats and layouts. <strong>Czech invoices</strong> are especially complex due to specific VAT rates (0/12/21 %), DUZP, and IČO/DIČ formats. I built Invoice AI Extractor to automatically parse PDF invoices into a <strong>unified JSON schema</strong> that our ERP system can consume directly, eliminating manual transcription and drastically reducing errors.",
        },
        {
          heading: "Architecture & Tech Stack",
          content:
            "The application is built on a high-performance stack for data integrity and speed. It uses <strong>Google Gemini 2.0 Flash</strong> for core analysis. The frontend and API are built with <strong>Next.js</strong> and strictly typed using <strong>TypeScript</strong>, which facilitates the <strong>JSON schema validation</strong> necessary for accounting data. Crucially, the extraction process is designed to be <strong>fully client-side</strong> (in a production environment) for maximum privacy and compliance.",
        },
        {
          heading: "Processing Pipeline",
          content:
            "The system employs a multi-step pipeline to ensure high accuracy:",
          bullets: [
            "<strong>Document Type Detection</strong>: Automatically classifies the document as an Invoice or Receipt, using a separate, optimized prompt and schema for each type.",
            "<strong>AI Extraction</strong>: A custom prompt is fine-tuned to enforce specific <strong>Czech accounting semantics</strong> (DUZP, IČO/DIČ, tax base) and request clean JSON output.",
            "<strong>Data Extraction</strong>: Extracts <strong>50+ critical accounting fields</strong> including financial data (line items, <strong>VAT breakdown</strong>), and comprehensive metadata (supplier/customer details, dates).",
          ],
        },
        {
          heading: "Validation & Correction Layer",
          content:
            "To achieve near-perfect accuracy, the system includes a post-processing logic that enforces <strong>accounting integrity</strong>:",
          bullets: [
            "<strong>Strict Validation</strong>: Uses TypeScript interfaces and runtime checks to validate data types and structures, fixing common AI syntax errors.",
            "<strong>Financial Recalculation</strong>: Automatically <strong>recalculates</strong> missing totals or <strong>corrects VAT base</strong> to match the VAT summary, ensuring data consistency.",
            "<strong>Date & Format Normalization</strong>: Standardizes date formats and applies <strong>Czech rounding rules</strong> to numerical values.",
          ],
        },
        {
          heading: "Security & Privacy",
          content:
            "Given the sensitivity of corporate financial data, security was a core design principle:",
          bullets: [
            "<strong>In-Memory Processing</strong>: <strong>No raw PDF data</strong> is stored in any database or persistent storage; all processing is handled exclusively in memory.",
            "<strong>Data Isolation</strong>: The PDF is sent only to the Gemini API for extraction, ensuring it does not reside on external infrastructure.",
          ],
        },
        {
          heading: "ERP Integration & Results",
          content:
            "The extracted and validated JSON is designed to integrate seamlessly with our internal ERP system. The unified schema ensures automated processing without manual intervention.",
          bullets: [
            "<strong>Accuracy</strong>: Achieved <strong>~99% accuracy</strong> across diverse real-world Czech invoices.",
            "<strong>Speed</strong>: Reduced invoice processing time from minutes to <strong>12-18 seconds per PDF</strong>.",
            "<strong>Auditing UI</strong>: Provides a clean interface with synchronized <strong>Form view</strong> and <strong>JSON view</strong> for transparent auditing.",
          ],
        },
        {
          heading: "My Role",
          content:
            "I designed and implemented the <strong>entire end-to-end solution</strong>: the Next.js application, the <strong>Gemini API integration</strong>, the <strong>PDF processing pipeline</strong>, the core validation and correction logic, and the unified JSON schema design. The system currently processes invoices daily and integrates directly with our ERP. <strong>I continuously monitor real-world failure cases (the remaining 1%) to further refine the prompt and improve the post-processing and validation logic.</strong>",
        },
      ],
    },
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
