import { NextApiRequest, NextApiResponse } from "next";
import type { Mock } from "vitest";
import handler from "@/pages/api/certificates/verify";

vi.mock("@/lib/prisma", () => ({
    default: {
        certificate: {
            findUnique: vi.fn(),
        },
    },
}));

import prisma from "@/lib/prisma";

const mockFindUnique = prisma.certificate.findUnique as Mock;

const LEGACY_ID = "clx1a2b3c4d5e6f7g8h9i0j1k";
const CERT_NUMBER = "VWC-2026-000123";

const certificateRow = {
    id: LEGACY_ID,
    certificateNumber: CERT_NUMBER,
    issuedAt: new Date("2026-05-01T00:00:00.000Z"),
    user: {
        id: "user-1",
        name: "Jane Doe",
        email: "jane@example.com",
    },
    course: {
        id: "course-1",
        title: "Foundations of Software Engineering",
        description: "Core engineering fundamentals",
        difficulty: "BEGINNER",
        estimatedHours: 40,
        category: "Engineering",
    },
};

function createMockReqRes(
    method = "GET",
    query: Record<string, string> = {}
): { req: NextApiRequest; res: NextApiResponse } {
    const req = { method, query } as unknown as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe("GET /api/certificates/verify", () => {
    beforeEach(() => {
        mockFindUnique.mockReset();
    });

    it("verifies a certificate by its printed certificate number", async () => {
        mockFindUnique.mockResolvedValueOnce(certificateRow);
        const { req, res } = createMockReqRes("GET", { number: CERT_NUMBER });

        await handler(req, res);

        expect(mockFindUnique).toHaveBeenCalledTimes(1);
        expect(mockFindUnique.mock.calls[0][0].where).toEqual({
            certificateNumber: CERT_NUMBER,
        });

        const body = (res.json as Mock).mock.calls[0][0];
        expect(body.valid).toBe(true);
        expect(body.certificate.certificateNumber).toBe(CERT_NUMBER);
        expect(body.certificate.student.name).toBe("Jane Doe");
        expect(body.certificate.course.title).toBe("Foundations of Software Engineering");
        expect(body.certificate.issuedAt).toEqual(certificateRow.issuedAt);
    });

    it("returns valid:false for an unknown certificate number without an id fallback", async () => {
        mockFindUnique.mockResolvedValue(null);
        const { req, res } = createMockReqRes("GET", { number: "VWC-2099-999999" });

        await handler(req, res);

        // Not cuid-shaped, so no second lookup by id
        expect(mockFindUnique).toHaveBeenCalledTimes(1);
        const body = (res.json as Mock).mock.calls[0][0];
        expect(body.valid).toBe(false);
    });

    it("falls back to row id lookup for legacy cuid-shaped numbers", async () => {
        mockFindUnique
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({ ...certificateRow, certificateNumber: null });
        const { req, res } = createMockReqRes("GET", { number: LEGACY_ID });

        await handler(req, res);

        expect(mockFindUnique).toHaveBeenCalledTimes(2);
        expect(mockFindUnique.mock.calls[0][0].where).toEqual({ certificateNumber: LEGACY_ID });
        expect(mockFindUnique.mock.calls[1][0].where).toEqual({ id: LEGACY_ID });

        const body = (res.json as Mock).mock.calls[0][0];
        expect(body.valid).toBe(true);
        // Legacy rows have no certificateNumber; the id they printed is returned
        expect(body.certificate.certificateNumber).toBe(LEGACY_ID);
    });

    it("returns 400 when the number query parameter is missing", async () => {
        const { req, res } = createMockReqRes("GET");

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(mockFindUnique).not.toHaveBeenCalled();
    });

    it("returns 405 for non-GET methods", async () => {
        const { req, res } = createMockReqRes("POST", { number: CERT_NUMBER });

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
    });
});
