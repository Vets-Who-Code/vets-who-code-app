import { j0di3Proxy } from "@/lib/j0di3-proxy";

export default j0di3Proxy("POST", (req) => `/api/v1/challenges/${req.query.id}/submit`);
