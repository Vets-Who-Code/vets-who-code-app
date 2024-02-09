// Adjusting the EventBody type to be generic
export function checkParams<T>(eventBody: T, params: (keyof T)[]): boolean {
    return params.some((key) => {
        // Explicitly handling the indexing with keyof T to ensure type safety
        const value = eventBody[key as keyof T];
        return value === undefined || value === null || value === "";
    });
}

export const checkLength = (message: string): boolean => {
    return message.trim().split(/\s+/).length === 1;
};

export const contactErrors = {
    missingOrRequired: "Missing or incorrect required property",
    tooShort: "Message is too short for submission",
};
