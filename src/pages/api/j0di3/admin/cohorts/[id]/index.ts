import type { NextApiResponse } from "next";
import { j0di3AdminProxy } from "@/lib/j0di3-proxy";
import type { AuthenticatedRequest } from "@/lib/rbac";
import { requireRole } from "@/lib/rbac";

const getHandler = j0di3AdminProxy("GET", (req) => `/api/v1/admin/cohorts/${req.query.id}`);
const patchHandler = j0di3AdminProxy("PATCH", (req) => `/api/v1/admin/cohorts/${req.query.id}`);

export default requireRole("ADMIN")(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method === "GET") return getHandler(req, res);
    if (req.method === "PATCH") return patchHandler(req, res);
    return res.status(405).json({ error: "Method not allowed" });
});
