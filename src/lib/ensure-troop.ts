import prisma from "@/lib/prisma";
import j0di3 from "@/lib/j0di3-client";

/**
 * Ensures a user has a linked J0dI3 troop profile.
 * If not, registers them with the J0dI3 backend and stores the troopId.
 */
export async function ensureTroop(userId: string): Promise<string | null> {
    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            troopId: true,
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
    if (dbUser.troopId) return dbUser.troopId;

    try {
        const { data } = await j0di3.post("/api/v1/troops/", {
            name: dbUser.name || "",
            email: dbUser.email,
            branch: dbUser.branch || "",
            mos: dbUser.mos || "",
            current_module: 1,
            enrolled: dbUser.enrollments.length > 0,
        });

        await prisma.user.update({
            where: { id: userId },
            data: { troopId: data.id },
        });

        return data.id;
    } catch (error) {
        console.error("[ensureTroop] Failed to register troop with J0dI3:", error);
        return null;
    }
}
