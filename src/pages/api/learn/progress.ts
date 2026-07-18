import type { NextApiResponse } from "next";
import { getAllLessonSlugs } from "@/lib/interactive-lessons";
import prisma from "@/lib/prisma";
import { type AuthenticatedRequest, requireAuth } from "@/lib/rbac";

/**
 * @swagger
 * /api/learn/progress:
 *   get:
 *     summary: List the signed-in user's completed interactive lessons
 *     tags: [Interactive Lessons]
 *     responses:
 *       200:
 *         description: Completed lesson slugs
 *       401:
 *         description: Not signed in
 *   post:
 *     summary: Mark an interactive lesson complete (or incomplete) for the signed-in user
 *     tags: [Interactive Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [slug]
 *             properties:
 *               slug: { type: string }
 *               completed: { type: boolean, default: true }
 *     responses:
 *       200:
 *         description: Updated progress
 *       400:
 *         description: Unknown or missing lesson slug
 *       401:
 *         description: Not signed in
 */
async function handleGet(req: AuthenticatedRequest, res: NextApiResponse) {
    const records = await prisma.interactiveProgress.findMany({
        where: { userId: req.user?.id, completed: true },
        select: { lessonSlug: true },
    });
    res.json({ completed: records.map((r) => r.lessonSlug) });
}

async function handlePost(req: AuthenticatedRequest, res: NextApiResponse) {
    const { slug, completed } = req.body ?? {};

    if (!slug || typeof slug !== "string") {
        return res.status(400).json({ error: "A lesson slug is required" });
    }
    // Trust boundary: only accept slugs that map to a real lesson, so the table
    // can never fill with arbitrary client-supplied strings.
    if (!getAllLessonSlugs().includes(slug)) {
        return res.status(400).json({ error: "Unknown lesson slug" });
    }

    const isComplete = completed !== false; // defaults to marking complete
    const userId = req.user?.id as string;

    const record = await prisma.interactiveProgress.upsert({
        where: { userId_lessonSlug: { userId, lessonSlug: slug } },
        update: { completed: isComplete, completedAt: isComplete ? new Date() : null },
        create: {
            userId,
            lessonSlug: slug,
            completed: isComplete,
            completedAt: isComplete ? new Date() : null,
        },
        select: { lessonSlug: true, completed: true },
    });

    res.json({ slug: record.lessonSlug, completed: record.completed });
}

export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            return handleGet(req, res);
        case "POST":
            return handlePost(req, res);
        default:
            res.setHeader("Allow", "GET, POST");
            return res.status(405).json({ error: "Method not allowed" });
    }
});
