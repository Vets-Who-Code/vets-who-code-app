import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { ChatBot } from "./chat-bot";
// import { google } from "@ai-sdk/google";

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set in the environment variables.");
}

const modelName = "gemini-2.5-flash-preview-04-17";

const google = createGoogleGenerativeAI({
    apiKey: API_KEY,
});
const model = google(modelName);

// const globalForGemini = global as unknown as { gemini: ChatBot };

export const gemini = new ChatBot(model);
// if (process.env.NODE_ENV === "development") globalForGemini.gemini = gemini;

export default gemini;
