import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface CertificateData {
    studentName: string;
    courseName: string;
    completionDate: Date;
    certificateNumber: string;
    estimatedHours?: number;
}

/**
 * Generate a PDF certificate
 * Returns a Uint8Array that can be uploaded or downloaded
 */
export async function generateCertificatePDF(data: CertificateData): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page (8.5 x 11 inches in landscape)
    const page = pdfDoc.addPage([792, 612]);

    // Embed fonts
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Page dimensions
    const { width, height } = page.getSize();

    // VWC Brand Colors (approximated in RGB)
    const vwcRed = rgb(0.76, 0.11, 0.13); // #C21C21
    const vwcNavy = rgb(0.11, 0.15, 0.25); // #1C263F
    const vwcGold = rgb(0.85, 0.65, 0.13); // #D9A621

    // Draw border
    page.drawRectangle({
        x: 30,
        y: 30,
        width: width - 60,
        height: height - 60,
        borderColor: vwcNavy,
        borderWidth: 3,
    });

    page.drawRectangle({
        x: 35,
        y: 35,
        width: width - 70,
        height: height - 70,
        borderColor: vwcGold,
        borderWidth: 1,
    });

    // Title: "CERTIFICATE OF COMPLETION"
    page.drawText("CERTIFICATE OF COMPLETION", {
        x: width / 2 - 220,
        y: height - 100,
        size: 36,
        font: timesRomanBold,
        color: vwcNavy,
    });

    // Logo text placeholder (you can replace with actual logo image)
    page.drawText("VETS WHO CODE", {
        x: width / 2 - 100,
        y: height - 140,
        size: 20,
        font: helveticaBold,
        color: vwcRed,
    });

    // "This is to certify that"
    page.drawText("This is to certify that", {
        x: width / 2 - 90,
        y: height - 200,
        size: 16,
        font: timesRoman,
        color: vwcNavy,
    });

    // Student Name (centered, large)
    const nameWidth = timesRomanBold.widthOfTextAtSize(data.studentName, 32);
    page.drawText(data.studentName, {
        x: width / 2 - nameWidth / 2,
        y: height - 245,
        size: 32,
        font: timesRomanBold,
        color: vwcNavy,
    });

    // Underline under name
    page.drawLine({
        start: { x: width / 2 - 250, y: height - 250 },
        end: { x: width / 2 + 250, y: height - 250 },
        thickness: 1,
        color: vwcGold,
    });

    // "has successfully completed"
    page.drawText("has successfully completed", {
        x: width / 2 - 105,
        y: height - 290,
        size: 16,
        font: timesRoman,
        color: vwcNavy,
    });

    // Course Name
    const courseNameWidth = helveticaBold.widthOfTextAtSize(data.courseName, 24);
    page.drawText(data.courseName, {
        x: width / 2 - courseNameWidth / 2,
        y: height - 330,
        size: 24,
        font: helveticaBold,
        color: vwcRed,
    });

    // Estimated hours (if provided)
    if (data.estimatedHours) {
        const hoursText = `${data.estimatedHours} hours of intensive training`;
        page.drawText(hoursText, {
            x: width / 2 - 100,
            y: height - 365,
            size: 12,
            font: helvetica,
            color: vwcNavy,
        });
    }

    // Completion Date
    const dateText = `Completed on ${data.completionDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })}`;
    page.drawText(dateText, {
        x: width / 2 - 80,
        y: height - 410,
        size: 14,
        font: timesRoman,
        color: vwcNavy,
    });

    // Signature line (left)
    page.drawLine({
        start: { x: 100, y: 120 },
        end: { x: 300, y: 120 },
        thickness: 1,
        color: vwcNavy,
    });

    page.drawText("Jerome Hardaway", {
        x: 150,
        y: 100,
        size: 12,
        font: helveticaBold,
        color: vwcNavy,
    });

    page.drawText("Executive Director, Vets Who Code", {
        x: 110,
        y: 85,
        size: 10,
        font: helvetica,
        color: vwcNavy,
    });

    // Signature line (right)
    page.drawLine({
        start: { x: width - 300, y: 120 },
        end: { x: width - 100, y: 120 },
        thickness: 1,
        color: vwcNavy,
    });

    page.drawText("Date", {
        x: width - 225,
        y: 100,
        size: 12,
        font: helveticaBold,
        color: vwcNavy,
    });

    page.drawText(
        data.completionDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }),
        {
            x: width - 220,
            y: 85,
            size: 10,
            font: helvetica,
            color: vwcNavy,
        }
    );

    // Certificate Number (bottom)
    page.drawText(`Certificate No: ${data.certificateNumber}`, {
        x: width / 2 - 80,
        y: 50,
        size: 10,
        font: helvetica,
        color: vwcNavy,
    });

    // Verification URL
    page.drawText(`Verify at: vetswhocode.io/verify/${data.certificateNumber}`, {
        x: width / 2 - 140,
        y: 35,
        size: 9,
        font: helvetica,
        color: rgb(0.4, 0.4, 0.4),
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}

/**
 * Generate certificate filename
 */
export function generateCertificateFilename(
    studentName: string,
    courseName: string,
    certificateNumber: string
): string {
    const sanitize = (str: string) =>
        str
            .replace(/[^a-z0-9]/gi, "-")
            .replace(/-+/g, "-")
            .toLowerCase();

    const namePart = sanitize(studentName);
    const coursePart = sanitize(courseName);

    return `vwc-certificate-${namePart}-${coursePart}-${certificateNumber}.pdf`;
}
