import { j0di3Proxy } from "@/lib/j0di3-proxy";

export default j0di3Proxy("POST", (req) => {
    const id = req.query.message_id || req.body?.message_id;
    return `/api/v1/learning/messages/${id}/feedback`;
});
