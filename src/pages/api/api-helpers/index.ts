type EventBody = {
    [key: string]: unknown;
};

export function checkParams(eventBody: EventBody, params: string[]): boolean {
    return params.some((k) => {
        const value = eventBody[k];
        return typeof value === "undefined" || value === null || value === "";
        // Further specific checks can be added based on the expected types of values.
    });
}

export const checkLength = (message: string): boolean => {
    return message.trim().split(/\s+/).length === 1;
};

export const contactErrors = {
    missingOrRequired: "Missing or incorrect required property",
    tooShort: "Message is too short for submission",
};
