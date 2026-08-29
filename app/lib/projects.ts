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
  previewKeyPointCount?: number;
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
    subtitle:
      "A POS-first system that runs real day-to-day cafe operations.",
    description:
      "An in-house cafe operations system built around real bubble tea workflows, not generic restaurant assumptions. POS is the center: checkout, orders, payments, receipts, labels and refunds, with the wider operation connected through products, employee cards, shifts, calendar sync, invoice AI, stock, recipes and reporting.",
    keyPoints: [
      rich(
        "Built around the ",
        strong("POS core"),
        ": fast checkout, configured drinks, payments, receipts, labels and refunds."
      ),
      rich(
        "Connects the wider operation through ",
        strong("products, stock, recipes, employee cards, shifts, calendar sync, invoice AI and reporting"),
        "."
      ),
      rich(
        "Supports ",
        strong(
          "parked orders, split payments, cash rounding, refunds, vouchers and dual-currency receipts"
        ),
        " in daily use."
      ),
      rich(
        "Connected to a custom ",
        strong("Print Agent"),
        " for instant receipts, drink labels and cash drawer actions without extra staff steps."
      ),
      rich(
        "Includes ",
        strong(
          "RBAC, investor reporting, customer sync, Google Calendar shift sync and security alerts"
        ),
        " for real operations."
      ),
      "Reduced operational friction, replaced rigid subscription tooling and gave the business a system it can keep evolving in-house.",
    ],
    previewKeyPointCount: 4,
    challenge:
      "Keeping checkout, products, staff, shifts, invoices, printing, permissions and reporting coherent in daily operation.",
    tech: ["React", "TypeScript", "PostgreSQL"],
    thumbnail: {
      default: "/thumbnails/lootea-pos-map-dark.svg",
      dark: "/thumbnails/lootea-pos-map-dark.svg",
      light: "/thumbnails/lootea-pos-map-light.svg",
    },
    caseStudy: {
      title: "Lootea Operations System: Technical Case Study",
      sections: [
        {
          heading: "Context",
          content:
            "Commercial POS systems solved only part of the problem. What we actually needed was a cafe operations system with POS at the center: ordering, label printing, refunds, parked orders, product setup, employee cards, shifts, stock, recipes, invoices, reporting and management workflows. I built Lootea as an in-house production system that now runs day-to-day operations on pos.lootea.cz.",
        },
        {
          heading: rich("Technical challenges ", em("aka the nightmares")),
          content:
            "The hard part was not building screens. It was keeping checkout, printing, refunds, product data, employee access, shifts, stock, recipes, invoices, reporting, permissions and daily workflows coherent under real shop conditions. Receipts and labels had to print instantly, totals had to survive edits and refunds, and management data had to stay trustworthy enough for closures, reporting and back-office work.",
        },
        {
          heading: "Architecture overview",
          content: rich(
            "The core stack is ",
            strong("React + TypeScript + Vite PWA"),
            " on the frontend with ",
            strong("Supabase"),
            " as the main backend for Postgres, auth, storage, realtime and edge functions. POS is the operational core, with management modules for products, employees, shifts, stock, recipes, office work and reporting around it. Around that, I built serverless API routes, scheduled jobs and integrations for customer sync, Google Calendar shifts, invoice AI processing and security alerts. A custom ",
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
            "Customer data from an ",
            strong("external mobile app source"),
            " is synchronized into the PostgreSQL database alongside customers created directly in the POS. I built a migration pipeline with ",
            strong("Supabase migrations, a migration script and a daily cron job"),
            " that keeps mobile app customers aligned with the primary database. Each customer receives a unique incremental number via a PostgreSQL sequence. The customer module supports favorites, discounts, validation, duplicate detection, real-time updates and manual sync operations."
          ),
        },
        {
          heading: "Operations modules around POS",
          content:
            "Beyond checkout, the system includes the management modules needed to run the shop from one place: product catalog, drinks, toppings, modifiers, employee cards, role-based permissions, shifts, customer data, daily closures, office workflows and reporting. It includes a dedicated stock engine, recipes engine, nutrition and allergen display in POS, Google Calendar sync for shifts, investor-specific reporting access and internal tools for invoice AI, cash and bank transactions.",
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
            "Lootea replaced a more limited subscription-style setup with a system tailored to the way the business actually operates. POS is the operational center, but product management, staff workflows, shifts, invoices, reporting and back-office work live around it in one place. That reduced friction for staff and made it possible to improve the system continuously based on real daily use instead of vendor constraints.",
        },
        {
          heading: "My role",
          content:
            "I designed and built the system end-to-end: product structure, database schema, migrations, POS checkout flows, management modules, employee cards, permissions, products, stock and recipes, reporting, shift tools, customer sync, invoice workflows, integrations and production hardening. I owned the architecture, implementation decisions, testing and day-to-day reliability. The system is actively used in daily operation.",
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
            ". The real work was making the system stable, testable and trustworthy in daily operation."
          ),
        },
      ],
    },
  },
  {
    id: "lobbymates",
    title: "Lobby Mates",
    subtitle:
      "A squad planning app that helps friend groups decide what they can play together.",
    description:
      "A real full-stack product for gaming groups. Lobby Mates brings Steam login, squad invites, shared libraries, play intent, Steam wishlist overlap, profile presence, suggested games, top picks, comparison filters and Discord room setup into one focused dashboard, with a public read-only demo for portfolio review.",
    keyPoints: [
      rich(
        "Built around the practical question: ",
        strong("what can this group play together right now?"),
        "."
      ),
      rich(
        "Uses ",
        strong("Steam OpenID and Steam Web API"),
        " for account identity, profile data, current activity, game ownership, playtime, public library sync and squad wishlist discovery."
      ),
      rich(
        "Supports ",
        strong("multi-squad membership, invite codes, active squad switching and leader/member permissions"),
        " in one production database."
      ),
      rich(
        "Ranks games with ",
        strong("audit-friendly score breakdowns, readiness, ownership, play intent, wishlist overlap, sort modes and member comparison"),
        " instead of a generic list."
      ),
      rich(
        "Includes ",
        strong("cards/list views, setup guidance, paginated browsing and status/platform/genre/search filters"),
        " for a dashboard that stays usable as the squad library grows."
      ),
      rich(
        "Adds an optional ",
        strong("Discord integration"),
        " for private squad text and voice rooms managed from the app."
      ),
      "Includes a public read-only demo route powered by a viewer role, normal session cookies and server-side write guards.",
    ],
    challenge:
      "Making group game choice clear while keeping Steam sync, invites, permissions and Discord state reliable.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    liveUrl: "https://www.lobbymates.app/demo",
    thumbnail: {
      default: "/thumbnails/lobbymates-dashboard-overview.webp",
      dark: "/thumbnails/lobbymates-dashboard-overview.webp",
    },
    caseStudy: {
      title: "Lobby Mates: Technical Case Study",
      sections: [
        {
          heading: "Context",
          content:
            "Lobby Mates started from a very ordinary group problem: deciding what to play takes longer than it should. People own different games, want different things, play on different platforms and often end up scrolling through chat instead of launching anything. I built Lobby Mates as a focused squad app that turns that messy conversation into a shared dashboard.",
        },
        {
          heading: "Product loop",
          content:
            "The core loop is simple: sign in with Steam, create or join a squad, sync public Steam libraries, compare what members own, mark what each person wants to play, check shared wishlist overlap, and use top picks and filters to decide what is ready now. The app is not broad social networking; it is a decision tool for existing friend groups.",
        },
        {
          heading: "Architecture overview",
          content: rich(
            "The app is built with ",
            strong("Next.js App Router"),
            ", ",
            strong("TypeScript"),
            " and ",
            strong("Tailwind CSS"),
            ". Supabase Postgres is used through server-side REST access for users, sessions, squads, invites, games, statuses, suggestions and Discord integration records. The application is deployed on ",
            strong("Vercel"),
            " and includes Playwright smoke tests for the public and protected route surface. Vercel Web Analytics and Speed Insights are wired into the public release."
          ),
        },
        {
          heading: "Auth and sessions",
          content:
            "Production auth is Steam OpenID only. Lobby Mates never asks for a Steam username, password or Steam Guard code. After Steam verification, the app creates its own Supabase-backed session and stores the session token in an HTTP-only cookie. A separate active-squad cookie keeps squad switching stable across reloads.",
        },
        {
          heading: "Squads and invites",
          content:
            "Users can create or join multiple squads, with one active squad in the current browser session. Invite codes and invite links are stored hashed in the database, expire automatically and can be revoked. The app has leader/member permissions for actions such as member removal, leadership transfer, squad deletion and Discord lobby creation.",
        },
        {
          heading: "Public demo mode",
          content:
            "For portfolio review, I added a public /demo route that opens the real app without requiring a visitor to use Steam. The route creates a normal Lobby Mates session for a configured demo user, sets the active squad cookie and loads the dashboard as a viewer. The viewer role can browse the real squad dashboard, including cards/list view, filters, compare scope, scores and wishlist results, but cannot change games, ownership, play intent, invites, Steam sync, Discord setup or squad settings.",
        },
        {
          heading: "Steam sync",
          content:
            "Steam sync pulls public profile data, avatar/frame artwork, current activity when available, owned games and playtime. The sync process matches games by Steam app ID and normalized title, creates missing squad games, enriches games with Steam Store metadata and preserves user-authored interest signals. Private, stale or unavailable Steam libraries are handled as expected states, not as broken accounts.",
        },
        {
          heading: "Wishlist and metadata",
          content:
            "A squad wishlist action syncs public Steam wishlists for real squad members, persists the rows per user and enriches them with EUR Store prices, discounts and release information. The dashboard can flag games wanted by everyone while keeping the synthetic demo viewer out of member-facing wishlist data. Game metadata and artwork can also be discovered from Steam Store URLs, so manually added games still gain useful platform, genre and release context.",
        },
        {
          heading: "Decision model",
          content:
            "The dashboard turns raw game data into decision signals: owned count, ready-to-play count, six-level play intent, score, suggestions, wishlist overlap, platform filters, genre filters, search, sort modes, paginated browsing and member subset comparison. Top 5 is algorithmic, while Suggested games are a separate human nomination layer. Score is inspectable through per-game breakdowns covering ready players, ownership, intent, recent Steam activity and pushback.",
        },
        {
          heading: "Discord integration",
          content:
            "Discord is treated as an optional integration layer, not the source of truth. Squad leaders can create or check a private Discord space for the squad: one role, one text channel and two voice rooms inside the official Lobby Mates server. Users connect Discord through OAuth, then the app joins them to the server and syncs squad roles when possible.",
        },
        {
          heading: rich("Technical challenges ", em("aka the nightmares")),
          content:
            "The hard part was keeping several external systems coherent without making the product feel heavy: Steam auth, library and wishlist availability, Supabase session state, squad membership, invite safety, stable sorting, optimistic UI updates, Discord role/channel state and enough permission boundaries that the app can expose a safe portfolio demo mode.",
        },
        {
          heading: "Reliability and safety",
          content:
            "The app uses server-side session validation, server-only service role access, hashed invite codes, per-squad game limits, invite rate limits, optional Cloudflare Turnstile for squad creation and protected API routes. Manual ownership sources such as Other launcher are preserved across Steam sync, and hidden games, setup completion and restore controls keep the dashboard manageable. The viewer role is enforced server-side, so direct write requests from the demo session return a protected read-only response instead of relying on hidden buttons alone.",
        },
        {
          heading: "Impact",
          content:
            "Lobby Mates turns an unstructured chat decision into a visible shared state. The useful part is not just storing a game list; it is making the group answer faster: who owns it, who wants it, whether it is playable now and where the squad can meet once they pick it.",
        },
        {
          heading: "My role",
          content:
            "I designed and built the product end-to-end: product model, branding, Next.js app structure, Steam auth, custom session flow, Supabase schema, invite system, dashboard UX, Steam library and wishlist pipelines, metadata enrichment, Discord OAuth/lobby integration, public read-only demo mode, production deployment and smoke testing.",
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
            rich(strong("voucher_id"), " (globally unique code issued by sequence engine)"),
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
            "I was responsible for the entire full-stack pipeline: architectural design, Next.js/TypeScript implementation, canvas-based live preview engine, secure PDFKit rendering logic, DEMO/PROD mode management, the prefix/sequence engine, Supabase integration, and final Vercel deployment setup. The production rules, layout precision and safety guarantees were mine to define and test.",
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
              ": Automatically classifies the document as an Invoice or Receipt, using a separate extraction contract and schema for each type."
            ),
            rich(
              strong("AI Extraction"),
              ": A structured extraction contract is tuned to enforce specific ",
              strong("Czech accounting semantics"),
              " (DUZP, ICO/DIC, tax base) and produce clean JSON output."
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
              ": Uses TypeScript interfaces and runtime checks to validate data types and structures, fixing common extraction output issues."
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
              "I continuously monitor real-world failure cases (the remaining 1%) to further refine the extraction contract and improve the post-processing and validation logic."
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
    "PostgreSQL",
    "Vercel",
  ],
};
