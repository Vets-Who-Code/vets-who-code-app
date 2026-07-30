import type { NextApiResponse } from "next";
import { j0di3AdminProxy } from "@/lib/j0di3-proxy";
import type { AuthenticatedRequest } from "@/lib/rbac";
import { requireRole } from "@/lib/rbac";

const getHandler = j0di3AdminProxy("GET", "/api/v1/admin/placements");
const postHandler = j0di3AdminProxy("POST", "/api/v1/admin/placements");

export default requireRole("ADMIN")(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.method === "GET") return getHandler(req, res);
    if (req.method === "POST") return postHandler(req, res);
    return res.status(405).json({ error: "Method not allowed" });
});
