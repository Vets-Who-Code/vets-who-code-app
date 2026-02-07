import { NextApiResponse } from "next";
import { AuthenticatedRequest, requireRole } from "@/lib/rbac";

/**
 * GET /api/lms/admin-only
 *
 * Test endpoint to verify role-based access control.
 * Requires ADMIN role.
 */
async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    res.status(200).json({
        message: "Success! You have admin access.",
        user: req.user,
        timestamp: new Date().toISOString(),
    });
}

// Export with admin role requirement
export default requireRole("ADMIN")(handler);
