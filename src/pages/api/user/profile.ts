import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { options } from "@/pages/api/auth/options";

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

// Field allowlists. troopAccessToken and troopId (J0dI3 bearer credentials) are
// NEVER selected, so they can never appear in a response.
const PUBLIC_PROFILE_SELECT = {
    id: true,
    name: true,
    image: true,
    bio: true,
    title: true,
    location: true,
    githubUrl: true,
    linkedinUrl: true,
    websiteUrl: true,
    skills: true,
    branch: true,
    rank: true,
    yearsServed: true,
    mos: true,
    deployments: true,
    role: true,
    skillLevel: true,
    cohortId: true,
    graduationDate: true,
    createdAt: true,
} as const;

// Self/admin additionally see private-but-not-secret fields.
const PRIVATE_PROFILE_SELECT = {
    ...PUBLIC_PROFILE_SELECT,
    email: true,
    isActive: true,
    assessmentScore: true,
    assessmentDate: true,
    updatedAt: true,
} as const;

type ProfileRow = { skills?: string | null; deployments?: string | null } & Record<string, unknown>;

function parseJsonFields(user: ProfileRow) {
    return {
        ...user,
        skills: user.skills ? JSON.parse(user.skills) : [],
        deployments: user.deployments ? JSON.parse(user.deployments) : [],
    };
}

async function handleGetProfile(userId: string, privileged: boolean, res: NextApiResponse) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: privileged ? PRIVATE_PROFILE_SELECT : PUBLIC_PROFILE_SELECT,
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(parseJsonFields(user as ProfileRow));
    } catch (_error) {
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
            // The owner is updating their own profile — return the private set, never the token.
            select: PRIVATE_PROFILE_SELECT,
        });

        return res.status(200).json(parseJsonFields(updatedUser as ProfileRow));
    } catch (_error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);

    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const requesterId = session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (req.method === "GET") {
        // Viewing another member via ?userId= yields public fields only; self/admin see more.
        const targetUserId = (req.query.userId as string) || requesterId;
        const privileged = targetUserId === requesterId || isAdmin;
        return handleGetProfile(targetUserId, privileged, res);
    }

    if (req.method === "PUT") {
        // Only the owner can update their own profile.
        return handleUpdateProfile(requesterId, req.body, res);
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ error: "Method not allowed" });
}
