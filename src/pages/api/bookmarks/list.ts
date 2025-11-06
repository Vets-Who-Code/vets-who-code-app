import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const user = await requireAuth(req, res);
    if (!user) return;

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: user.id,
            },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: {
                                    select: {
                                        id: true,
                                        title: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            bookmarks,
        });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
}
