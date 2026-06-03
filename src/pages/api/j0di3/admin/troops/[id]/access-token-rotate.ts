import { j0di3AdminProxy } from "@/lib/j0di3-proxy";

export default j0di3AdminProxy(
    "POST",
    (req) => `/api/v1/troops/${req.query.id}/access-token/rotate`
);
