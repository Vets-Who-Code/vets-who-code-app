import { NextApiResponse } from "next";
import type { Mock } from "vitest";

vi.mock("@/lib/rbac", () => ({
    requireAuth: vi.fn((handler) => handler),
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        lesson: {
            findUnique: vi.fn(),
            count: vi.fn(),
        },
        progress: {
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            count: vi.fn(),
        },
        assignment: {
            findMany: vi.fn(),
        },
        enrollment: {
            updateMany: vi.fn(),
            findUnique: vi.fn(),
        },
        user: {
            findUnique: vi.fn(),
        },
        course: {
            findUnique: vi.fn(),
        },
        certificate: {
            create: vi.fn(),
        },
    },
}));

vi.mock("@/lib/certificates", () => ({
    checkCertificateEligibility: vi.fn(),
    generateCertificateNumber: vi.fn(),
}));

vi.mock("@/lib/pdf-certificate", () => ({
    generateCertificatePDF: vi.fn(),
    generateCertificateFilename: vi.fn(),
}));

vi.mock("@/lib/send-certificate-email", () => ({
    sendCertificateEmail: vi.fn(),
}));

vi.mock("cloudinary", () => ({
    v2: {
        config: vi.fn(),
        uploader: {
            upload_stream: vi.fn((_options, callback) => ({
                end: vi.fn(() =>
                    callback(null, { secure_url: "https://cdn.example.com/cert.pdf" })
                ),
            })),
        },
    },
}));

import { checkCertificateEligibility, generateCertificateNumber } from "@/lib/certificates";
import { generateCertificateFilename, generateCertificatePDF } from "@/lib/pdf-certificate";
import prisma from "@/lib/prisma";
import { AuthenticatedRequest } from "@/lib/rbac";
import { sendCertificateEmail } from "@/lib/send-certificate-email";
import handler from "@/pages/api/lms/progress/index";

const mockLessonFindUnique = prisma.lesson.findUnique as Mock;
const mockLessonCount = prisma.lesson.count as Mock;
const mockProgressFindUnique = prisma.progress.findUnique as Mock;
const mockProgressCreate = prisma.progress.create as Mock;
const mockProgressCount = prisma.progress.count as Mock;
const mockAssignmentFindMany = prisma.assignment.findMany as Mock;
const mockEnrollmentUpdateMany = prisma.enrollment.updateMany as Mock;
const mockEnrollmentFindUnique = prisma.enrollment.findUnique as Mock;
const mockUserFindUnique = prisma.user.findUnique as Mock;
const mockCourseFindUnique = prisma.course.findUnique as Mock;
const mockCertificateCreate = prisma.certificate.create as Mock;
const mockCheckEligibility = checkCertificateEligibility as Mock;
const mockGenerateNumber = generateCertificateNumber as Mock;
const mockGeneratePDF = generateCertificatePDF as Mock;
const mockGenerateFilename = generateCertificateFilename as Mock;
const mockSendEmail = sendCertificateEmail as Mock;

