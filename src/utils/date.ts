import { format, isPast } from "date-fns";

/**
 * Format date to readable string
 * @example formatDate(new Date()) // "Jan 26, 2024"
 */
export function formatDate(date: Date | string, pattern = "MMM dd, yyyy"): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, pattern);
}

/**
 * Check if date is in the past
 */
export function isDatePast(date: Date | string): boolean {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return isPast(dateObj);
}

/**
 * Get start of day
 */
export function getStartOfDay(date: Date | string = new Date()): Date {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const newDate = new Date(dateObj);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}
