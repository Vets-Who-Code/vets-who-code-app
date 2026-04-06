import { j0di3Proxy } from "@/lib/j0di3-proxy";

export const config = {
    maxDuration: 300,
};

export default j0di3Proxy("POST", "/api/v1/jobs/resume/score");