function createMockReqRes(body: Record<string, unknown>): {
    req: AuthenticatedRequest;
    res: NextApiResponse;
} {
    const req = {
        method: "POST",
        body,
        user: { id: "user-1" },
    } as unknown as AuthenticatedRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

function getResponseBody(res: NextApiResponse) {
    return (res.json as Mock).mock.calls[0][0];
}

describe("POST /api/lms/progress course completion gating", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockLessonFindUnique.mockResolvedValue({
            id: "lesson-1",
            module: {
                courseId: "course-1",
                course: {
                    enrollments: [{ id: "enrollment-1" }],
                },
            },
        });
        mockProgressFindUnique.mockResolvedValue(null);
        mockProgressCreate.mockResolvedValue({
            id: "progress-1",
            completed: true,
            lesson: { id: "lesson-1", title: "Lesson 1", order: 1, moduleId: "module-1" },
        });
        mockLessonCount.mockResolvedValue(2);
        mockProgressCount.mockResolvedValue(2);
        mockEnrollmentUpdateMany.mockResolvedValue({ count: 1 });

        // Certificate generation happy path
        mockCheckEligibility.mockResolvedValue({ eligible: true });
        mockUserFindUnique.mockResolvedValue({
            id: "user-1",
            name: "Test Vet",
            email: "vet@example.com",
        });
        mockCourseFindUnique.mockResolvedValue({
            id: "course-1",
            title: "Test Course",
            estimatedHours: 10,
        });
        mockEnrollmentFindUnique.mockResolvedValue({ completedAt: new Date() });
        mockGenerateNumber.mockResolvedValue("VWC-2026-000001");
        mockGeneratePDF.mockResolvedValue(new Uint8Array([1, 2, 3]));
        mockGenerateFilename.mockReturnValue("certificate.pdf");
        mockCertificateCreate.mockResolvedValue({ id: "cert-1" });
        mockSendEmail.mockResolvedValue(undefined);
    });

    it("does not complete the course or issue a certificate when an assignment is ungraded", async () => {
        mockAssignmentFindMany.mockResolvedValue([
            { id: "assignment-1", title: "Capstone Project", submissions: [] },
        ]);

        const { req, res } = createMockReqRes({ lessonId: "lesson-1", completed: true });
        await handler(req, res);

        expect(mockEnrollmentUpdateMany).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ status: "ACTIVE", completedAt: null }),
            })
        );
        expect(mockCheckEligibility).not.toHaveBeenCalled();
        expect(mockCertificateCreate).not.toHaveBeenCalled();
        expect(mockSendEmail).not.toHaveBeenCalled();

        const body = getResponseBody(res);
        expect(body.courseProgress.percentage).toBe(100);
        expect(body.courseProgress.isComplete).toBe(false);
        expect(body.courseProgress.pendingAssignments).toEqual({
            count: 1,
            titles: ["Capstone Project"],
        });
        expect(body.certificate).toBeUndefined();
    });

    it("does not complete the course when a submission exists but is not GRADED", async () => {
        // Submissions are filtered to GRADED in the query, so a SUBMITTED-only
        // assignment comes back with an empty submissions array
        mockAssignmentFindMany.mockResolvedValue([
            { id: "assignment-1", title: "Homework 1", submissions: [] },
            { id: "assignment-2", title: "Final Project", submissions: [{ id: "sub-2" }] },
        ]);

        const { req, res } = createMockReqRes({ lessonId: "lesson-1", completed: true });
        await handler(req, res);

        expect(mockAssignmentFindMany).toHaveBeenCalledWith({
            where: { courseId: "course-1" },
            select: {
                id: true,
                title: true,
                submissions: {
                    where: { userId: "user-1", status: "GRADED" },
                    select: { id: true },
                },
            },
        });
        expect(mockCertificateCreate).not.toHaveBeenCalled();

        const body = getResponseBody(res);
        expect(body.courseProgress.isComplete).toBe(false);
        expect(body.courseProgress.pendingAssignments).toEqual({
            count: 1,
            titles: ["Homework 1"],
        });
    });

    it("completes the course and issues a certificate when every assignment is GRADED", async () => {
        mockAssignmentFindMany.mockResolvedValue([
            { id: "assignment-1", title: "Homework 1", submissions: [{ id: "sub-1" }] },
            { id: "assignment-2", title: "Final Project", submissions: [{ id: "sub-2" }] },
        ]);

        const { req, res } = createMockReqRes({ lessonId: "lesson-1", completed: true });
        await handler(req, res);

        expect(mockEnrollmentUpdateMany).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ status: "COMPLETED" }),
            })
        );
        expect(mockCertificateCreate).toHaveBeenCalled();
        expect(mockSendEmail).toHaveBeenCalled();

        const body = getResponseBody(res);
        expect(body.courseProgress.isComplete).toBe(true);
        expect(body.courseProgress.pendingAssignments).toBeUndefined();
        expect(body.certificate).toEqual({
            generated: true,
            url: "https://cdn.example.com/cert.pdf",
        });
    });

    it("keeps current behavior for a course with zero assignments", async () => {
        mockAssignmentFindMany.mockResolvedValue([]);

        const { req, res } = createMockReqRes({ lessonId: "lesson-1", completed: true });
        await handler(req, res);

        expect(mockEnrollmentUpdateMany).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ status: "COMPLETED" }),
            })
        );
        expect(mockCertificateCreate).toHaveBeenCalled();

        const body = getResponseBody(res);
        expect(body.courseProgress.isComplete).toBe(true);
        expect(body.courseProgress.pendingAssignments).toBeUndefined();
    });

    it("does not check assignments while lessons are below 100%", async () => {
        mockProgressCount.mockResolvedValue(1);

        const { req, res } = createMockReqRes({ lessonId: "lesson-1", completed: true });
        await handler(req, res);

        expect(mockAssignmentFindMany).not.toHaveBeenCalled();
        expect(mockCertificateCreate).not.toHaveBeenCalled();

        const body = getResponseBody(res);
        expect(body.courseProgress.percentage).toBe(50);
        expect(body.courseProgress.isComplete).toBe(false);
        expect(body.courseProgress.pendingAssignments).toBeUndefined();
    });
});
