import { format, isPast, isValid, parseISO } from "date-fns";

// parseISO reads "YYYY-MM-DD" as local midnight; `new Date` reads it as UTC midnight,
// which is the previous day anywhere west of UTC. Non-ISO strings fall back to `new Date`.
function toDate(input: Date | string): Date {
    if (typeof input !== "string") return input;
    const parsed = parseISO(input);
    return isValid(parsed) ? parsed : new Date(input);
}

/**
 * Format date to readable string
 * @example formatDate(new Date()) // "Jan 26, 2024"
 */
export function formatDate(date: Date | string, pattern = "MMM dd, yyyy"): string {
    return format(toDate(date), pattern);
}

/**
 * Check if date is in the past
 */
export function isDatePast(date: Date | string): boolean {
    return isPast(toDate(date));
}

/**
 * Get start of day
 */
export function getStartOfDay(date: Date | string = new Date()): Date {
    const newDate = new Date(toDate(date));
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}
