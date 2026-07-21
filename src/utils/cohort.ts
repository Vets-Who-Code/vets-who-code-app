/**
 * Whether a cohort start date is still in the future (so a countdown should show).
 * Returns false for a missing, malformed, or already-passed date — which is what
 * suppresses the dead "0 : 0 : 0 : 0" timer once a cohort date has elapsed.
 */
export function isCohortUpcoming(
    dateStr: string | undefined | null,
    now: number = Date.now()
): boolean {
    if (!dateStr) return false;
    const target = new Date(dateStr).getTime();
    if (Number.isNaN(target)) return false;
    return target > now;
}

/**
 * The active cohort start date: an env override (editable without a code change)
 * falling back to the value in site-config.
 */
export function getCohortStartDate(configDefault: string | undefined): string | undefined {
    return process.env.NEXT_PUBLIC_COHORT_START_DATE || configDefault;
}
