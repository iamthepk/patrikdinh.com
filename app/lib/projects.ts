import { type RichTextValue, em, rich, strong } from "./rich-text";

type ProjectCaseStudySection = {
  heading?: RichTextValue;
  content: RichTextValue;
  bullets?: RichTextValue[];
};

export type ProjectThumbnail = {
  default: string;
  dark?: string;
  light?: string;
};

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: RichTextValue;
  keyPoints?: RichTextValue[];
  challenge?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  previewType?: "image" | "print-agent-flow";
  thumbnail?: ProjectThumbnail;
  caseStudy?: {
    title: string;
    sections: ProjectCaseStudySection[];
  };
}

export const PLACEHOLDER_THUMBNAIL: ProjectThumbnail = {
  default: "/thumbnails/no-image.svg",
  dark: "/thumbnails/no-image-dark.svg",
  light: "/thumbnails/no-image-light.svg",
};

export const projects: Project[] = [
  {
    id: "lootea-pos",
    title: "Lootea Operations System",
    subtitle: "An in-house system built to run real day-to-day cafe operations.",
    description:
      "An in-house operations system built around real bubble tea workflows, not generic restaurant assumptions. It combines POS, printing, stock, recipes, reporting, shifts, invoices and daily management into one production system used every day.",
    keyPoints: [
      rich(
        "Built for ",
        strong("real cafe workflow speed"),
        " across checkout, prep, back office and daily management."
      ),
      rich(
        "Combines ",
        strong("POS, local printing, stock, recipes, reporting, invoices and shifts"),
        " in one production system."
      ),
      rich(
        "Supports ",
        strong(
          "parked orders, split payments, cash rounding, refunds, vouchers and dual-currency receipts"
        ),
        " in daily use."
      ),
      rich(
        "Includes ",
        strong(
          "RBAC, investor reporting, customer sync, Google Calendar shift sync and security alerts"
        ),
        " for real operations."
      ),
      rich(
        "Connected to a custom ",
        strong("Print Agent"),
        " for instant receipts, drink labels and cash drawer actions without extra staff steps."
      ),
      "Reduced operational friction, replaced rigid subscription tooling and gave the business a system it can keep evolving in-house.",
    ],
    challenge:
      "Keeping checkout, printing, refunds, stock, permissions and reporting coherent in daily operation.",
    tech: ["React", "TypeScript", "PostgreSQL"],
    thumbnail: PLACEHOLDER_THUMBNAIL,
    caseStudy: {
      title: "Lootea Operations System: Technical Case Study",
      sections: [
        {
          heading: "Context",
          content:
            "Commercial POS systems solved only part of the problem. What we actually needed was a system built around how the shop runs every day: ordering, label printing, refunds, parked orders, shifts, stock, recipes, invoices, reporting and management workflows. I built Lootea as an in-house production system that now runs day-to-day operations on pos.lootea.cz.",
        },
        {
          heading: rich("Technical challenges ", em("aka the nightmares")),
          content:
            "The hard part was not building screens. It was keeping checkout, printing, refunds, stock, recipes, reporting, permissions and daily workflows coherent under real shop conditions. Receipts and labels had to print instantly, totals had to survive edits and refunds, and management data had to stay trustworthy enough for closures, reporting and back-office work.",
        },
        {
          heading: "Architecture overview",
          content: rich(
            "The core stack is ",
            strong("React + TypeScript + Vite PWA"),
            " on the frontend with ",
            strong("Supabase"),
            " as the main backend for Postgres, auth, storage, realtime and edge functions. Around that, I built serverless API routes, scheduled jobs and integrations for customer sync, Google Calendar shifts, invoice processing and security alerts. A custom ",
            strong("Print Agent"),
            " bridges the cloud app with local hardware so the system can behave like native in-store software."
          ),
        },
        {
          heading: "POS and front-of-house workflows",
          content:
            "The POS layer is optimized for barista speed: big tiles, minimal clicks and clear product flows. Orders support drink configuration, parked orders, vouchers, split payments, cash rounding, refunds and multiple payment methods. On confirmation, the system sends structured jobs to the Print Agent so receipts, labels and cash drawer actions happen without browser popups or extra staff interaction.",
        },
        {
          heading: "Receipt editing & refunds",
          content: rich(
            "The system includes a full post-sale correction pipeline: ",
            strong("ReceiptEditModal"),
            ", ",
            strong("DrinkEditModal"),
            ", ",
            strong("ReceiptDiscountModal"),
            " and ",
            strong("RefundModal"),
            ". All edits re-calculate totals, VAT, discounts and multi-currency amounts. Audit safety rules ensure ",
            strong("receipt_number and order_number are immutable"),
            ". Refunds use a soft-refund model, creating a dedicated record while keeping the original receipt intact. Updated receipts and refunds are printed through the Print Agent."
          ),
        },
        {
          heading: "Customers & daily sync",
          content: rich(
            strong("Mobile app customer"),
            " data is stored in Firebase, while customers created in the POS are native to the PostgreSQL database. I built a migration pipeline with ",
            strong("Supabase migrations, a migration script and a daily cron job"),
            " that ensures the mobile app customers are kept in sync with the primary database. Each customer receives a unique incremental number via a PostgreSQL sequence. The customer module supports favorites, discounts, validation, duplicate detection, real-time updates and manual sync operations."
          ),
        },
        {
          heading: "Operations layer",
          content:
            "Beyond checkout, the system covers the operational side of the business: employees, role-based permissions, shifts, customer data, daily closures, office workflows and reporting. It includes a dedicated stock engine, recipes engine, nutrition and allergen display in POS, Google Calendar sync for shifts, investor-specific reporting access and internal tools for invoices, cash and bank transactions.",
        },
        {
          heading: "Daily closures & financial accuracy",
          content:
            "Managers perform manual daily closures with cash counting, payment method reconciliation, merging of totals and verification of discrepancies. The Receipt and Daily Closures systems are tightly connected to ensure accurate reporting, independent of network issues or delayed syncs. Multi-currency totals (CZK/EUR) are consistently computed across receipts, closures and statistics.",
        },
        {
          heading: "Reliability, security and automation",
          content:
            "The system is built around migrations, strict data handling and feature-level access control rather than loose admin shortcuts. It includes customer sync from legacy sources, scheduled cleanup and sync jobs, security alert detection, invoice AI processing and production checks around VAT, discounts, cash rounding and reporting. Offline mode existed in an earlier version, but the current priority is stable online-first operation with strong data integrity.",
        },
        {
          heading: "Reliability & operations",
          content:
            "The POS uses optimized queries, indexes, strict data validation and a modular service layer. Error handling and retry logic are being expanded. Offline-first architecture existed in a previous version but is temporarily disabled while RLS, error boundaries and connection stability are improved. All core features run in production with near-zero downtime.",
        },
        {
          heading: "Impact",
          content:
            "Lootea replaced a more limited subscription-style setup with a system tailored to the way the business actually operates. It brought checkout, management and back-office workflows into one place, reduced friction for staff, and made it possible to improve the system continuously based on real daily use instead of vendor constraints.",
        },
        {
          heading: "My role",
          content:
            "I designed and built the system end-to-end: product structure, database schema, migrations, POS flows, management screens, permissions, stock and recipes, reporting, shift tools, customer sync, invoice workflows, integrations and production hardening. I used AI tools to move faster, but the architecture, implementation decisions, testing and day-to-day reliability were my responsibility. The system is actively used in daily operation.",
        },
      ],
    },
  },
  {
    id: "print-agent",
    title: "Print Agent",
    subtitle: "Local printing layer for a cloud-based POS system.",
    description:
      "A local desktop bridge that makes a cloud-based POS behave like a native in-store system. Running on a Windows PC next to the cash desk, it handles receipt and label printing without browser dialogs, manual clicks or staff intervention.",
    keyPoints: [
      rich(
        "Built to solve the real gap between a ",
        strong("cloud POS"),
        " and ",
        strong("local in-shop printers"),
        "."
      ),
      rich(
        "Prints receipts with discounts, VAT, refunds and ",
        strong("dual-currency totals (CZK/EUR)"),
        "."
      ),
      rich(
        "Automatically prints a drink label for every confirmed item with ",
        strong("zero extra barista steps"),
        "."
      ),
      rich(
        "Runs ",
        strong("silently in the background"),
        ", starts with Windows and is designed for day-to-day reliability."
      ),
      "Uses a custom REST API and secure HTTPS tunnel to connect cloud workflows with local hardware.",
      rich(
        "Turned slow, fragile browser printing into a workflow that feels like a ",
        strong("native on-prem system"),
        "."
      ),
    ],
    challenge:
      "Browser printing was too slow and too fragile for live cafe workflow.",
    tech: ["Node.js", "Express"],
    previewType: "print-agent-flow",
    caseStudy: {
      title: "Print Agent - Technical Overview",
      sections: [
        {
          heading: "Context",
          content: rich(
            "Our POS application runs in the cloud (Vercel, HTTPS) while both printers (Epson receipt printer and Brother label printer) live on a ",
            strong("Windows PC"),
            " inside the shop. Browsers can't talk directly to local printers, and mixing HTTPS (POS) with plain HTTP (local network) causes security issues (",
            strong("CORS, Mixed Content, .local hostname problems"),
            "). I built Print Agent as a small ",
            strong("Node.js service"),
            " that sits on that Windows PC and acts as the single bridge between the cloud POS and all local printing."
          ),
        },
        {
          heading: "High-level architecture",
          content: rich(
            "Local ",
            strong("Node.js service"),
            " listening on a fixed port on Windows. POS app sends structured print jobs over HTTPS to a ",
            strong("tunnel endpoint"),
            ". A lightweight ",
            strong("HTTPS tunnel"),
            " forwards those requests to the local agent. The agent converts each job into either: a receipt ",
            strong("PDF"),
            " (for the Epson printer), or a ",
            strong("label layout"),
            " (for the Brother QL-700), and then triggers the actual print on the right device. The service exposes a small ",
            strong("REST API"),
            " for \"print receipt\", \"print label\", health-checks and discovery. No printers are exposed directly to the internet - only the tunnel endpoint is."
          ),
        },
        {
          heading: "Receipts pipeline",
          content: rich(
            "For receipts the flow is: POS sends a ",
            strong("JSON payload"),
            " describing the sale (items, VAT, discounts, totals, payment, refund flags, etc.). A dynamic template layer normalises the data (dates, VAT breakdown, multi-currency, negative totals for refunds). The template is rendered into a PDF using a ",
            strong("PDF engine"),
            ". A lightweight ",
            strong("PDF viewer/CLI"),
            " is used to send the document to the configured ",
            strong("Epson printer"),
            ". The agent returns a simple status back to the POS."
          ),
          bullets: [
            "Normal sales, refunds and discounts (including percent-based discounts).",
            rich(
              strong("Dual-currency totals (CZK + EUR)"),
              " with printed exchange rate."
            ),
            rich(
              "Automatic ",
              strong("cash change calculation"),
              " when paying in cash."
            ),
            rich(
              "A single ",
              strong("dynamic template"),
              " where branding (logo, footer, QR for reviews, etc.) comes from the POS payload instead of being hard-coded."
            ),
          ],
        },
        {
          heading: "Labels pipeline",
          content: rich(
            "For drink labels: POS sends a small JSON describing one drink (name, size, sweetness/ice level, toppings, order number, round, optional message). The agent renders a compact label layout (",
            strong("HTML/Canvas"),
            ") optimised for fast scanning by staff. A ",
            strong("headless browser engine"),
            " converts the layout to a printable format. The job is sent to the ",
            strong("Brother QL-700 label printer"),
            ". Labels are printed one per drink immediately after confirmation, so baristas just stick it on the cup and don't have to re-enter anything manually."
          ),
        },
        {
          heading: rich("Technical challenges ", em("aka the nightmares")),
          content:
            "The first versions proved the main problem quickly: browser-style printing was too fragile and too slow for live cafe operation. Even small delays or popups break the flow when staff are handling a queue. I had to optimize the pipeline so receipt and label generation felt immediate, make the whole thing survive day-to-day Windows reality, and keep failure points small enough to debug during a live shift.",
        },
        {
          heading: "Reliability & operations",
          content: rich(
            "Because this runs on a shop PC, reliability and \"",
            strong("zero friction"),
            "\" for staff were priorities:"
          ),
          bullets: [
            rich(
              strong("Automatic startup with Windows"),
              " via a small helper script - no one has to remember to \"turn the system on\"."
            ),
            rich(
              "Runs in ",
              strong("silent mode"),
              ", no console windows or dialogs for baristas."
            ),
            "Simple restart/stop helpers for me as an admin (scripts instead of complex tooling).",
            rich(
              "Built-in ",
              strong("health-check and network info endpoints"),
              " so the POS can: verify that the agent is alive, discover the correct URL / hostname to use on different clients (web browser vs iPad vs Android terminal)."
            ),
            "Basic logging so I can debug printing issues without direct access to the system during the shift.",
          ],
        },
        {
          heading: "Networking decisions",
          content: rich(
            "To avoid ",
            strong("Mixed Content/CORS issues"),
            " between HTTPS POS and local HTTP, the agent uses an ",
            strong("HTTPS tunnel (e.g. ngrok)"),
            " in front of it. The tunnel URL is: started automatically together with the agent, stored locally and exposed through a tiny \"what's my URL\" endpoint for the POS. For production, the setup can be upgraded to a ",
            strong("static tunnel/domain or a VPN"),
            ", but the current design already works reliably for a single-shop environment."
          ),
        },
        {
          heading: "Impact",
          content:
            "Print Agent removed the weakest part of the whole POS workflow: local printing from a cloud app. Instead of staff fighting browser dialogs or unreliable device behavior, printing became part of the flow. That made the cloud POS feel local, faster and operationally dependable.",
        },
        {
          heading: "My role",
          content: rich(
            "I designed and implemented the ",
            strong("whole solution"),
            ": requirements, architecture and data model, ",
            strong("Node.js service and printing pipelines"),
            ", ",
            strong("Windows integration"),
            " (startup, restart, background mode), templates for receipts and labels, operational scripts and ",
            strong("health-check endpoints"),
            ". I used AI tools where they helped me move faster, but the real work was making the system stable, testable and trustworthy in daily operation."
          ),
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
      "A precision tool for marketing operations that replaced slow, error-prone manual voucher preparation with a controlled PDF generation workflow. It handles print-ready output, batch creation, sequential IDs and DEMO/PROD safeguards without sacrificing layout accuracy.",
    keyPoints: [
      rich(
        "Replaced a ",
        strong("manual voucher workflow"),
        " with a faster, more reliable batch process."
      ),
      rich(
        "Generates ",
        strong("print-ready PDF vouchers"),
        " using a high-resolution A4 template."
      ),
      rich(
        "Supports ",
        strong("batch generation"),
        " of up to 200 vouchers in a single transaction."
      ),
      rich(
        "Uses pixel-perfect ",
        strong("X/Y coordinate mapping"),
        " with live preview for layout accuracy."
      ),
      rich(
        "Handles ",
        strong("sequential numbering"),
        " safely via Supabase in PROD and sandbox logic in DEMO."
      ),
      rich(
        "Protects production data with a clear ",
        strong("DEMO mode"),
        ", watermarking and disabled writes."
      ),
    ],
    challenge:
      "Keeping print precision, batch sequencing and DEMO/PROD safety reliable at once.",
    tech: ["Next.js", "TypeScript"],
    liveUrl: "https://voucher.generator.patrikdinh.com/",
    thumbnail: {
      default: "/thumbnails/voucher-generator-dark.webp",
      dark: "/thumbnails/voucher-generator-dark.webp",
      light: "/thumbnails/voucher-generator-light.webp",
    },
    caseStudy: {
      title: "Voucher Generator: Precision Utility & Technical Overview",
      sections: [
        {
          heading: "Context: Automation of Print-Ready Assets",
          content:
            "Marketing operations required a robust solution for large-batch, unique customer voucher generation. Manual layout and data entry (expiration dates, sequential numbering) were error-prone and severely limited throughput. The Voucher Generator automates the entire print pipeline: incorporating live precision positioning, secure Supabase-backed sequencing, and multi-page batch processing.",
        },
        {
          heading: "High-level System Architecture",
          content: rich(
            "The system is a ",
            strong("Next.js application"),
            " built on a ",
            strong("TypeScript"),
            " foundation. The backend utilizes ",
            strong("PDFKit"),
            " for a strongly typed rendering pipeline. The client handles ",
            strong("Zero Scroll"),
            " preview, positioning, and batch parameters. In ",
            strong("PROD"),
            " mode, the server securely writes each voucher record and metadata to Supabase. In ",
            strong("DEMO"),
            " mode, it applies a large watermark and skips all database transactions."
          ),
        },
        {
          heading: rich("Technical challenges ", em("aka the nightmares")),
          content:
            "What looks simple on the surface - placing text on a voucher - becomes annoying fast when precision, sequencing and print consistency all matter at once. The hard part was making batch generation reliable, keeping coordinate mapping accurate across the whole PDF pipeline, and preventing DEMO/PROD mistakes that could pollute real campaign data.",
        },
        {
          heading: "PDF Generation Pipeline: Precision & Consistency",
          content:
            "Each page is rendered using a fixed A4 high-resolution PNG template layered with dynamic text fields. A consistent coordinate mapping ensures pixel-perfect placement for physical print. The pipeline handles:",
          bullets: [
            "Embedding brand fonts (Bebas Neue + Road Rage) for style compliance.",
            rich(
              "Drawing unique ",
              strong("sequential Voucher IDs"),
              " derived from the database."
            ),
            "Rendering expiration date, dynamic text, and metadata using coordinate mapping.",
            rich(
              "Mandatory ",
              strong("DEMO watermark"),
              " applied as a rotated, low-opacity layer."
            ),
            "Appending each voucher as a separate page within a single output PDF file.",
          ],
        },
        {
          heading: "Live Preview Engine (Frontend)",
          content:
            "The client-side engine mirrors the final PDF layout in real-time using an optimized HTML canvas wrapper. This delivers critical user feedback:",
          bullets: [
            "Real-time X/Y coordinate adjustments for all dynamic fields.",
            "Batch preview thumbnails for sequential validation (#1, #2, #3 ...).",
            "Zoom functionality (50-200%) for critical fine-tuning.",
            "Light/dark theme switching that is independent of the print output.",
          ],
        },
        {
          heading: "Deployment Modes: DEMO vs PROD",
          content:
            "The application supports a secure two-tier environment controlled by environment variables:",
          bullets: [
            rich(
              strong("DEMO Mode"),
              ": Uses a sandbox prefix ('DEMO-'), forces sequence start at 1, and applies a mandatory ",
              strong("'NOT VALID' watermark"),
              ". All Supabase writes are disabled."
            ),
            rich(
              strong("PROD Mode"),
              ": Uses the official campaign prefix ('10073A-'), pulls the latest sequence number from Supabase, and ensures secure storage of each voucher record without a watermark."
            ),
          ],
        },
        {
          heading: "Database Integrity (Supabase)",
          content:
            "Database integration is performed exclusively in PROD mode using a service role key to maintain security. Each generated voucher configuration is stored in Supabase (PostgreSQL) with key metadata for lifecycle tracking:",
          bullets: [
            rich(strong("voucher_id"), " (globally unique code generated by sequence engine)"),
            rich(strong("sequence number"), " (for next batch calculation)"),
            rich(strong("expires_at"), " (string)"),
            rich(strong("note"), " (campaign name/batch reference)"),
            rich(
              strong("status"),
              " + ",
              strong("timestamps"),
              " (redeemed_at, created_at)"
            ),
          ],
        },
        {
          heading: "Reliability & Performance",
          content: rich(
            "The system is optimized for high-volume execution on Vercel's serverless platform. It reliably handles batches of ",
            strong("up to 200 pages"),
            " within the serverless execution limit. Optimisations include streaming PDF output to prevent memory issues, loading a single shared template bitmap, and asynchronous batch writing to Supabase. Robust validation logic prevents invalid inputs, ensuring clean data and reliable output."
          ),
        },
        {
          heading: "Impact",
          content:
            "The tool turned a fragile manual process into a repeatable workflow with predictable output, safer sequencing and less room for human error. That matters most during live campaigns, where mistakes in numbering or print preparation create operational noise very quickly.",
        },
        {
          heading: "My Role & Ownership",
          content:
            "I was responsible for the entire full-stack pipeline: architectural design, Next.js/TypeScript implementation, canvas-based live preview engine, secure PDFKit rendering logic, DEMO/PROD mode management, the prefix/sequence engine, Supabase integration, and final Vercel deployment setup. AI tools helped with speed, but the production rules, layout precision and safety guarantees were mine to define and test.",
        },
      ],
    },
  },
  {
    id: "invoice-ai",
    title: "Invoice AI Extractor",
    subtitle: "AI-powered invoice data extraction using Google Gemini.",
    description:
      "An AI-powered invoice extraction pipeline built for real accounting workflows, not demo screenshots. It converts complex PDF invoices into a structured JSON schema, then validates, corrects and normalizes the result so it can be used directly in our internal ERP.",
    challenge:
      "Making AI extraction trustworthy enough for accounting and ERP use, not just demos.",
    tech: ["React", "Next.js", "TypeScript", "Gemini"],
    liveUrl: "https://invoice.ai.extractor.patrikdinh.com/",
    thumbnail: {
      default: "/thumbnails/invoice-ai-extractor-dark.webp",
      dark: "/thumbnails/invoice-ai-extractor-dark.webp",
      light: "/thumbnails/invoice-ai-extractor-light.webp",
    },
    caseStudy: {
      title: "Invoice AI Extractor - Technical Overview",
      sections: [
        {
          heading: "Context & Challenge",
          content: rich(
            "Processing invoices manually is time-consuming, expensive, and ",
            strong("error-prone"),
            ". Different suppliers use wildly varying invoice formats and layouts. ",
            strong("Czech invoices"),
            " are especially complex due to specific VAT rates (0/12/21 %), DUZP, and ICO/DIC formats. I built Invoice AI Extractor to automatically parse PDF invoices into a ",
            strong("unified JSON schema"),
            " that our ERP system can consume directly, eliminating manual transcription and drastically reducing errors."
          ),
        },
        {
          heading: "Architecture & Tech Stack",
          content: rich(
            "The application is built on a high-performance stack for data integrity and speed. It uses ",
            strong("Google Gemini 2.0 Flash"),
            " for core analysis. The frontend and API are built with ",
            strong("Next.js"),
            " and strictly typed using ",
            strong("TypeScript"),
            ", which facilitates the ",
            strong("JSON schema validation"),
            " necessary for accounting data. Crucially, the extraction process is designed to be ",
            strong("fully client-side"),
            " (in a production environment) for maximum privacy and compliance."
          ),
        },
        {
          heading: rich("Technical challenges ", em("aka the nightmares")),
          content:
            "The difficult part was never just calling an AI model - it was making the output trustworthy enough for accounting workflows. Real invoices arrive in inconsistent formats, Czech tax details have edge cases, and even small extraction mistakes can create downstream problems. That is why the system includes a heavy validation and correction layer instead of pretending the model output is perfect by default.",
        },
        {
          heading: "Processing Pipeline",
          content:
            "The system employs a multi-step pipeline to ensure high accuracy:",
          bullets: [
            rich(
              strong("Document Type Detection"),
              ": Automatically classifies the document as an Invoice or Receipt, using a separate, optimized prompt and schema for each type."
            ),
            rich(
              strong("AI Extraction"),
              ": A custom prompt is fine-tuned to enforce specific ",
              strong("Czech accounting semantics"),
              " (DUZP, ICO/DIC, tax base) and request clean JSON output."
            ),
            rich(
              strong("Data Extraction"),
              ": Extracts ",
              strong("50+ critical accounting fields"),
              " including financial data (line items, ",
              strong("VAT breakdown"),
              "), and comprehensive metadata (supplier/customer details, dates)."
            ),
          ],
        },
        {
          heading: "Validation & Correction Layer",
          content: rich(
            "To achieve near-perfect accuracy, the system includes a post-processing logic that enforces ",
            strong("accounting integrity"),
            ":"
          ),
          bullets: [
            rich(
              strong("Strict Validation"),
              ": Uses TypeScript interfaces and runtime checks to validate data types and structures, fixing common AI syntax errors."
            ),
            rich(
              strong("Financial Recalculation"),
              ": Automatically ",
              strong("recalculates"),
              " missing totals or ",
              strong("corrects VAT base"),
              " to match the VAT summary, ensuring data consistency."
            ),
            rich(
              strong("Date & Format Normalization"),
              ": Standardizes date formats and applies ",
              strong("Czech rounding rules"),
              " to numerical values."
            ),
          ],
        },
        {
          heading: "Security & Privacy",
          content:
            "Given the sensitivity of corporate financial data, security was a core design principle:",
          bullets: [
            rich(
              strong("In-Memory Processing"),
              ": ",
              strong("No raw PDF data"),
              " is stored in any database or persistent storage; all processing is handled exclusively in memory."
            ),
            rich(
              strong("Data Isolation"),
              ": The PDF is sent only to the Gemini API for extraction, ensuring it does not reside on external infrastructure."
            ),
          ],
        },
        {
          heading: "ERP Integration & Results",
          content:
            "The extracted and validated JSON is designed to integrate seamlessly with our internal ERP system. The unified schema ensures automated processing without manual intervention.",
          bullets: [
            rich(
              strong("Accuracy"),
              ": Achieved ",
              strong("~99% accuracy"),
              " across diverse real-world Czech invoices."
            ),
            rich(
              strong("Speed"),
              ": Reduced invoice processing time from minutes to ",
              strong("12-18 seconds per PDF"),
              "."
            ),
            rich(
              strong("Auditing UI"),
              ": Provides a clean interface with synchronized ",
              strong("Form view"),
              " and ",
              strong("JSON view"),
              " for transparent auditing."
            ),
          ],
        },
        {
          heading: "My Role",
          content: rich(
            "I designed and implemented the ",
            strong("entire end-to-end solution"),
            ": the Next.js application, the ",
            strong("Gemini API integration"),
            ", the ",
            strong("PDF processing pipeline"),
            ", the core validation and correction logic, and the unified JSON schema design. AI is part of the extraction layer, but reliability comes from the surrounding engineering, validation and real-world testing. The system currently processes invoices daily and integrates directly with our ERP. ",
            strong(
              "I continuously monitor real-world failure cases (the remaining 1%) to further refine the prompt and improve the post-processing and validation logic."
            )
          ),
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
