import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { id, name, email, image } = req.body;

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            // Create the user if they don't exist
            user = await prisma.user.create({
                data: {
                    id,
                    name,
                    email,
                    image,
                },
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error initializing dev user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
