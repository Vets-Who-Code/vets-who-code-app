type EventBody = {
    [key: string]: any;
};

export function checkParams(eventBody: EventBody, params: string[]): boolean {
    return params.some(
        (k) => typeof eventBody[k] === "undefined" || !eventBody[k]
    );
}

export const checkLength = (message: string): boolean => {
    const { length } = message.trim().split(" ");
    if (length === 1) {
        return true;
    }
    return false;
};

export const contactErrors = {
    missingOrRequired: "Missing or incorrect required property",
    tooShort: "Message is too short for submission",
};
