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
        const { lessonId, content, position, tags, isPrivate } = req.body;

        if (!lessonId || !content) {
            return res.status(400).json({ error: "lessonId and content are required" });
        }

        const note = await prisma.note.create({
            data: {
                userId: user.id,
                lessonId,
                content,
                position: position || null,
                tags: tags ? JSON.stringify(tags) : null,
                isPrivate: isPrivate !== undefined ? isPrivate : true,
            },
        });

        return res.status(200).json({
            success: true,
            note,
        });
    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({ error: "Failed to create note" });
    }
}
