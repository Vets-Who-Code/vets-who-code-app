import type { Mock } from "vitest";

vi.mock("@/lib/prisma", () => ({
    default: {
        user: {
            findUnique: vi.fn(),
            update: vi.fn(),
        },
    },
}));

vi.mock("@/lib/j0di3-client", () => ({
    default: {
        post: vi.fn(),
    },
}));

import prisma from "@/lib/prisma";
import j0di3 from "@/lib/j0di3-client";
import { ensureTroop } from "@/lib/ensure-troop";

const mockFindUnique = prisma.user.findUnique as Mock;
const mockUpdate = prisma.user.update as Mock;
const mockPost = j0di3.post as Mock;

describe("ensureTroop", () => {
    it("returns null if user not found in database", async () => {
        mockFindUnique.mockResolvedValue(null);

        const result = await ensureTroop("nonexistent-id");

        expect(result).toBeNull();
    });

    it("returns existing troopId if user already has one", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: "existing-troop-uuid",
            name: "Test User",
            email: "test@example.com",
            branch: null,
            mos: null,
            skillLevel: null,
            cohortId: null,
            enrollments: [],
        });

        const result = await ensureTroop("user-123");

        expect(result).toBe("existing-troop-uuid");
        expect(mockPost).not.toHaveBeenCalled();
    });

    it("registers a new troop with J0dI3 when user has no troopId", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: null,
            name: "New User",
            email: "new@example.com",
            branch: "Army",
            mos: "11B",
            skillLevel: "BEGINNER",
            cohortId: "cohort-1",
            enrollments: [{ id: "enrollment-1" }],
        });

        mockPost.mockResolvedValue({ data: { id: "new-troop-uuid" } });
        mockUpdate.mockResolvedValue({});

        const result = await ensureTroop("user-456");

        expect(result).toBe("new-troop-uuid");
        expect(mockPost).toHaveBeenCalledWith("/api/v1/troops/", {
            name: "New User",
            email: "new@example.com",
            branch: "Army",
            mos: "11B",
            current_module: 1,
            enrolled: true,
        });
        expect(mockUpdate).toHaveBeenCalledWith({
            where: { id: "user-456" },
            data: { troopId: "new-troop-uuid" },
        });
    });

    it("sends enrolled: false when user has no active enrollments", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: null,
            name: "User",
            email: "user@example.com",
            branch: null,
            mos: null,
            skillLevel: null,
            cohortId: null,
            enrollments: [],
        });

        mockPost.mockResolvedValue({ data: { id: "troop-uuid" } });
        mockUpdate.mockResolvedValue({});

        await ensureTroop("user-789");

        expect(mockPost).toHaveBeenCalledWith("/api/v1/troops/", {
            name: "User",
            email: "user@example.com",
            branch: "",
            mos: "",
            current_module: 1,
            enrolled: false,
        });
    });

    it("returns null and logs error when J0dI3 registration fails", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: null,
            name: "User",
            email: "user@example.com",
            branch: null,
            mos: null,
            skillLevel: null,
            cohortId: null,
            enrollments: [],
        });

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        mockPost.mockRejectedValue(new Error("Network error"));

        const result = await ensureTroop("user-fail");

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith(
            "[ensureTroop] Failed to register troop with J0dI3:",
            expect.any(Error)
        );

        consoleSpy.mockRestore();
    });
});
