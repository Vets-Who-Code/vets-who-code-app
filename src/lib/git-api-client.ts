import axios from "axios";

const token = process.env.GITHUB_TOKEN || "";

// Log token status for debugging (without exposing the actual token)
if (!token) {
    console.warn(
        "WARNING: GITHUB_TOKEN environment variable is not set. GitHub API requests may fail."
    );
}

export const gitAPI = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    },
});
