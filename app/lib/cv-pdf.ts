import { cvData } from "./cv-data";

export const CV_PDF_FILE_NAME = "CV - Patrik Dinh.pdf";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_MARGIN_X = 26;
const PAGE_MARGIN_Y = 24;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN_X * 2;
const HEADER_HEIGHT = 82;

type FontKey = "F1" | "F2";

type PdfPage = {
  commands: string[];
  pageNumber: number;
};

const escapePdfText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const toPdfNumber = (value: number) => value.toFixed(2);

const fillColor = (r: number, g: number, b: number) =>
  `${toPdfNumber(r)} ${toPdfNumber(g)} ${toPdfNumber(b)} rg`;

const strokeColor = (r: number, g: number, b: number) =>
  `${toPdfNumber(r)} ${toPdfNumber(g)} ${toPdfNumber(b)} RG`;

const estimateCharWidth = (char: string) => {
  if (char === " ") return 0.28;
  if (/[A-Z]/.test(char)) return 0.67;
  if (/[a-z]/.test(char)) return 0.53;
  if (/[0-9]/.test(char)) return 0.56;
  if (/[|/]/.test(char)) return 0.34;
  if (/[.,:;'"!`-]/.test(char)) return 0.3;
  if (/[()]/.test(char)) return 0.35;
  return 0.58;
};

const estimateTextWidth = (text: string, fontSize: number) =>
  text.split("").reduce((total, char) => total + estimateCharWidth(char), 0) *
  fontSize;

const wrapText = (text: string, maxWidth: number, fontSize: number) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = "";

  const pushCurrentLine = () => {
    if (currentLine) {
      lines.push(currentLine);
      currentLine = "";
    }
  };

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (estimateTextWidth(candidate, fontSize) <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    if (!currentLine) {
      let partial = "";

      for (const char of word) {
        const nextPartial = `${partial}${char}`;

        if (estimateTextWidth(nextPartial, fontSize) > maxWidth && partial) {
          lines.push(partial);
          partial = char;
        } else {
          partial = nextPartial;
        }
      }

      currentLine = partial;
      continue;
    }

    pushCurrentLine();
    currentLine = word;
  }

  pushCurrentLine();

  return lines.length > 0 ? lines : [text];
};

const createPage = (pageNumber: number): PdfPage => ({
  commands: [],
  pageNumber,
});

const drawRect = (
  page: PdfPage,
  x: number,
  yTop: number,
  width: number,
  height: number,
  color: [number, number, number]
) => {
  page.commands.push(
    [
      "q",
      fillColor(...color),
      `${toPdfNumber(x)} ${toPdfNumber(PAGE_HEIGHT - yTop - height)} ${toPdfNumber(width)} ${toPdfNumber(height)} re f`,
      "Q",
    ].join("\n")
  );
};

const drawLine = (
  page: PdfPage,
  x1: number,
  yTop: number,
  x2: number,
  color: [number, number, number],
  lineWidth = 1.2
) => {
  const y = PAGE_HEIGHT - yTop;

  page.commands.push(
    [
      "q",
      strokeColor(...color),
      `${toPdfNumber(lineWidth)} w`,
      `${toPdfNumber(x1)} ${toPdfNumber(y)} m`,
      `${toPdfNumber(x2)} ${toPdfNumber(y)} l S`,
      "Q",
    ].join("\n")
  );
};

const drawText = (
  page: PdfPage,
  text: string,
  x: number,
  yTop: number,
  fontSize: number,
  font: FontKey,
  color: [number, number, number]
) => {
  page.commands.push(
    [
      "BT",
      fillColor(...color),
      `/${font} ${toPdfNumber(fontSize)} Tf`,
      `1 0 0 1 ${toPdfNumber(x)} ${toPdfNumber(PAGE_HEIGHT - yTop - fontSize)} Tm`,
      `(${escapePdfText(text)}) Tj`,
      "ET",
    ].join("\n")
  );
};

const drawWrappedText = (
  page: PdfPage,
  text: string,
  x: number,
  yTop: number,
  width: number,
  fontSize: number,
  lineHeight: number,
  font: FontKey,
  color: [number, number, number]
) => {
  const lines = wrapText(text, width, fontSize);

  lines.forEach((line, index) => {
    drawText(page, line, x, yTop + index * lineHeight, fontSize, font, color);
  });

  return lines.length * lineHeight;
};

const formatDisplayUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function createCvPdf() {
  const pages: PdfPage[] = [createPage(1), createPage(2)];
  const pageOne = pages[0];
  const pageTwo = pages[1];

  const sidebarX = PAGE_MARGIN_X;
  const sidebarWidth = 170;
  const mainX = PAGE_MARGIN_X + sidebarWidth + 18;
  const mainWidth = PAGE_WIDTH - PAGE_MARGIN_X - mainX;

  drawRect(pageOne, PAGE_MARGIN_X, PAGE_MARGIN_Y, CONTENT_WIDTH, HEADER_HEIGHT, [0.18, 0.22, 0.28]);

  const nameFontSize = 28;
  const titleFontSize = 12;
  const nameWidth = estimateTextWidth(cvData.basics.name.toUpperCase(), nameFontSize);
  const titleWidth = estimateTextWidth(cvData.basics.title, titleFontSize);

  drawText(
    pageOne,
    cvData.basics.name.toUpperCase(),
    PAGE_MARGIN_X + (CONTENT_WIDTH - nameWidth) / 2,
    PAGE_MARGIN_Y + 22,
    nameFontSize,
    "F2",
    [1, 1, 1]
  );
  drawText(
    pageOne,
    cvData.basics.title,
    PAGE_MARGIN_X + (CONTENT_WIDTH - titleWidth) / 2,
    PAGE_MARGIN_Y + 58,
    titleFontSize,
    "F1",
    [0.9, 0.93, 0.97]
  );

  const bodyTop = PAGE_MARGIN_Y + HEADER_HEIGHT + 14;
  drawRect(pageOne, sidebarX, bodyTop, sidebarWidth, PAGE_HEIGHT - PAGE_MARGIN_Y - bodyTop, [0.93, 0.95, 0.97]);
  drawLine(pageOne, sidebarX + sidebarWidth + 12, bodyTop, sidebarX + sidebarWidth + 12, [0.82, 0.85, 0.9], 1);

  let sidebarY = bodyTop + 18;
  let mainY = bodyTop + 18;

  const writeSidebarHeading = (title: string) => {
    drawText(pageOne, title.toUpperCase(), sidebarX + 10, sidebarY, 10.2, "F2", [0.12, 0.16, 0.22]);
    sidebarY += 12;
    drawLine(pageOne, sidebarX + 10, sidebarY, sidebarX + sidebarWidth - 10, [0.18, 0.22, 0.28], 1.2);
    sidebarY += 10;
  };

  const writeSidebarList = (items: string[], compact = false) => {
    const width = sidebarWidth - 20;
    if (compact) {
      let line = "";
      for (const item of items) {
        const candidate = line ? `${line} · ${item}` : item;
        if (estimateTextWidth(candidate, 8.3) <= width) {
          line = candidate;
        } else {
          drawText(pageOne, line, sidebarX + 10, sidebarY, 8.1, "F1", [0.1, 0.13, 0.18]);
          sidebarY += 11;
          line = item;
        }
      }
      if (line) {
        drawText(pageOne, line, sidebarX + 10, sidebarY, 8.1, "F1", [0.1, 0.13, 0.18]);
        sidebarY += 12;
      }
      return;
    }

    for (const item of items) {
      sidebarY += drawWrappedText(pageOne, item, sidebarX + 10, sidebarY, width, 8.9, 12.6, "F1", [0.1, 0.13, 0.18]);
      sidebarY += 2;
    }
  };

  const contactItems = [
    cvData.basics.email,
    cvData.basics.phone,
    cvData.basics.location,
    formatDisplayUrl(cvData.basics.website),
    formatDisplayUrl(cvData.basics.github),
    cvData.basics.linkedin ? formatDisplayUrl(cvData.basics.linkedin) : "",
  ].filter(Boolean);

  writeSidebarHeading("Contact");
  writeSidebarList(contactItems);
  sidebarY += 8;

  writeSidebarHeading("Core Focus");
  writeSidebarList(cvData.strengths);
  sidebarY += 8;

  writeSidebarHeading("Tech Stack");
  writeSidebarList(cvData.technologies, true);
  sidebarY += 8;

  writeSidebarHeading("Languages");
  writeSidebarList(cvData.languages);
  sidebarY += 8;

  writeSidebarHeading("Education");
  for (const item of cvData.education) {
    if (item.school) {
      drawText(pageOne, item.school, sidebarX + 10, sidebarY, 9.0, "F2", [0.1, 0.13, 0.18]);
      sidebarY += 12;
    }
    drawText(pageOne, `• ${item.program}`, sidebarX + 10, sidebarY, 8.9, "F2", [0.1, 0.13, 0.18]);
    sidebarY += 12;
    if (item.details) {
      for (const detail of item.details) {
        drawText(pageOne, `• ${detail}`, sidebarX + 18, sidebarY, 8.6, "F1", [0.1, 0.13, 0.18]);
        sidebarY += 11;
      }
    }
    sidebarY += 5;
  }

  const writeMainHeading = (title: string) => {
    drawText(pageOne, title.toUpperCase(), mainX, mainY, 10.2, "F2", [0.12, 0.16, 0.22]);
    mainY += 12;
    drawLine(pageOne, mainX, mainY, PAGE_WIDTH - PAGE_MARGIN_X, [0.18, 0.22, 0.28], 1.2);
    mainY += 14;
  };

  writeMainHeading("Profile");
  mainY += drawWrappedText(pageOne, cvData.profile, mainX, mainY, mainWidth, 11, 15.6, "F1", [0.1, 0.13, 0.18]);
  mainY += 16;

  writeMainHeading("Experience");
  for (const item of cvData.experience) {
    drawText(pageOne, item.company, mainX, mainY, 10.8, "F2", [0.1, 0.13, 0.18]);
    drawText(pageOne, item.period, PAGE_WIDTH - PAGE_MARGIN_X - estimateTextWidth(item.period, 8.9), mainY + 1, 8.9, "F1", [0.36, 0.41, 0.47]);
    mainY += 13;
    drawText(pageOne, item.role, mainX, mainY, 9.8, "F1", [0.1, 0.13, 0.18]);
    mainY += 14;
    for (const bullet of item.bullets) {
      drawText(pageOne, "•", mainX, mainY, 9.2, "F1", [0.1, 0.13, 0.18]);
      mainY += drawWrappedText(pageOne, bullet, mainX + 9, mainY, mainWidth - 9, 9.2, 12.8, "F1", [0.1, 0.13, 0.18]);
      mainY += 2;
    }
    mainY += 6;
  }

  let pageTwoY = PAGE_MARGIN_Y + 2;
  drawText(pageTwo, "PAGE 2", PAGE_MARGIN_X, pageTwoY, 8.8, "F2", [0.36, 0.41, 0.47]);
  pageTwoY += 16;
  drawText(pageTwo, "SELECTED PROJECT WORK", PAGE_MARGIN_X, pageTwoY, 17, "F2", [0.1, 0.13, 0.18]);
  pageTwoY += 17;
  drawWrappedText(pageTwo, "Technical project highlights that complement the main CV.", PAGE_MARGIN_X, pageTwoY, CONTENT_WIDTH, 10.2, 14, "F1", [0.36, 0.41, 0.47]);
  pageTwoY += 23;

  const cardGap = 12;
  const cardWidth = (CONTENT_WIDTH - cardGap) / 2;
  let col = 0;
  let rowY = pageTwoY;
  let rowHeight = 0;

  for (const project of cvData.projects) {
    const cardX = PAGE_MARGIN_X + col * (cardWidth + cardGap);
    let cardY = rowY + 14;

    const titleLines = wrapText(project.title, cardWidth - 24, 11.5);
    const subtitleLines = project.subtitle ? wrapText(project.subtitle, cardWidth - 24, 9.6) : [];
    const stackText = project.stack?.join(" · ") ?? "";
    const stackLines = stackText ? wrapText(stackText, cardWidth - 24, 8.6) : [];
    const summaryLines = wrapText(project.summary, cardWidth - 24, 9.3);

    const cardHeight =
      16 +
      titleLines.length * 15 +
      (subtitleLines.length ? subtitleLines.length * 13 + 6 : 0) +
      (stackLines.length ? stackLines.length * 12 + 6 : 0) +
      summaryLines.length * 13.5 +
      16;

    drawRect(pageTwo, cardX, rowY, cardWidth, cardHeight, [0.98, 0.98, 0.99]);
    drawLine(pageTwo, cardX, rowY + cardHeight, cardX + cardWidth, [0.88, 0.9, 0.93], 0.8);
    drawLine(pageTwo, cardX, rowY, cardX + cardWidth, [0.88, 0.9, 0.93], 0.8);

    titleLines.forEach((line, index) => {
      drawText(pageTwo, line, cardX + 12, cardY + index * 15, 11.5, "F2", [0.1, 0.13, 0.18]);
    });
    cardY += titleLines.length * 15 + 4;

    subtitleLines.forEach((line, index) => {
      drawText(pageTwo, line, cardX + 12, cardY + index * 13, 9.6, "F1", [0.1, 0.13, 0.18]);
    });
    cardY += subtitleLines.length * 13;
    if (subtitleLines.length) cardY += 5;

    stackLines.forEach((line, index) => {
      drawText(pageTwo, line, cardX + 12, cardY + index * 12, 8.6, "F1", [0.36, 0.41, 0.47]);
    });
    cardY += stackLines.length * 12;
    if (stackLines.length) cardY += 6;

    summaryLines.forEach((line, index) => {
      drawText(pageTwo, line, cardX + 12, cardY + index * 13.5, 9.3, "F1", [0.1, 0.13, 0.18]);
    });

    rowHeight = Math.max(rowHeight, cardHeight);

    if (col === 1) {
      rowY += rowHeight + 12;
      rowHeight = 0;
      col = 0;
    } else {
      col = 1;
    }
  }

  for (const page of pages) {
    drawText(page, `${page.pageNumber}`, PAGE_WIDTH - PAGE_MARGIN_X, PAGE_HEIGHT - 18, 8.5, "F1", [0.5, 0.55, 0.62]);
  }

  const objects: string[] = [];
  const addObject = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pagesId = addObject("<< >>");

  const pageIds = pages.map((page) => {
    const content = page.commands.join("\n");
    const contentId = addObject(`<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`);

    return addObject(
      [
        "<< /Type /Page",
        `/Parent ${pagesId} 0 R`,
        `/MediaBox [0 0 ${toPdfNumber(PAGE_WIDTH)} ${toPdfNumber(PAGE_HEIGHT)}]`,
        `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >>`,
        `/Contents ${contentId} 0 R`,
        ">>",
      ].join("\n")
    );
  });

  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  objects[pagesId - 1] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((pageId) => `${pageId} 0 R`).join(" ")}] >>`;

  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets[index + 1] = Buffer.byteLength(pdf, "utf8");
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "utf8");

  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return new Uint8Array(Buffer.from(pdf, "utf8"));
}
