import axios from "axios";

const token = process.env.GITHUB_TOKEN || "";
export const gitAPI = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
