import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options as authOptions } from "@/pages/api/auth/options";
import prisma from "@/lib/prisma";

export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MENTOR";

export interface AuthenticatedUser {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
}

/**
 * Check if DEV_MODE is enabled
 * DEV_MODE allows bypassing authentication in development for easier testing
 * Set DEV_MODE=true in .env.local to enable
 */
export function isDevModeEnabled(): boolean {
    return process.env.NODE_ENV === "development" && process.env.DEV_MODE === "true";
}

/**
 * Get a mock admin user for DEV_MODE
 * This allows full access to all features when DEV_MODE is enabled
 */
function getDevModeUser(): AuthenticatedUser {
    return {
        id: "dev-user-admin",
        email: "dev@vetswhocode.io",
        name: "Dev Mode Admin",
        role: "ADMIN",
    };
}

export async function requireAuth(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<AuthenticatedUser | null> {
    // DEV_MODE: Bypass authentication entirely
    if (isDevModeEnabled()) {
        console.log("[DEV_MODE] Authentication bypassed - returning mock admin user");
        return getDevModeUser();
    }

    // In development, ONLY allow dev headers if NODE_ENV is explicitly 'development'
    if (process.env.NODE_ENV === "development") {
        const devUserId = req.headers["x-dev-user-id"] as string;
        if (devUserId) {
            const user = await prisma.user.findUnique({
                where: { id: devUserId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                },
            });

            if (user) {
                return user as AuthenticatedUser;
            }
        }
    }

    // Production: Use NextAuth session
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        res.status(401).json({ error: "Unauthorized - Please sign in" });
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
        },
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return null;
    }

    return user as AuthenticatedUser;
}

export async function requireRole(
    req: NextApiRequest,
    res: NextApiResponse,
    allowedRoles: UserRole[]
): Promise<AuthenticatedUser | null> {
    const user = await requireAuth(req, res);

    if (!user) {
        return null;
    }

    if (!allowedRoles.includes(user.role)) {
        res.status(403).json({
            error: "Forbidden - Insufficient permissions",
            required: allowedRoles,
            current: user.role,
        });
        return null;
    }

    return user;
}

export async function requireAdmin(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<AuthenticatedUser | null> {
    return requireRole(req, res, ["ADMIN"]);
}

export async function requireInstructor(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<AuthenticatedUser | null> {
    return requireRole(req, res, ["ADMIN", "INSTRUCTOR"]);
}
