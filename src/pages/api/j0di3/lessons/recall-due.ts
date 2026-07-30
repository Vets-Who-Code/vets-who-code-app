import { j0di3Proxy } from "@/lib/j0di3-proxy";
import type { AuthenticatedRequest } from "@/lib/rbac";

export default j0di3Proxy(
    "GET",
    (req) => `/api/v1/lessons/recall-due/${(req as AuthenticatedRequest).user!.troopId}`
);
