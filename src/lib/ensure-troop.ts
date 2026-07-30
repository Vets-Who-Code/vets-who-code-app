import j0di3 from "@/lib/j0di3-client";
import prisma from "@/lib/prisma";

/**
 * Ensures a user has a linked J0dI3 troop profile *and* a stored access token.
 * On first sign-in: registers with J0dI3 and stores both the troopId and the
 * one-shot access_token returned by the registration response.
 * For users who already have a troopId but no token (pre-dating the auth
 * contract change), rotates a new token via the admin endpoint.
 */
export async function ensureTroop(userId: string): Promise<string | null> {
    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            troopId: true,
            troopAccessToken: true,
            name: true,
            email: true,
            branch: true,
            mos: true,
            skillLevel: true,
            cohortId: true,
            enrollments: {
                where: { status: "ACTIVE" },
                select: { id: true },
                take: 1,
            },
        },
    });

    if (!dbUser) return null;

    if (dbUser.troopId && dbUser.troopAccessToken) {
        return dbUser.troopId;
    }

    if (dbUser.troopId && !dbUser.troopAccessToken) {
        try {
            const { data } = await j0di3.post(
                `/api/v1/troops/${dbUser.troopId}/access-token/rotate`
            );
            const token = data?.access_token || data?.troop_access_token || data?.token;
            if (token) {
                await prisma.user.update({
                    where: { id: userId },
                    data: { troopAccessToken: token },
                });
            }
            return dbUser.troopId;
        } catch (error) {
            console.error("[ensureTroop] Failed to rotate troop access token:", error);
            return dbUser.troopId;
        }
    }

    try {
        const { data } = await j0di3.post("/api/v1/troops/", {
            name: dbUser.name || "",
            email: dbUser.email,
            branch: dbUser.branch || "",
            mos: dbUser.mos || "",
            current_module: 1,
            enrolled: dbUser.enrollments.length > 0,
        });

        const token = data?.access_token || data?.troop_access_token || data?.token || null;

        await prisma.user.update({
            where: { id: userId },
            data: { troopId: data.id, troopAccessToken: token },
        });

        return data.id;
    } catch (error) {
        console.error("[ensureTroop] Failed to register troop with J0dI3:", error);
        return null;
    }
}
