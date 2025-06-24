import { type LanguageModel, streamText, type CoreMessage, generateObject } from "ai";
import { type ZodType, type ZodTypeDef } from "zod";
import { mosLookup } from "./tools/mos-lookup";

const baseContext = `
                    You are a specialized AI assistant for Vets Who Code members, designed to provide clear, practical technical guidance to veterans transitioning into software development careers.\n\n
                    CORE TECH STACK:\n
                    - Frontend: JavaScript, TypeScript, React, Next.js\n
                    - Styling: CSS, Tailwind CSS\n
                    - Backend: Python, FastAPI\n
                    - Data & Visualization: Streamlit\n
                    - Advanced: AI/ML fundamentals\n
                    - Development Tools: Git, GitHub, VS Code\n
                    - Testing: Jest, Pytest\n\n

                    CAREER TRANSITION GUIDANCE:\n
                    1. Resume Development:\n
                       - Technical Skills: Programming Languages, Frameworks, Tools, Cloud, Testing\n
                       - Military Experience Translation: Leadership, Problem-solving, Team Collaboration\n\n

                    2. Portfolio Development:\n
                       - Clean code and documentation\n
                       - Version control and API integration\n
                       - Responsive design and performance\n
                       - Testing and TypeScript implementation\n
                       - Security and accessibility standards\n\n

                    LEARNING PATHS:\n
                    1. Fundamentals: HTML, CSS, JavaScript, Git\n
                    2. Intermediate: TypeScript, React, Python\n
                    3. Advanced: Next.js, FastAPI, Streamlit, AI/ML\n\n

                    PROJECT FOCUS:\n
                    1. Portfolio Projects: Personal website, APIs, Data visualization\n
                    2. Technical Skills: Code quality, Testing, Security, Performance\n
                    3. Career Materials: GitHub profile, Technical blog, Documentation\n\n

                    Remember: Provide practical guidance for building technical skills and transitioning to software development careers. 
                    Focus on concrete examples and best practices.
`;

export class ChatBot {
    model: LanguageModel;

    constructor(model: LanguageModel) {
        this.model = model;
    }

    chat(messages: CoreMessage[], systemContext: string | null = baseContext) {
        const includedMessages: CoreMessage[] = [];
        if (systemContext) {
            includedMessages.push({
                role: "system",
                content: systemContext,
            });
        }
        includedMessages.push(...messages);

        console.log("Sending messages to AI model:", includedMessages);
        const response = streamText({
            model: this.model,
            messages: includedMessages,
            tools: { mosLookup },
            onFinish: (message) => {
                // TODO - store response in database
                if (message.text) {
                    console.error("Response received:", message.text);
                }

                if (message.toolCalls && message.toolCalls.length > 0) {
                    console.log("Tool calls received:", JSON.stringify(message.toolCalls));
                    console.log("Tool call results:", JSON.stringify(message.toolResults));
                }
            },
            onError: (error) => {
                console.error("Error during chat response stream:", error);
            },
            maxSteps: 5,
        });
        console.log("Chat response stream initialized");

        return response;
    }
}
