import { format, formatDistance, isToday, isYesterday, isPast, isFuture } from "date-fns";

/**
 * Format date to readable string
 * @example formatDate(new Date()) // "Jan 26, 2024"
 */
export function formatDate(date: Date | string, pattern = "MMM dd, yyyy"): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, pattern);
}

/**
 * Format date with time
 * @example formatDateTime(new Date()) // "Jan 26, 2024 at 10:30 AM"
 */
export function formatDateTime(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "MMM dd, yyyy 'at' h:mm a");
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @example getRelativeTime(pastDate) // "2 hours ago"
 */
export function getRelativeTime(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
}

/**
 * Get smart relative date (Today, Yesterday, or formatted date)
 * @example getSmartDate(new Date()) // "Today at 10:30 AM"
 */
export function getSmartDate(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isToday(dateObj)) {
        return `Today at ${format(dateObj, "h:mm a")}`;
    }

    if (isYesterday(dateObj)) {
        return `Yesterday at ${format(dateObj, "h:mm a")}`;
    }

    return formatDateTime(dateObj);
}

/**
 * Check if date is in the past
 */
export function isDatePast(date: Date | string): boolean {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return isPast(dateObj);
}

/**
 * Check if date is in the future
 */
export function isDateFuture(date: Date | string): boolean {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return isFuture(dateObj);
}

/**
 * Get days until date
 * @example getDaysUntil(futureDate) // 5
 */
export function getDaysUntil(date: Date | string): number {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffTime = dateObj.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get days since date
 * @example getDaysSince(pastDate) // 3
 */
export function getDaysSince(date: Date | string): number {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffTime = now.getTime() - dateObj.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format duration in seconds to human readable
 * @example formatDuration(3665) // "1h 1m 5s"
 */
export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(" ");
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

/**
 * Get end of day
 */
export function getEndOfDay(date: Date | string = new Date()): Date {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const newDate = new Date(dateObj);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
}
