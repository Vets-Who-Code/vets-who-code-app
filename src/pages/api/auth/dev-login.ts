import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({ error: "Dev login only available in development mode" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, role } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        // Create or update user
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name,
                role: role || "STUDENT",
            },
            create: {
                email,
                name,
                role: role || "STUDENT",
                emailVerified: new Date(),
            },
        });

        // Create an account record for NextAuth
        const existingAccount = await prisma.account.findFirst({
            where: {
                userId: user.id,
                provider: "dev",
            },
        });

        if (!existingAccount) {
            await prisma.account.create({
                data: {
                    userId: user.id,
                    type: "oauth",
                    provider: "dev",
                    providerAccountId: user.id,
                },
            });
        }

        // Create a session
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                sessionToken: `dev-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            },
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            sessionToken: session.sessionToken,
        });
    } catch (error) {
        console.error("Dev login error:", error);
        return res.status(500).json({ error: "Failed to create dev session" });
    }
}
