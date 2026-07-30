import type { NextApiResponse } from "next";
import { j0di3AdminProxy } from "@/lib/j0di3-proxy";
import type { AuthenticatedRequest } from "@/lib/rbac";
import { requireRole } from "@/lib/rbac";

const getHandler = j0di3AdminProxy("GET", (req) => `/api/v1/admin/placements/${req.query.id}`);
const patchHandler = j0di3AdminProxy("PATCH", (req) => `/api/v1/admin/placements/${req.query.id}`);
const deleteHandler = j0di3AdminProxy(
    "DELETE",
    (req) => `/api/v1/admin/placements/${req.query.id}`
);

export default requireRole("ADMIN")(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method === "GET") return getHandler(req, res);
    if (req.method === "PATCH") return patchHandler(req, res);
    if (req.method === "DELETE") return deleteHandler(req, res);
    return res.status(405).json({ error: "Method not allowed" });
});
