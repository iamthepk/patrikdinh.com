import { chromium } from "playwright";
import { CV_PDF_FILE_NAME } from "../../lib/cv-pdf";

export const dynamic = "force-dynamic";

const getBaseUrl = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://127.0.0.1:3001";
};

export async function GET() {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(`${getBaseUrl()}/cv/print`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await page.emulateMedia({ media: "print" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 0.94,
      margin: {
        top: "6mm",
        right: "6mm",
        bottom: "6mm",
        left: "6mm",
      },
      preferCSSPageSize: true,
    });

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${CV_PDF_FILE_NAME}"`,
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } finally {
    await browser.close();
  }
}
