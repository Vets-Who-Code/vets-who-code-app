import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { ChatBot } from "./chat-bot";

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set in the environment variables.");
}

const modelName = "gemini-2.5-pro";

const google = createGoogleGenerativeAI({
    apiKey: API_KEY,
});
const model = google(modelName);

export const gemini = new ChatBot(model);

export default gemini;
