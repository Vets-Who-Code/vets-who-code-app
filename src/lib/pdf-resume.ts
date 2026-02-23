import { PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from "pdf-lib";
import type { TranslatedProfile } from "./military-translator";

const MARGIN_LEFT = 60;
const MARGIN_RIGHT = 60;
const PAGE_WIDTH = 612; // Letter size
const PAGE_HEIGHT = 792;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

const NAVY = rgb(0.035, 0.122, 0.251); // #091f40
const RED = rgb(0.773, 0.125, 0.243); // #c5203e
const GRAY = rgb(0.3, 0.3, 0.3);
const LIGHT_GRAY = rgb(0.6, 0.6, 0.6);

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, fontSize);
        if (width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

function drawWrappedText(
    page: PDFPage,
    text: string,
    x: number,
    y: number,
    font: PDFFont,
    fontSize: number,
    maxWidth: number,
    color = GRAY,
    lineHeight = fontSize * 1.4
): number {
    const lines = wrapText(text, font, fontSize, maxWidth);
    let currentY = y;
    for (const line of lines) {
        page.drawText(line, { x, y: currentY, size: fontSize, font, color });
        currentY -= lineHeight;
    }
    return currentY;
}

export async function generateResumePDF(
    profile: TranslatedProfile,
    targetJobTitle?: string
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - 60;

    const ensureSpace = (needed: number) => {
        if (y - needed < 60) {
            page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
            y = PAGE_HEIGHT - 60;
        }
    };

    // Job Title (centered, large)
    const titleFontSize = 22;
    const titleWidth = helveticaBold.widthOfTextAtSize(profile.jobTitle.toUpperCase(), titleFontSize);
    page.drawText(profile.jobTitle.toUpperCase(), {
        x: (PAGE_WIDTH - titleWidth) / 2,
        y,
        size: titleFontSize,
        font: helveticaBold,
        color: NAVY,
    });
    y -= 10;

    // Target job title subtitle
    if (targetJobTitle) {
        y -= 16;
        const subtitleText = `Targeted For: ${targetJobTitle}`;
        const subtitleWidth = helvetica.widthOfTextAtSize(subtitleText, 11);
        page.drawText(subtitleText, {
            x: (PAGE_WIDTH - subtitleWidth) / 2,
            y,
            size: 11,
            font: helvetica,
            color: LIGHT_GRAY,
        });
    }

    y -= 30;

    // Divider line
    page.drawLine({
        start: { x: MARGIN_LEFT, y },
        end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
        thickness: 2,
        color: NAVY,
    });
    y -= 25;

    // Professional Summary section
    ensureSpace(80);
    page.drawText("PROFESSIONAL SUMMARY", {
        x: MARGIN_LEFT,
        y,
        size: 13,
        font: helveticaBold,
        color: NAVY,
    });
    y -= 5;
    page.drawLine({
        start: { x: MARGIN_LEFT, y },
        end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
        thickness: 0.5,
        color: NAVY,
    });
    y -= 16;

    y = drawWrappedText(page, profile.summary, MARGIN_LEFT, y, helvetica, 10.5, CONTENT_WIDTH, GRAY, 15);
    y -= 15;

    // Key Responsibilities section
    if (profile.keyResponsibilities.length > 0) {
        ensureSpace(60);
        page.drawText("PROFESSIONAL EXPERIENCE", {
            x: MARGIN_LEFT,
            y,
            size: 13,
            font: helveticaBold,
            color: NAVY,
        });
        y -= 5;
        page.drawLine({
            start: { x: MARGIN_LEFT, y },
            end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
            thickness: 0.5,
            color: NAVY,
        });
        y -= 16;

        for (const resp of profile.keyResponsibilities) {
            ensureSpace(30);
            const bulletX = MARGIN_LEFT + 5;
            const textX = MARGIN_LEFT + 18;
            const bulletMaxWidth = CONTENT_WIDTH - 18;

            // Bullet point
            page.drawText("\u2022", {
                x: bulletX,
                y,
                size: 10.5,
                font: helvetica,
                color: RED,
            });

            const clean = resp.replace(/\.\s*$/, "");
            y = drawWrappedText(page, clean, textX, y, helvetica, 10.5, bulletMaxWidth, GRAY, 14);
            y -= 4;
        }
        y -= 10;
    }

    // Achievements section
    if (profile.achievements.length > 0) {
        ensureSpace(60);
        page.drawText("KEY ACHIEVEMENTS", {
            x: MARGIN_LEFT,
            y,
            size: 13,
            font: helveticaBold,
            color: NAVY,
        });
        y -= 5;
        page.drawLine({
            start: { x: MARGIN_LEFT, y },
            end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
            thickness: 0.5,
            color: NAVY,
        });
        y -= 16;

        for (const achievement of profile.achievements) {
            ensureSpace(30);
            const bulletX = MARGIN_LEFT + 5;
            const textX = MARGIN_LEFT + 18;
            const bulletMaxWidth = CONTENT_WIDTH - 18;

            page.drawText("\u2022", {
                x: bulletX,
                y,
                size: 10.5,
                font: helvetica,
                color: RED,
            });

            const clean = achievement.replace(/\.\s*$/, "");
            y = drawWrappedText(page, clean, textX, y, helvetica, 10.5, bulletMaxWidth, GRAY, 14);
            y -= 4;
        }
    }

    // Footer
    const footerY = 30;
    const footerText = "Generated by Vets Who Code Resume Translator";
    const footerWidth = helvetica.widthOfTextAtSize(footerText, 8);
    // Draw on all pages
    const pages = pdfDoc.getPages();
    for (const p of pages) {
        p.drawText(footerText, {
            x: (PAGE_WIDTH - footerWidth) / 2,
            y: footerY,
            size: 8,
            font: helvetica,
            color: LIGHT_GRAY,
        });
    }

    return pdfDoc.save();
}
