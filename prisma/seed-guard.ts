/**
 * Guard for the destructive seed (prisma/seed.ts wipes tables with deleteMany).
 * Refuses to run against anything but a clearly local/dev database unless the
 * operator explicitly opts in with ALLOW_DESTRUCTIVE_SEED=true.
 */

/** True only for a local SQLite file or a localhost Postgres URL. */
export function isSafeSeedTarget(url: string | undefined): boolean {
    if (!url) return false;
    if (url.startsWith("file:")) return true;
    // postgresql://user:pass@host:port/db -> host
    const afterScheme = url.replace(/^[a-z]+:\/\//i, "");
    const host = (afterScheme.split("@").pop() ?? "").split(/[:/?]/)[0];
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

export function assertSafeToSeed(
    env: Record<string, string | undefined> = process.env
): void {
    if (env.ALLOW_DESTRUCTIVE_SEED === "true") return;
    if (!isSafeSeedTarget(env.DATABASE_URL)) {
        throw new Error(
            "Refusing to run the destructive seed: DATABASE_URL does not point at a local database " +
                "(a file: SQLite DB or localhost Postgres). Set ALLOW_DESTRUCTIVE_SEED=true to override."
        );
    }
}
