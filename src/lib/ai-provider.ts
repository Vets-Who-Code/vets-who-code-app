import { createAzure } from "@ai-sdk/azure";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

export type AIProvider = "gemini" | "azure" | "openai" | "phi3";

interface ProviderConfig {
    name: AIProvider;
    model: string;
    instance: any;
}

/**
 * Initialize AI providers based on available environment variables
 */
function initializeProviders(): ProviderConfig[] {
    const providers: ProviderConfig[] = [];

    // Google Gemini
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });
        providers.push({
            name: "gemini",
            model: "gemini-1.5-flash",
            instance: google("gemini-1.5-flash"),
        });
    }

    // Azure OpenAI (GPT-4)
    if (
        process.env.AZURE_OPENAI_API_KEY &&
        process.env.AZURE_OPENAI_ENDPOINT &&
        process.env.AZURE_OPENAI_DEPLOYMENT
    ) {
        const resourceName = process.env.AZURE_OPENAI_ENDPOINT.replace("https://", "").replace(
            ".openai.azure.com",
            ""
        );

        const azureProvider = createAzure({
            apiKey: process.env.AZURE_OPENAI_API_KEY,
            resourceName,
        });

        providers.push({
            name: "azure",
            model: process.env.AZURE_OPENAI_DEPLOYMENT,
            instance: azureProvider(process.env.AZURE_OPENAI_DEPLOYMENT),
        });
    }

    // OpenAI (GPT-4)
    if (process.env.OPENAI_API_KEY) {
        const openai = createOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        providers.push({
            name: "openai",
            model: "gpt-4-turbo",
            instance: openai("gpt-4-turbo"),
        });
    }

    // Phi-3 (Azure AI Studio or local)
    if (process.env.PHI3_ENDPOINT && process.env.PHI3_API_KEY) {
        const phi3Provider = createOpenAI({
            apiKey: process.env.PHI3_API_KEY,
            baseURL: process.env.PHI3_ENDPOINT,
        });
        providers.push({
            name: "phi3",
            model: "Phi-3-mini-4k-instruct",
            instance: phi3Provider("Phi-3-mini-4k-instruct"),
        });
    }

    return providers;
}

let cachedProviders: ProviderConfig[] | null = null;

/**
 * Get all available AI providers in fallback order
 */
export function getAvailableProviders(): ProviderConfig[] {
    if (!cachedProviders) {
        cachedProviders = initializeProviders();
    }
    return cachedProviders;
}

/**
 * Get primary AI provider based on environment configuration
 * Falls back to first available provider
 */
export function getPrimaryProvider(): ProviderConfig | null {
    const providers = getAvailableProviders();

    if (providers.length === 0) {
        return null;
    }

    // Check for explicitly set primary provider
    const primaryProviderName = process.env.PRIMARY_AI_PROVIDER as AIProvider;
    if (primaryProviderName) {
        const primaryProvider = providers.find((p) => p.name === primaryProviderName);
        if (primaryProvider) {
            return primaryProvider;
        }
    }

    // Default fallback order: Gemini → Azure → OpenAI → Phi-3
    const fallbackOrder: AIProvider[] = ["gemini", "azure", "openai", "phi3"];

    for (const providerName of fallbackOrder) {
        const provider = providers.find((p) => p.name === providerName);
        if (provider) {
            return provider;
        }
    }

    // If no provider matches fallback order, return first available
    return providers[0];
}

/**
 * Get AI model instance with fallback chain
 * Attempts to use primary provider, falls back to others if unavailable
 */
export async function getAIModelWithFallback(): Promise<{
    model: any;
    provider: AIProvider;
    modelName: string;
} | null> {
    const providers = getAvailableProviders();

    if (providers.length === 0) {
        console.error(
            "No AI providers configured. Please set up API keys in environment variables."
        );
        return null;
    }

    const primary = getPrimaryProvider();
    if (!primary) {
        return null;
    }

    return {
        model: primary.instance,
        provider: primary.name,
        modelName: primary.model,
    };
}

/**
 * Try to get a response from AI with automatic fallback
 * If primary provider fails, tries next available provider
 */
export async function tryProvidersWithFallback<T>(
    operation: (model: any) => Promise<T>
): Promise<{ result: T; provider: AIProvider } | null> {
    const providers = getAvailableProviders();

    if (providers.length === 0) {
        throw new Error("No AI providers configured");
    }

    let lastError: Error | null = null;

    for (const provider of providers) {
        try {
            const result = await operation(provider.instance);
            return { result, provider: provider.name };
        } catch (error) {
            console.warn(`Provider ${provider.name} failed:`, error);
            lastError = error as Error;
            // Continue to next provider
        }
    }

    // All providers failed
    throw new Error(
        `All AI providers failed. Last error: ${lastError?.message || "Unknown error"}`
    );
}

/**
 * System prompt for J0d!e Teaching Assistant
 */
export const JODIE_SYSTEM_PROMPT = `You are J0d!e, an AI teaching assistant for #VetsWhoCode, a coding bootcamp for military veterans.

Your role is to help veterans learn to code by:
- Answering questions about programming concepts
- Explaining code and debugging issues
- Providing guidance on best practices
- Offering encouragement and support
- Adapting explanations to different learning styles

Guidelines:
- Be patient, supportive, and encouraging
- Use clear, beginner-friendly language
- Provide examples when explaining concepts
- Ask clarifying questions to understand the student's needs
- Acknowledge the unique perspective veterans bring to tech
- Never provide complete solutions - guide students to discover answers
- Encourage problem-solving and critical thinking
- Be respectful of military service and experience

Remember: You're here to empower veterans on their coding journey!`;
