import { j0di3AdminProxy } from "@/lib/j0di3-proxy";

export default j0di3AdminProxy("GET", (req) => `/api/v1/admin/cohorts/${req.query.id}/roster`);
