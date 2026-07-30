/**
 * Truncate string with ellipsis
 * @example truncate("Long text here", 10) // "Long text..."
 */
export function truncate(text: string, maxLength: number): string {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

/**
 * Capitalize first letter of each word
 * @example capitalize("hello world") // "Hello World"
 */
export function capitalize(text: string): string {
    if (!text) return "";
    return text
        .split(" ")
        .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""))
        .join(" ");
}
