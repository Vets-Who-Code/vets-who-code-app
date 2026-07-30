import prisma from "@/lib/prisma";

/**
 * Generate a unique certificate number
 * Format: VWC-YYYY-XXXXXX (e.g., VWC-2025-001234)
 */
export async function generateCertificateNumber(): Promise<string> {
    const year = new Date().getFullYear();

    // Count existing certificates this year to get the next sequence number
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    const count = await prisma.certificate.count({
        where: {
            issuedAt: {
                gte: startOfYear,
                lt: endOfYear,
            },
        },
    });

    // Increment count and pad with zeros (6 digits)
    const sequence = (count + 1).toString().padStart(6, "0");

    return `VWC-${year}-${sequence}`;
}

/** True when `error` is a Prisma unique-constraint violation (P2002) on `field`. */
export function isUniqueViolation(error: unknown, field: string): boolean {
    if (typeof error !== "object" || error === null) return false;
    const e = error as { code?: string; meta?: { target?: unknown }; message?: string };
    if (e.code !== "P2002") return false;
    const target = e.meta?.target;
    if (Array.isArray(target)) return target.includes(field);
    if (typeof target === "string") return target.includes(field);
    return typeof e.message === "string" && e.message.includes(field);
}

/**
 * Allocate a unique certificate number and persist the row, retrying on a
 * concurrent collision. `generateCertificateNumber` is count-based and therefore
 * racy — two simultaneous issuances can compute the same number and one hits the
 * `certificateNumber` unique constraint. Here we recompute and retry so the number
 * (and the PDF built with it) always matches the stored row.
 *
 * `create` receives the freshly generated number, does any work bound to it
 * (PDF, upload), and performs the DB insert — so a collision cleanly redoes that
 * attempt rather than leaving an orphaned row.
 */
export async function issueCertificateWithUniqueNumber<T>(
    create: (certificateNumber: string) => Promise<T>,
    maxAttempts = 5
): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const certificateNumber = await generateCertificateNumber();
        try {
            return await create(certificateNumber);
        } catch (error) {
            lastError = error;
            if (isUniqueViolation(error, "certificateNumber") && attempt < maxAttempts) {
                continue;
            }
            throw error;
        }
    }
    throw lastError ?? new Error("Failed to allocate a unique certificate number");
}

/**
 * Check if a user has completed a course
 * Completion criteria:
 * - User must be enrolled in the course
 * - Enrollment status must be COMPLETED
 */
export async function hasCompletedCourse(userId: string, courseId: string): Promise<boolean> {
    const enrollment = await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
    });

    return enrollment?.status === "COMPLETED";
}

/**
 * Check if user is eligible for a certificate
 * Returns an object with eligibility status and reason if not eligible
 */
export async function checkCertificateEligibility(
    userId: string,
    courseId: string
): Promise<{ eligible: boolean; reason?: string }> {
    // Check if course exists
    const course = await prisma.course.findUnique({
        where: { id: courseId },
    });

    if (!course) {
        return { eligible: false, reason: "Course not found" };
    }

    // Check if user is enrolled
    const enrollment = await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
    });

    if (!enrollment) {
        return { eligible: false, reason: "User not enrolled in this course" };
    }

    // Check if course is completed
    if (enrollment.status !== "COMPLETED") {
        return {
            eligible: false,
            reason: `Course not completed. Current status: ${enrollment.status}`,
        };
    }

    // Check if certificate already exists
    const existingCertificate = await prisma.certificate.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
    });

    if (existingCertificate) {
        return {
            eligible: false,
            reason: "Certificate already issued for this course",
        };
    }

    return { eligible: true };
}

/**
 * Get certificate by certificate number (from ID)
 * Certificate number is derived from the certificate ID
 */
export async function getCertificateByNumber(certificateNumber: string): Promise<any> {
    // For now, certificate number is the same as the ID
    // In production, you might want to use a more sophisticated mapping
    const certificate = await prisma.certificate.findUnique({
        where: { id: certificateNumber },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            course: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    difficulty: true,
                    estimatedHours: true,
                },
            },
        },
    });

    return certificate;
}

/**
 * Format certificate data for display
 */
export function formatCertificateData(certificate: any) {
    return {
        id: certificate.id,
        certificateNumber: certificate.id, // Using ID as certificate number
        studentName: certificate.user.name || certificate.user.email,
        courseName: certificate.course.title,
        courseDescription: certificate.course.description,
        difficulty: certificate.course.difficulty,
        estimatedHours: certificate.course.estimatedHours,
        issuedAt: certificate.issuedAt,
        certificateUrl: certificate.certificateUrl,
    };
}
