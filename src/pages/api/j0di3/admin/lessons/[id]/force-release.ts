import { j0di3AdminProxy } from "@/lib/j0di3-proxy";

export default j0di3AdminProxy(
    "POST",
    (req) => `/api/v1/admin/lessons/${req.query.id}/force-release`
);
