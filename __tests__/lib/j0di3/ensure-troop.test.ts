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

import { ensureTroop } from "@/lib/ensure-troop";
import j0di3 from "@/lib/j0di3-client";
import prisma from "@/lib/prisma";

const mockFindUnique = prisma.user.findUnique as Mock;
const mockUpdate = prisma.user.update as Mock;
const mockPost = j0di3.post as Mock;

describe("ensureTroop", () => {
    it("returns null if user not found in database", async () => {
        mockFindUnique.mockResolvedValue(null);

        const result = await ensureTroop("nonexistent-id");

        expect(result).toBeNull();
    });

    it("returns existing troopId if user already has one with an access token", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: "existing-troop-uuid",
            troopAccessToken: "existing-token",
            name: "Test User",
            email: "test@example.com",
            branch: null,
            mos: null,
            skillLevel: null,
            cohortId: null,
        });

        const result = await ensureTroop("user-123");

        expect(result).toBe("existing-troop-uuid");
        expect(mockPost).not.toHaveBeenCalled();
    });

    it("rotates a new access token when user has troopId but no token", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: "existing-troop-uuid",
            troopAccessToken: null,
            name: "Test User",
            email: "test@example.com",
            branch: null,
            mos: null,
            skillLevel: null,
            cohortId: null,
        });

        mockPost.mockResolvedValue({ data: { access_token: "rotated-token" } });
        mockUpdate.mockResolvedValue({});

        const result = await ensureTroop("user-rotate");

        expect(result).toBe("existing-troop-uuid");
        expect(mockPost).toHaveBeenCalledWith(
            "/api/v1/troops/existing-troop-uuid/access-token/rotate"
        );
        expect(mockUpdate).toHaveBeenCalledWith({
            where: { id: "user-rotate" },
            data: { troopAccessToken: "rotated-token" },
        });
    });

    it("registers a new troop with J0dI3 and stores access_token when user has no troopId", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: null,
            troopAccessToken: null,
            name: "New User",
            email: "new@example.com",
            branch: "Army",
            mos: "11B",
            skillLevel: "BEGINNER",
            cohortId: "cohort-1",
        });

        mockPost.mockResolvedValue({
            data: { id: "new-troop-uuid", access_token: "fresh-token" },
        });
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
            data: { troopId: "new-troop-uuid", troopAccessToken: "fresh-token" },
        });
    });

    it("returns null and logs error when J0dI3 registration fails", async () => {
        mockFindUnique.mockResolvedValue({
            troopId: null,
            troopAccessToken: null,
            name: "User",
            email: "user@example.com",
            branch: null,
            mos: null,
            skillLevel: null,
            cohortId: null,
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
