import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await requireAuth(req, res);
    if (!user) return;

    const { noteId } = req.query;

    if (typeof noteId !== "string") {
        return res.status(400).json({ error: "Invalid noteId" });
    }

    try {
        if (req.method === "GET") {
            const note = await prisma.note.findUnique({
                where: { id: noteId },
                include: {
                    lesson: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
            });

            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }

            // Check ownership
            if (note.userId !== user.id) {
                return res.status(403).json({ error: "Not authorized" });
            }

            return res.status(200).json({ success: true, note });
        }

        if (req.method === "PUT") {
            const { content, tags, isPrivate } = req.body;

            // Check ownership
            const existingNote = await prisma.note.findUnique({
                where: { id: noteId },
            });

            if (!existingNote) {
                return res.status(404).json({ error: "Note not found" });
            }

            if (existingNote.userId !== user.id) {
                return res.status(403).json({ error: "Not authorized" });
            }

            const updatedNote = await prisma.note.update({
                where: { id: noteId },
                data: {
                    content: content || existingNote.content,
                    tags: tags ? JSON.stringify(tags) : existingNote.tags,
                    isPrivate: isPrivate !== undefined ? isPrivate : existingNote.isPrivate,
                },
            });

            return res.status(200).json({ success: true, note: updatedNote });
        }

        if (req.method === "DELETE") {
            // Check ownership
            const existingNote = await prisma.note.findUnique({
                where: { id: noteId },
            });

            if (!existingNote) {
                return res.status(404).json({ error: "Note not found" });
            }

            if (existingNote.userId !== user.id) {
                return res.status(403).json({ error: "Not authorized" });
            }

            await prisma.note.delete({
                where: { id: noteId },
            });

            return res.status(200).json({ success: true, message: "Note deleted" });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error handling note:", error);
        return res.status(500).json({ error: "Failed to handle note" });
    }
}
