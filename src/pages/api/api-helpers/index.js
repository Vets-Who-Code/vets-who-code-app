export function checkParams(eventBody, params) {
    return params.some((k) => typeof eventBody[k] === "undefined" || !eventBody[k]);
}

export const checkLength = (message) => {
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
