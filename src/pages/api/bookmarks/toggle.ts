import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const user = await requireAuth(req, res);
    if (!user) return;

    try {
        const { lessonId, note } = req.body;

        if (!lessonId) {
            return res.status(400).json({ error: "lessonId is required" });
        }

        // Check if bookmark exists
        const existingBookmark = await prisma.bookmark.findUnique({
            where: {
                userId_lessonId: {
                    userId: user.id,
                    lessonId,
                },
            },
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.bookmark.delete({
                where: {
                    id: existingBookmark.id,
                },
            });

            return res.status(200).json({
                success: true,
                bookmarked: false,
                message: "Bookmark removed",
            });
        } else {
            // Add bookmark
            const bookmark = await prisma.bookmark.create({
                data: {
                    userId: user.id,
                    lessonId,
                    note: note || null,
                },
            });

            return res.status(200).json({
                success: true,
                bookmarked: true,
                bookmark,
                message: "Bookmark added",
            });
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return res.status(500).json({ error: "Failed to toggle bookmark" });
    }
}
