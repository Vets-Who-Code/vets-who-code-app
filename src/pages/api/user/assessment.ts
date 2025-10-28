import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

interface SaveAssessmentBody {
    score: number;
    skillLevel: "NEWBIE" | "BEGINNER" | "JUNIOR" | "MID" | "SENIOR";
    completedQuestions: number;
    totalQuestions: number;
}

async function handleGetAssessment(userId: string, res: NextApiResponse) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                skillLevel: true,
                assessmentScore: true,
                assessmentDate: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching assessment:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleSaveAssessment(
    userId: string,
    body: SaveAssessmentBody,
    res: NextApiResponse
) {
    try {
        const { score, skillLevel } = body;

        // Validate score
        if (typeof score !== "number" || score < 0 || score > 210) {
            return res.status(400).json({ error: "Invalid score" });
        }

        // Validate skill level
        const validLevels = ["NEWBIE", "BEGINNER", "JUNIOR", "MID", "SENIOR"];
        if (!validLevels.includes(skillLevel)) {
            return res.status(400).json({ error: "Invalid skill level" });
        }

        // Update user's assessment data
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                skillLevel,
                assessmentScore: score,
                assessmentDate: new Date(),
            },
            select: {
                skillLevel: true,
                assessmentScore: true,
                assessmentDate: true,
            },
        });

        return res.status(200).json({
            message: "Assessment saved successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error saving assessment:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    // Support dev mode: check for dev-user-id header
    const devUserId = req.headers["x-dev-user-id"] as string;

    let userId: string;

    if (devUserId) {
        // Dev mode - use the provided dev user ID
        userId = devUserId;
    } else if (session?.user?.id) {
        // Production mode - use NextAuth session
        userId = session.user.id;
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "GET") {
        return handleGetAssessment(userId, res);
    }

    if (req.method === "POST") {
        return handleSaveAssessment(userId, req.body, res);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed" });
}
