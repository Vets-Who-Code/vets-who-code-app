import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

interface UpdateProfileBody {
    name?: string;
    bio?: string;
    title?: string;
    location?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    websiteUrl?: string;
    skills?: string[];
    branch?: string;
    rank?: string;
    yearsServed?: string;
    mos?: string;
    deployments?: string[];
}

async function handleGetProfile(userId: string, res: NextApiResponse) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Parse JSON strings back to arrays
        const userData = {
            ...user,
            skills: user.skills ? JSON.parse(user.skills) : [],
            deployments: user.deployments ? JSON.parse(user.deployments) : [],
        };

        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleUpdateProfile(userId: string, body: UpdateProfileBody, res: NextApiResponse) {
    try {
        const {
            name,
            bio,
            title,
            location,
            githubUrl,
            linkedinUrl,
            websiteUrl,
            skills,
            branch,
            rank,
            yearsServed,
            mos,
            deployments,
        } = body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                bio,
                title,
                location,
                githubUrl,
                linkedinUrl,
                websiteUrl,
                skills: skills ? JSON.stringify(skills) : null,
                branch,
                rank,
                yearsServed: yearsServed ? parseInt(yearsServed, 10) : null,
                mos,
                deployments: deployments ? JSON.stringify(deployments) : null,
            },
        });

        // Parse JSON strings back to arrays
        const userData = {
            ...updatedUser,
            skills: updatedUser.skills ? JSON.parse(updatedUser.skills) : [],
            deployments: updatedUser.deployments ? JSON.parse(updatedUser.deployments) : [],
        };

        return res.status(200).json(userData);
    } catch (error) {
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
        return handleGetProfile(userId, res);
    }

    if (req.method === "PUT") {
        return handleUpdateProfile(userId, req.body, res);
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ error: "Method not allowed" });
}
