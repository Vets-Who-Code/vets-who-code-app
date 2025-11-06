import prisma from "@/lib/prisma";

/**
 * Generate a unique certificate number
 * Format: VWC-YYYY-NNNNNN
 */
export function generateCertificateNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
    return `VWC-${year}-${random}`;
}

/**
 * Check if a user is eligible for a certificate
 * Requirements:
 * - Enrollment must be COMPLETED
 * - Progress must be 100%
 */
export async function isEligibleForCertificate(enrollmentId: string): Promise<boolean> {
    const enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
        include: {
            course: {
                include: {
                    modules: {
                        include: {
                            lessons: true,
                        },
                    },
                },
            },
        },
    });

    if (!enrollment) {
        return false;
    }

    // Check if enrollment is completed and progress is 100%
    return enrollment.status === "COMPLETED" && enrollment.progress === 100;
}

/**
 * Generate shareable URL for certificate verification
 */
export function generateShareableUrl(certificateId: string): string {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return `${baseUrl}/certificates/verify/${certificateId}`;
}

/**
 * Create a certificate for a completed enrollment
 */
export async function createCertificate(enrollmentId: string) {
    // Check eligibility
    const eligible = await isEligibleForCertificate(enrollmentId);
    if (!eligible) {
        throw new Error("User is not eligible for a certificate");
    }

    // Check if certificate already exists
    const existingCertificate = await prisma.certificate.findUnique({
        where: { enrollmentId },
    });

    if (existingCertificate) {
        return existingCertificate;
    }

    // Get enrollment details
    const enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
        include: {
            user: true,
            course: true,
        },
    });

    if (!enrollment || !enrollment.completedAt) {
        throw new Error("Enrollment not found or not completed");
    }

    // Generate certificate
    const certificateNumber = generateCertificateNumber();

    const certificate = await prisma.certificate.create({
        data: {
            userId: enrollment.userId,
            courseId: enrollment.courseId,
            enrollmentId: enrollment.id,
            certificateNumber,
            completedAt: enrollment.completedAt,
            verified: true,
        },
    });

    // Generate shareable URL
    const shareableUrl = generateShareableUrl(certificate.id);

    // Update certificate with shareable URL
    const updatedCertificate = await prisma.certificate.update({
        where: { id: certificate.id },
        data: { shareableUrl },
    });

    return updatedCertificate;
}

/**
 * Get certificate by ID with full details
 */
export async function getCertificateById(certificateId: string) {
    return prisma.certificate.findUnique({
        where: { id: certificateId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    branch: true,
                    rank: true,
                },
            },
            course: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    category: true,
                    difficulty: true,
                    duration: true,
                },
            },
            enrollment: {
                select: {
                    enrolledAt: true,
                    completedAt: true,
                    progress: true,
                },
            },
        },
    });
}

/**
 * Get all certificates for a user
 */
export async function getUserCertificates(userId: string) {
    return prisma.certificate.findMany({
        where: { userId },
        include: {
            course: {
                select: {
                    id: true,
                    title: true,
                    category: true,
                    difficulty: true,
                },
            },
        },
        orderBy: {
            issuedAt: "desc",
        },
    });
}

/**
 * Verify a certificate by certificate number
 */
export async function verifyCertificate(certificateNumber: string) {
    const certificate = await prisma.certificate.findUnique({
        where: { certificateNumber },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
            course: {
                select: {
                    title: true,
                },
            },
        },
    });

    if (!certificate) {
        return null;
    }

    return {
        verified: certificate.verified,
        studentName: certificate.user.name,
        courseName: certificate.course.title,
        issuedAt: certificate.issuedAt,
        completedAt: certificate.completedAt,
        certificateNumber: certificate.certificateNumber,
    };
}
