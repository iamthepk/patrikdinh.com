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
    id: "lootea-pos",
    title: "Lootea POS System",
    subtitle: "A full in-house POS solution built for real café operations.",
    description:
      "Lootea POS is a production-ready point-of-sale system running every day in our bubble-tea shop. It replaces commercial POS subscriptions, handles orders, receipts, refunds, shifts, closures, customers, exchange rates and temperature monitoring, and integrates with our custom Print Agent for instant local printing.",
    keyPoints: [
      "Covers <strong>98% of café operations</strong> with 80+ features built on a modular Supabase PostgreSQL architecture.",
      "<strong>9 standalone database systems</strong> (receipts, customers, drinks, toppings, employees, shifts, closures, exchange rates, company info).",
      "Fully featured <strong>POS interface</strong>: orders, customizations, discounts, refunds, multi-currency, payment methods, customer lookup.",
      "<strong>Advanced management panel</strong> for employees, shifts, daily closures, statistics, exchange rate changes and customer analytics.",
      "Seamless printing of receipts and drink labels via a <strong>custom Print Agent</strong> running locally on Windows.",
      "Designed for <strong>real-world workflow speed</strong>, reduced staff errors and zero friction for baristas."
    ],
    tech: "React · TypeScript · PostgreSQL",
  
    thumbnail: "/thumbnails/pos-system.webp",
  
    caseStudy: {
      title: "Lootea POS – Technical Case Study",
      sections: [
        {
          heading: "Context",
          content:
            "Commercial POS systems are expensive, rigid and often designed for generic restaurants rather than a fast-paced bubble-tea workflow. We needed a solution fully tailored to how our shop operates: drink customization, instant label printing, multi-currency receipts, manual closures, employee shifts, discounts, refunds, customer sync and reliable statistics. I built Lootea POS as a complete in-house system that runs in production every day on pos.lootea.cz."
        },
        {
          heading: "Architecture overview",
          content:
            "The system is structured around <strong>9 independent Supabase PostgreSQL modules</strong> (receipts, daily closures, customers, drinks, toppings, employees, shifts, exchange rates, company info). The frontend is built with <strong>React + TypeScript</strong> using a modular component/hook/service architecture. A custom <strong>Print Agent</strong> bridges cloud POS and local printers, enabling a native, instant printing experience. Data sync, migrations and automation (e.g., daily customer sync) run through <strong>API routes and Vercel Cron jobs</strong>."
        },
        {
          heading: "POS interface",
          content:
            "The POS screen is optimized for barista speed: big tiles, minimal clicks and clear workflows. Each drink supports size, sweetness, ice, milk, toppings, alcohol and extra shots. Payments include cash, card and delivery services. Multi-currency support (CZK/EUR) works through a dedicated Exchange Rate system. On confirmation, the POS sends structured print jobs to the Print Agent, which prints <strong>receipts and drink labels instantly</strong>, without pop-ups or manual dialogs."
        },
        {
          heading: "Receipt editing & refunds",
          content:
            "The system includes a full post-sale correction pipeline: <strong>ReceiptEditModal</strong>, <strong>DrinkEditModal</strong>, <strong>ReceiptDiscountModal</strong> and <strong>RefundModal</strong>. All edits re-calculate totals, VAT, discounts and multi-currency amounts. Audit safety rules ensure <strong>receipt_number and order_number are immutable</strong>. Refunds use a soft-refund model, creating a dedicated record while keeping the original receipt intact. Updated receipts and refunds are printed through the Print Agent."
        },
        {
          heading: "Customers & daily sync",
          content:
            "<strong>Mobile app customer</strong> data is stored in Firebase, while customers created in the POS are native to the PostgreSQL database. I built a migration pipeline with <strong>Supabase migrations, a migration script and a daily cron job</strong> that ensures the mobile app customers are kept in sync with the primary database. Each customer receives a unique incremental number via a PostgreSQL sequence. The customer module supports favorites, discounts, validation, duplicate detection, real-time updates and manual sync operations."
        },
        {
          heading: "Employees, roles & shifts",
          content:
            "The system implements a full <strong>RBAC model with 6 roles</strong> (Administrator, Manager, Leader, Employee, Part-timer, NULL). Role-based visibility hides or shows features dynamically in the UI. Employees can be managed through CRUD operations, profile avatars, and permissions. Shift management includes weekly/monthly calendars, performance statistics, earnings tracking, payment status tracking and a leader-bonus system."
        },
        {
          heading: "Daily closures & financial accuracy",
          content:
            "Managers perform manual daily closures with cash counting, payment method reconciliation, merging of totals and verification of discrepancies. The Receipt and Daily Closures systems are tightly connected to ensure accurate reporting, independent of network issues or delayed syncs. Multi-currency totals (CZK/EUR) are consistently computed across receipts, closures and statistics."
        },
        {
          heading: "Temperature monitoring",
          content:
            "For hygiene compliance, I implemented a dedicated <strong>temperature_logs</strong> system that tracks refrigerators and freezers. Staff can record temperatures, add notes after deviations and export data during inspections. The system supports timestamps, devices, locations and daily routines, enabling a traceable audit trail."
        },
        {
          heading: "Reliability & operations",
          content:
            "The POS uses optimized queries, indexes, strict data validation and a modular service layer. Error handling and retry logic are being expanded. Offline-first architecture existed in a previous version but is temporarily disabled while RLS, error boundaries and connection stability are improved. All core features run in production with near-zero downtime."
        },
        {
          heading: "My role",
          content:
            "I designed and built the entire system end-to-end: database schema, migrations, RBAC, POS interface, management panel, shift system, customer sync pipeline, daily closures, refund logic, exchange rate module and temperature monitoring. I also built the custom Print Agent responsible for all real-time printing. The system is actively used in our shop, printing hundreds of receipts and labels each month."
        }
      ]
    }
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
            "Basic logging so I can debug printing issues without direct access to the system during the shift.",
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
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Supabase",
    "Firebase",
    "PostgreSQL",
    "Vercel",
  ],
};
