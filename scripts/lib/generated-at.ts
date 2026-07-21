/**
 * Stamp a data entry with the ISO timestamp it was generated at.
 *
 * Career-guide generators create each MOS entry once and never regenerate it,
 * so this date reflects the true age of that entry's content. The career guide
 * page reads it to show an honest "data last generated" footer.
 */
export function withGeneratedAt<T extends object>(
    entry: T,
    now: Date = new Date()
): T & { generatedAt: string } {
    return { ...entry, generatedAt: now.toISOString() };
}
