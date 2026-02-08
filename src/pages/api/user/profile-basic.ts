import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    if (req.method === "GET") {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // For now, return basic user data with empty defaults for new fields
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                bio: null,
                title: null,
                location: null,
                githubUrl: null,
                linkedinUrl: null,
                websiteUrl: null,
                skills: [],
                branch: null,
                rank: null,
                yearsServed: null,
                mos: null,
                deployments: [],
                role: "STUDENT",
                cohort: null,
                graduationDate: null,
                createdAt: user.createdAt,
            };

            return res.status(200).json(userData);
        } catch (_error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    if (req.method === "PUT") {
        try {
            // For now, just update the basic fields that exist
            const { name } = req.body;

            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    name,
                },
            });

            const userData = {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.image,
                bio: null,
                title: null,
                location: null,
                githubUrl: null,
                linkedinUrl: null,
                websiteUrl: null,
                skills: [],
                branch: null,
                rank: null,
                yearsServed: null,
                mos: null,
                deployments: [],
                role: "STUDENT",
                cohort: null,
                graduationDate: null,
                createdAt: updatedUser.createdAt,
            };

            return res.status(200).json(userData);
        } catch (_error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ error: "Method not allowed" });
}
