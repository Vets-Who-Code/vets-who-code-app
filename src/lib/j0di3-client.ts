import axios from "axios";

const j0di3 = axios.create({
    baseURL: process.env.J0DI3_API_URL,
    headers: {
        "X-API-Key": process.env.J0DI3_API_KEY!,
        "Content-Type": "application/json",
    },
    timeout: 300000,
});

export default j0di3;
