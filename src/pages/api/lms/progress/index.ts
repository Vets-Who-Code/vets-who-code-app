import { v2 as cloudinary } from "cloudinary";
import { NextApiResponse } from "next";
import { checkCertificateEligibility, generateCertificateNumber } from "@/lib/certificates";
import { generateCertificateFilename, generateCertificatePDF } from "@/lib/pdf-certificate";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest, requireAuth } from "@/lib/rbac";
import { sendCertificateEmail } from "@/lib/send-certificate-email";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * GET /api/lms/progress
 * Fetch user's lesson progress (optionally filtered by courseId or moduleId)
 *
 * Query params:
 * - courseId?: string - Filter by course
 * - moduleId?: string - Filter by module
 * - lessonId?: string - Get specific lesson progress
 *
 * POST /api/lms/progress
 * Update lesson progress (mark as started, completed, or update time spent)
 *
 * Request body:
 * {
 *   lessonId: string,
 *   completed?: boolean,
 *   timeSpent?: number (in minutes)
 * }
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    // GET - Fetch user's progress
    if (req.method === "GET") {
        try {
            const { courseId, moduleId, lessonId } = req.query;

            // Build where clause for filtering
            const where: any = { userId };

            if (lessonId) {
                where.lessonId = lessonId as string;
            } else if (moduleId) {
                where.lesson = {
                    moduleId: moduleId as string,
                };
            } else if (courseId) {
                where.lesson = {
                    module: {
                        courseId: courseId as string,
                    },
                };
            }

            const progress = await prisma.progress.findMany({
                where,
                include: {
                    lesson: {
                        select: {
                            id: true,
                            title: true,
                            order: true,
                            duration: true,
                            moduleId: true,
                            module: {
                                select: {
                                    id: true,
                                    title: true,
                                    order: true,
                                    courseId: true,
                                },
                            },
                        },
                    },
                },
                orderBy: [{ lesson: { module: { order: "asc" } } }, { lesson: { order: "asc" } }],
            });

            return res.status(200).json({ progress });
        } catch (error) {
            console.error("Error fetching progress:", error);
            return res.status(500).json({ error: "Failed to fetch progress" });
        }
    }

    // POST - Update lesson progress
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { lessonId, completed, timeSpent } = req.body;

        // Validation
        if (!lessonId) {
            return res.status(400).json({ error: "Lesson ID is required" });
        }

        // Verify lesson exists
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                module: {
                    include: {
                        course: {
                            include: {
                                enrollments: {
                                    where: {
                                        userId,
                                        status: "ACTIVE",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!lesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }

        // Verify user is enrolled in the course
        if (lesson.module.course.enrollments.length === 0) {
            return res.status(403).json({
                error: "You must be enrolled in the course to track progress",
            });
        }

        // Check for existing progress record
        const existingProgress = await prisma.progress.findUnique({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
            },
        });

        let progressRecord;

        if (existingProgress) {
            // Update existing progress
            const updateData: any = {};

            if (typeof completed === "boolean") {
                updateData.completed = completed;
                if (completed && !existingProgress.completedAt) {
                    updateData.completedAt = new Date();
                } else if (!completed) {
                    updateData.completedAt = null;
                }
            }

            if (typeof timeSpent === "number" && timeSpent >= 0) {
                updateData.timeSpent = timeSpent;
            }

            progressRecord = await prisma.progress.update({
                where: {
                    id: existingProgress.id,
                },
                data: updateData,
                include: {
                    lesson: {
                        select: {
                            id: true,
                            title: true,
                            order: true,
                            moduleId: true,
                        },
                    },
                },
            });
        } else {
            // Create new progress record
            progressRecord = await prisma.progress.create({
                data: {
                    userId,
                    lessonId,
                    completed: completed || false,
                    timeSpent: timeSpent || 0,
                    completedAt: completed ? new Date() : null,
                },
                include: {
                    lesson: {
                        select: {
                            id: true,
                            title: true,
                            order: true,
                            moduleId: true,
                        },
                    },
                },
            });
        }

        // Calculate and update course progress
        const courseId = lesson.module.courseId;

        // Count total lessons in course
        const totalLessons = await prisma.lesson.count({
            where: {
                module: {
                    courseId,
                },
            },
        });

        // Count completed lessons for this user
        const completedLessons = await prisma.progress.count({
            where: {
                userId,
                completed: true,
                lesson: {
                    module: {
                        courseId,
                    },
                },
            },
        });

        // Calculate progress percentage
        const progressPercentage =
            totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        // Check if course is complete
        const isComplete = progressPercentage === 100;

        // Update enrollment with progress and completion status
        await prisma.enrollment.updateMany({
            where: {
                userId,
                courseId,
            },
            data: {
                progress: progressPercentage,
                lastActivity: new Date(),
                status: isComplete ? "COMPLETED" : "ACTIVE",
                completedAt: isComplete ? new Date() : null,
            },
        });

        // Auto-generate certificate if course just completed
        let certificateGenerated = false;
        let certificateUrl: string | null = null;

        if (isComplete) {
            try {
                // Check if certificate already exists
                const eligibility = await checkCertificateEligibility(userId, courseId);

                if (eligibility.eligible) {
                    // Fetch user and course data for certificate
                    const [user, course, enrollment] = await Promise.all([
                        prisma.user.findUnique({
                            where: { id: userId },
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        }),
                        prisma.course.findUnique({
                            where: { id: courseId },
                            select: {
                                id: true,
                                title: true,
                                estimatedHours: true,
                            },
                        }),
                        prisma.enrollment.findUnique({
                            where: {
                                userId_courseId: {
                                    userId,
                                    courseId,
                                },
                            },
                            select: {
                                completedAt: true,
                            },
                        }),
                    ]);

                    if (user && course && enrollment) {
                        // Generate certificate number
                        const certificateNumber = await generateCertificateNumber();

                        // Generate PDF
                        const pdfBytes = await generateCertificatePDF({
                            studentName: user.name || user.email,
                            courseName: course.title,
                            completionDate: enrollment.completedAt || new Date(),
                            certificateNumber,
                            estimatedHours: course.estimatedHours || undefined,
                        });

                        // Generate filename
                        const filename = generateCertificateFilename(
                            user.name || user.email,
                            course.title,
                            certificateNumber
                        );

                        // Upload to Cloudinary
                        const uploadResult = await new Promise<{ secure_url: string }>(
                            (resolve, reject) => {
                                const uploadStream = cloudinary.uploader.upload_stream(
                                    {
                                        folder: "certificates",
                                        public_id: filename.replace(".pdf", ""),
                                        resource_type: "raw",
                                        format: "pdf",
                                    },
                                    (error, result) => {
                                        if (error) {
                                            reject(error);
                                        } else {
                                            resolve(result as { secure_url: string });
                                        }
                                    }
                                );

                                uploadStream.end(Buffer.from(pdfBytes));
                            }
                        );

                        // Create certificate record
                        await prisma.certificate.create({
                            data: {
                                userId,
                                courseId,
                                certificateUrl: uploadResult.secure_url,
                                certificateNumber,
                            },
                        });

                        // Send certificate email to user
                        await sendCertificateEmail({
                            to: user.email,
                            studentName: user.name || user.email,
                            courseName: course.title,
                            certificateUrl: uploadResult.secure_url,
                            certificateNumber,
                            completionDate: enrollment.completedAt || new Date(),
                        });

                        certificateGenerated = true;
                        certificateUrl = uploadResult.secure_url;
                    }
                }
            } catch (certError) {
                console.error("Error auto-generating certificate:", certError);
                // Don't fail the progress update if certificate generation fails
            }
        }

        res.status(existingProgress ? 200 : 201).json({
            progress: progressRecord,
            courseProgress: {
                completed: completedLessons,
                total: totalLessons,
                percentage: progressPercentage,
                isComplete,
            },
            ...(certificateGenerated && {
                certificate: {
                    generated: true,
                    url: certificateUrl,
                },
            }),
            message: existingProgress
                ? "Progress updated successfully"
                : "Progress tracking started",
        });
    } catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ error: "Failed to update progress" });
    }
});
