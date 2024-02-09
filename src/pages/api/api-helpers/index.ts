// Adjusting the EventBody type to be generic and refining the checkParams function
export function checkParams<T>(eventBody: T, params: (keyof T)[]): boolean {
    return params.some((key) => {
        const value = eventBody[key];
        // The condition needs to account for various types of value
        if (value === undefined || value === null) return true;
        if (typeof value === 'string' && value.trim() === "") return true;
        // Further specific checks can be added based on the expected types of values
        return false; // If none of the conditions are met, assume the value is valid
    });
}

export const checkLength = (message: string): boolean => {
    return message.trim().split(/\s+/).length === 1;
};

export const contactErrors = {
    missingOrRequired: "Missing or incorrect required property",
    tooShort: "Message is too short for submission",
};
