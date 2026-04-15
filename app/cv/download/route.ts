import { CV_PDF_FILE_NAME, createCvPdf } from "../../lib/cv-pdf";

export const dynamic = "force-static";

export async function GET() {
  const pdf = createCvPdf();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${CV_PDF_FILE_NAME}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
